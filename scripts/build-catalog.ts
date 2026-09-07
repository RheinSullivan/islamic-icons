// Build catalog from assets/icons and write to:
//   - assets/catalog.json (source of truth)
//   - catalog.js + catalog.d.ts (bundled into published package)
//   - web-docs/src/lib/catalog.generated.ts (Svelte data source)
import { createHash } from 'node:crypto';
import { readdir, writeFile, mkdir, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const libraryRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));
const iconRoot = join(libraryRoot, 'assets', 'icons');

interface IconSource {
	id: string;
	label: string;
	variants: string[];
}

interface CatalogEntry {
	name: string;
	category: string;
	title: string;
	sources: IconSource[];
	aliases?: string[];
}

interface AliasEntry {
	name: string;
	canonical: string;
	category: string;
}

const formatTitle = (rawName: string): string => {
	const cleaned = rawName
		.replace(/-svgrepo-com/gi, '')
		.replace(/_svgrepo_com/gi, '')
		.replace(/svgrepo/gi, '');
	return String(cleaned)
		.replace(/[-_]/g, ' ')
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (character: string) => character.toUpperCase());
};

const sourceLabels: Record<string, string> = {
	community: 'Community / Rhein Sullivan',
	'svg-repo': 'SVG Repo',
	'mary-akveo': 'Mary Akveo',
	'google-material': 'Google Material Icons',
	'community-upload': 'Community Upload'
};

const supportedVariants: string[] = ['fill', 'outline', 'color', 'original', 'alternate'];

async function checkFileExists(filePath: string): Promise<boolean> {
	try {
		const fileBuffer = await readFile(filePath);
		return fileBuffer.length > 0;
	} catch {
		return false;
	}
}

async function computeFileHash(filePath: string): Promise<string> {
	const fileBuffer = await readFile(filePath);
	return createHash('sha256').update(fileBuffer).digest('hex');
}

const rawAliases: AliasEntry[] = JSON.parse(await readFile(join(libraryRoot, 'assets', 'icon-aliases.json'), 'utf8'));
const externalSources: unknown = JSON.parse(await readFile(join(libraryRoot, 'assets', 'external-sources.json'), 'utf8'));

const catalogEntries: CatalogEntry[] = [];
const directoryFingerprints: Map<string, string> = new Map();

for (const categoryDirectory of await readdir(iconRoot, { withFileTypes: true })) {
	if (!categoryDirectory.isDirectory()) continue;
	const categoryPath = join(iconRoot, categoryDirectory.name);
	for (const iconDirectory of await readdir(categoryPath, { withFileTypes: true })) {
		if (!iconDirectory.isDirectory()) continue;
		const iconName = iconDirectory.name;
		const itemDirectory = join(categoryPath, iconName);
		const entry: CatalogEntry = {
			name: iconName,
			category: categoryDirectory.name,
			title: formatTitle(iconName),
			sources: []
		};

		const communityVariants: string[] = [];
		for (const variantName of supportedVariants) {
			if (await checkFileExists(join(itemDirectory, `${variantName}.svg`))) {
				communityVariants.push(variantName);
			}
		}
		if (communityVariants.length > 0) {
			entry.sources.push({
				id: 'community',
				label: sourceLabels.community,
				variants: communityVariants
			});
		}

		const sourcesRootDirectory = join(itemDirectory, 'sources');
		try {
			for (const sourceSubDirectory of await readdir(sourcesRootDirectory, { withFileTypes: true })) {
				if (!sourceSubDirectory.isDirectory()) continue;
				const sourceDirectoryPath = join(sourcesRootDirectory, sourceSubDirectory.name);
				const sourceVariants: string[] = [];
				for (const variantName of supportedVariants) {
					if (await checkFileExists(join(sourceDirectoryPath, `${variantName}.svg`))) {
						sourceVariants.push(variantName);
					}
				}
				if (sourceVariants.length > 0) {
					entry.sources.push({
						id: sourceSubDirectory.name,
						label: sourceLabels[sourceSubDirectory.name] || formatTitle(sourceSubDirectory.name),
						variants: sourceVariants
					});
				}
			}
		} catch (error: any) {
			if (error?.code !== 'ENOENT') throw error;
		}

		if (!entry.sources.length) continue;

		const matchingAliases = rawAliases
			.filter((aliasItem: AliasEntry) => aliasItem.category === categoryDirectory.name && aliasItem.canonical === iconName)
			.map((aliasItem: AliasEntry) => aliasItem.name);
		if (matchingAliases.length > 0) {
			entry.aliases = matchingAliases.sort();
		}

		const svgFilePaths: string[] = [];
		const recursivelyCollectSvgFiles = async (currentDirectory: string) => {
			for (const directoryEntry of await readdir(currentDirectory, { withFileTypes: true })) {
				const resolvedEntryPath = join(currentDirectory, directoryEntry.name);
				if (directoryEntry.isDirectory()) {
					await recursivelyCollectSvgFiles(resolvedEntryPath);
				} else if (directoryEntry.name.endsWith('.svg')) {
					svgFilePaths.push(resolvedEntryPath);
				}
			}
		};
		await recursivelyCollectSvgFiles(itemDirectory);
		svgFilePaths.sort();
		const combinedFingerprint = (await Promise.all(svgFilePaths.map(computeFileHash))).join(':');
		if (directoryFingerprints.has(combinedFingerprint)) {
			throw new Error(
				`Duplicate logical icon detected: ${categoryDirectory.name}/${iconName} duplicates ${directoryFingerprints.get(combinedFingerprint)}`
			);
		}
		directoryFingerprints.set(combinedFingerprint, `${categoryDirectory.name}/${iconName}`);
		catalogEntries.push(entry);
	}
}

