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

const root = dirname(fileURLToPath(new URL('.', import.meta.url)));
const iconRoot = join(root, 'assets', 'icons');

let files = 0;
let invalid = 0;
const fingerprints = new Map();
const issues = [];

function fail(msg) {
	issues.push(msg);
	invalid++;
}

async function checkSvg(path) {
	const text = await readFile(path, 'utf8');
	if (!text.trim()) {
		fail(`Empty SVG: ${path}`);
		return;
	}
	if (!text.trim().startsWith('<svg') || !text.trim().endsWith('</svg>')) {
		fail(`Invalid SVG envelope: ${path}`);
		return;
	}
	if (!/viewBox\s*=/.test(text)) {
		fail(`Missing viewBox: ${path}`);
	}
	if (/<script\b/i.test(text)) {
		fail(`Contains <script>: ${path}`);
	}
	if (/xlink:href\s*=\s*["']https?:/i.test(text) || /\bhref\s*=\s*["']https?:/i.test(text)) {
		fail(`Contains external href: ${path}`);
	}
	const ids = new Set();
	const idDupes = new Set();
	for (const m of text.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) {
		if (ids.has(m[1])) idDupes.add(m[1]);
		ids.add(m[1]);
	}
	if (idDupes.size) {
		fail(`Duplicate ids (${[...idDupes].join(',')}): ${path}`);
	}
	// same-document href references must point to an existing id
	for (const m of text.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/g)) {
		if (!ids.has(m[1])) {
			fail(`Broken same-document href to #${m[1]}: ${path}`);
		}
	}
}

for (const cat of await readdir(iconRoot, { withFileTypes: true })) {
	if (!cat.isDirectory()) continue;
	for (const icon of await readdir(join(iconRoot, cat.name), { withFileTypes: true })) {
		if (!icon.isDirectory()) continue;
		const dir = join(iconRoot, cat.name, icon.name);
		const fileList = [];
		const walk = async (d) => {
			for (const e of await readdir(d, { withFileTypes: true })) {
				const p = join(d, e.name);
				if (e.isDirectory()) await walk(p);
				else if (e.name.endsWith('.svg')) {
					files++;
					fileList.push(p);
					await checkSvg(p);
				}
			}
		};
		await walk(dir);
		fileList.sort();
		const digest = createHash('sha256');
		for (const p of fileList) digest.update(await readFile(p));
		const fingerprint = digest.digest('hex');
		const key = `${cat.name}/${icon.name}`;
		if (fingerprints.has(fingerprint))
			fail(`Duplicate logical icon asset tree: ${key} duplicates ${fingerprints.get(fingerprint)}`);
		fingerprints.set(fingerprint, key);
	}
}

const catalog = JSON.parse(await readFile(join(root, 'assets', 'catalog.json'), 'utf8'));
const aliases = JSON.parse(await readFile(join(root, 'assets', 'icon-aliases.json'), 'utf8'));
const catalogKeys = new Set(catalog.map((i) => `${i.category}/${i.name}`));
for (const alias of aliases) {
	if (!catalogKeys.has(`${alias.category}/${alias.canonical}`)) {
		fail(`Alias points to missing canonical icon: ${alias.category}/${alias.name} -> ${alias.canonical}`);
	}
}
if (new Set(catalog.map((i) => `${i.category}/${i.name}`)).size !== catalog.length) {
	fail('Catalog contains duplicate logical keys');
}

for (const file of [
	'assets/catalog.json',
	'assets/icon-aliases.json',
	'assets/external-sources.json',
	'assets/metadata.json',
	'assets/community-upload.json',
	'assets/user-icons.json'
]) {
	try {
		JSON.parse(await readFile(join(root, file), 'utf8'));
	} catch (err) {
		fail(`Invalid JSON in ${file}: ${err.message}`);
	}
}

if (invalid) {
	for (const i of issues) console.error(`✗ ${i}`);
	throw new Error(`${invalid} SVG/asset validation issue(s)`);
}
console.log(
	`Validated ${files} SVG files and ${catalog.length} logical icons without duplicate trees.`
);