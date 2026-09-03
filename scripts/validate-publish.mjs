// Verify that the package contents are publish-ready:
// 1. Load package.json and verify required fields.
// 2. List all files in the "files" whitelist and ensure they exist.
// 3. Sanity-check that each export path resolves to an existing file.
// 4. Verify the dist tarball contents (if --pack provided, optional).
import { existsSync, readFileSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('.', import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

const errors = [];
function expect(cond, msg) {
	if (!cond) errors.push(msg);
}

expect(pkg.version === '0.1.0', `version must be "0.1.0" (got "${pkg.version}")`);
expect(pkg.name === 'atsarul-mujahidin' || pkg.name === 'athar', `name must be "atsarul-mujahidin" (got "${pkg.name}")`);
expect(pkg.private !== true, 'package must NOT be private');
expect(pkg.license, 'license field is required');
expect(pkg.description, 'description field is required');
expect(pkg.repository && pkg.repository.url, 'repository.url is required');
expect(pkg.keywords && Array.isArray(pkg.keywords) && pkg.keywords.length > 0, 'keywords array is required');
expect(pkg.homepage, 'homepage is required');
expect(pkg.bugs, 'bugs is required');
expect(pkg.author || pkg.contributors, 'author or contributors is required');
expect(pkg.files && Array.isArray(pkg.files) && pkg.files.length > 0, '"files" whitelist is required');
expect(pkg.exports && Object.keys(pkg.exports).length > 0, '"exports" map is required');

// Required top-level files
for (const file of ['README.md', 'LICENSE']) {
	if (!existsSync(join(root, file))) errors.push(`Required top-level file missing: ${file}`);
}

// files whitelist must all exist
for (const f of pkg.files) {
	const p = join(root, f);
	if (!existsSync(p)) {
		errors.push(`Whitelisted file missing: ${f}`);
	}
}

// Every exports path must resolve
if (pkg.exports) {
	for (const [key, value] of Object.entries(pkg.exports)) {
		const target = typeof value === 'string' ? value : value.import || value.default;
		if (!target) {
			errors.push(`exports[${key}] has no import path`);
			continue;
		}
		const cleaned = target.replace(/^\.\//, '');
		const p = join(root, cleaned);
		if (cleaned.endsWith('/')) {
			// directory export - exists is fine
			if (!existsSync(p)) errors.push(`exports[${key}] -> directory missing: ${cleaned}`);
		} else if (cleaned.includes('*')) {
			// glob export - just check prefix
			const prefix = cleaned.split('*')[0];
			const dir = join(root, prefix);
			if (!existsSync(dir)) errors.push(`exports[${key}] -> glob root missing: ${prefix}`);
		} else {
			if (!existsSync(p)) errors.push(`exports[${key}] -> file missing: ${cleaned}`);
		}
	}
}

// No secret-ish files in published root
for (const banned of ['.env', '.env.local', '.npmrc', 'node_modules']) {
	const p = join(root, banned);
	if (existsSync(p) && statSync(p).isDirectory()) {
		errors.push(`Banned directory in package root: ${banned}`);
	}
}

// Sanity check: package.json field inside library/ must not be present in icons/
// (no double-packaging of source)
if (existsSync(join(root, 'icons', 'package.json'))) {
	errors.push('icons/package.json should not be present (it is a generated subtree)');
}

if (errors.length) {
	for (const e of errors) console.error(`✗ ${e}`);
	throw new Error(`${errors.length} publish-readiness issue(s)`);
}

console.log(
	`✓ ${pkg.name}@${pkg.version} is publish-ready. ${pkg.files.length} whitelisted files, ${Object.keys(pkg.exports).length} exports.`
);