// Validate every SVG in the library:
//   - non-empty
//   - well-formed XML-ish (starts with <svg, ends with </svg>)
//   - has a viewBox attribute
//   - has no duplicate ids
//   - has no broken same-document href references
//   - has no script tags or external href
// Also validates:
//   - no duplicate logical icons (sha256 of all SVG files per icon dir)
//   - aliases all point to valid canonical entries
//   - all metadata JSON files are parseable
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const libraryRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));
const iconRoot = join(libraryRoot, 'assets', 'icons');

let totalFilesValidated = 0;
let invalidCount = 0;
const directoryFingerprints: Map<string, string> = new Map();
const discoveredIssues: string[] = [];

function recordValidationFailure(message: string): void {
	discoveredIssues.push(message);
	invalidCount++;
}

async function validateSvgStructure(filePath: string): Promise<void> {
	const svgContent = await readFile(filePath, 'utf8');
	if (!svgContent.trim()) {
		recordValidationFailure(`Empty SVG: ${filePath}`);
		return;
	}
	if (!svgContent.trim().startsWith('<svg') || !svgContent.trim().endsWith('</svg>')) {
		recordValidationFailure(`Invalid SVG envelope: ${filePath}`);
		return;
	}
	if (!/viewBox\s*=/.test(svgContent)) {
		recordValidationFailure(`Missing viewBox: ${filePath}`);
	}
	if (/<script\b/i.test(svgContent)) {
		recordValidationFailure(`Contains <script>: ${filePath}`);
	}
	if (/xlink:href\s*=\s*["']https?:/i.test(svgContent) || /\bhref\s*=\s*["']https?:/i.test(svgContent)) {
		recordValidationFailure(`Contains external href: ${filePath}`);
	}
	const definedIds: Set<string> = new Set();
	const duplicateIds: Set<string> = new Set();
	for (const idMatch of svgContent.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
		const matchedId = idMatch[1];
		if (definedIds.has(matchedId)) duplicateIds.add(matchedId);
		definedIds.add(matchedId);
	}
	if (duplicateIds.size > 0) {
		recordValidationFailure(`Duplicate ids (${[...duplicateIds].join(',')}): ${filePath}`);
	}
	// same-document href references must point to an existing id
	for (const hrefMatch of svgContent.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/g)) {
		const targetId = hrefMatch[1];
		if (!definedIds.has(targetId)) {
			recordValidationFailure(`Broken same-document href to #${targetId}: ${filePath}`);
		}
	}
}

for (const categoryDirectory of await readdir(iconRoot, { withFileTypes: true })) {
	if (!categoryDirectory.isDirectory()) continue;
	for (const iconDirectory of await readdir(join(iconRoot, categoryDirectory.name), { withFileTypes: true })) {
		if (!iconDirectory.isDirectory()) continue;
		const targetDirectory = join(iconRoot, categoryDirectory.name, iconDirectory.name);
		const collectedFiles: string[] = [];
		const collectFilesRecursively = async (currentDirectory: string) => {
			for (const directoryEntry of await readdir(currentDirectory, { withFileTypes: true })) {
				const fullEntryPath = join(currentDirectory, directoryEntry.name);
				if (directoryEntry.isDirectory()) {
					await collectFilesRecursively(fullEntryPath);
				} else if (directoryEntry.name.endsWith('.svg')) {
					totalFilesValidated++;
					collectedFiles.push(fullEntryPath);
					await validateSvgStructure(fullEntryPath);
				}
			}
		};
		await collectFilesRecursively(targetDirectory);
		collectedFiles.sort();
		const hashDigest = createHash('sha256');
		for (const currentFilePath of collectedFiles) {
			hashDigest.update(await readFile(currentFilePath));
		}
		const computedFingerprint = hashDigest.digest('hex');
		const iconKey = `${categoryDirectory.name}/${iconDirectory.name}`;
		if (directoryFingerprints.has(computedFingerprint)) {
			recordValidationFailure(`Duplicate logical icon asset tree: ${iconKey} duplicates ${directoryFingerprints.get(computedFingerprint)}`);
		}
		directoryFingerprints.set(computedFingerprint, iconKey);
	}
}

const catalogData: Array<{ name: string; category: string }> = JSON.parse(await readFile(join(libraryRoot, 'assets', 'catalog.json'), 'utf8'));
const aliasData: Array<{ category: string; canonical: string; name: string }> = JSON.parse(await readFile(join(libraryRoot, 'assets', 'icon-aliases.json'), 'utf8'));
const catalogIconKeys: Set<string> = new Set(catalogData.map((catalogItem) => `${catalogItem.category}/${catalogItem.name}`));

for (const aliasItem of aliasData) {
	if (!catalogIconKeys.has(`${aliasItem.category}/${aliasItem.canonical}`)) {
		recordValidationFailure(`Alias points to missing canonical icon: ${aliasItem.category}/${aliasItem.name} -> ${aliasItem.canonical}`);
	}
}
if (catalogIconKeys.size !== catalogData.length) {
	recordValidationFailure('Catalog contains duplicate logical keys');
}

for (const assetFileName of [
	'assets/catalog.json',
	'assets/icon-aliases.json',
	'assets/external-sources.json',
	'assets/metadata.json',
	'assets/community-upload.json',
	'assets/user-icons.json'
]) {
	try {
		JSON.parse(await readFile(join(libraryRoot, assetFileName), 'utf8'));
	} catch (error: any) {
		recordValidationFailure(`Invalid JSON in ${assetFileName}: ${error?.message}`);
	}
}

if (invalidCount > 0) {
	for (const issueDescription of discoveredIssues) {
		console.error(`✗ ${issueDescription}`);
	}
	throw new Error(`${invalidCount} SVG/asset validation issue(s)`);
}

console.log(
	`Validated ${totalFilesValidated} SVG files and ${catalogData.length} logical icons without duplicate trees.`
);