catalogEntries.sort((firstEntry, secondEntry) => 
	firstEntry.category.localeCompare(secondEntry.category) || firstEntry.title.localeCompare(secondEntry.title)
);

// 1. Write assets/catalog.json
await writeFile(
	join(libraryRoot, 'assets', 'catalog.json'),
	JSON.stringify(catalogEntries, null, 2) + '\n',
	'utf8'
);

// 2. Write the published package's catalog.js
await mkdir(join(libraryRoot, 'icons'), { recursive: true });
await writeFile(
	join(libraryRoot, 'catalog.js'),
	`// Generated by bun run icons:catalog\nexport const catalog = ${JSON.stringify(catalogEntries, null, 2)};\nexport const sources = ${JSON.stringify(externalSources, null, 2)};\nexport const metadata = ${JSON.stringify(JSON.parse(await readFile(join(libraryRoot, 'assets', 'metadata.json'), 'utf8')), null, 2)};\n`,
	'utf8'
);
await writeFile(
	join(libraryRoot, 'catalog.d.ts'),
	`// Generated by bun run icons:catalog\nimport type { IconItem, ExternalSource, PackageMetadata } from './types';\nexport declare const catalog: IconItem[];\nexport declare const sources: ExternalSource[];\nexport declare const metadata: PackageMetadata;\n`,
	'utf8'
);

// 3. Write data.json and catalog.generated.ts to web-docs
const webDocsGeneratedPath = join(libraryRoot, '..', 'web-docs', 'src', 'lib', 'catalog.generated.ts');
const webDocsDataJsonPath = join(libraryRoot, '..', 'web-docs', 'src', 'lib', 'data.json');

try {
	const parsedMetadata = JSON.parse(await readFile(join(libraryRoot, 'assets', 'metadata.json'), 'utf8'));
	await writeFile(
		webDocsGeneratedPath,
		`// Generated by bun run icons:catalog in library/\nexport const catalog = ${JSON.stringify(catalogEntries, null, 2)} as const;\nexport const sources = ${JSON.stringify(externalSources, null, 2)};\nexport const metadata = ${JSON.stringify(parsedMetadata, null, 2)};\nexport default catalog;\n`,
		'utf8'
	);
	await writeFile(
		webDocsDataJsonPath,
		JSON.stringify(catalogEntries, null, 2) + '\n',
		'utf8'
	);
} catch {
	// web-docs might not be present in standalone library package builds
}

console.log(`✓ Catalog built: ${catalogEntries.length} icons across ${new Set(catalogEntries.map((catalogItem) => catalogItem.category)).size} categories`);