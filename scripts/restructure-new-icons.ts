import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const sourceRoot = join(process.cwd(), '../..', 'Atsarul Mujahidin New');
const targetRoot = join(process.cwd(), 'assets', 'icons');

// Variant folders in source
const variants = ['fill', 'outline', 'colors'];

// Category mapping
const categoryMap: Record<string, string> = {
	'animal': 'animal',
	'charity': 'charity',
	'flag': 'flags',
	'food': 'food',
	'god': 'god',
	'lifestyle': 'lifestyle',
	'mosque': 'mosque',
	'muslim-brand': 'muslim-brand',
	'ornamen': 'ornamen',
	'patterns': 'patterns',
	'prayer': 'prayer',
	'prophet': 'prophet',
	'qalligraphy': 'qalligraphy',
	'quran': 'quran',
	'ramadhan': 'ramadan'
};

for (const variant of variants) {
	const variantDir = join(sourceRoot, variant);
	try {
		const categories = await readdir(variantDir, { withFileTypes: true });
		for (const catDir of categories) {
			if (!catDir.isDirectory()) continue;
			const sourceCatName = catDir.name;
			const targetCatName = categoryMap[sourceCatName] || sourceCatName;
			const catPath = join(variantDir, sourceCatName);
			const icons = await readdir(catPath);

			for (const iconFile of icons) {
				if (!iconFile.endsWith('.svg')) continue;
				const iconName = iconFile.replace('.svg', '');
				const variantName = variant === 'colors' ? 'color' : variant;

				// Target: assets/icons/{category}/{icon-name}/{variant}.svg
				const targetCatDir = join(targetRoot, targetCatName);
				const targetIconDir = join(targetCatDir, iconName);
				await mkdir(targetIconDir, { recursive: true });

				const sourcePath = join(catPath, iconFile);
				const targetPath = join(targetIconDir, `${variantName}.svg`);

				await copyFile(sourcePath, targetPath);
				console.log(`Copied: ${targetCatName}/${iconName}/${variantName}.svg`);
			}
		}
	} catch (err: any) {
		if (err.code !== 'ENOENT') throw err;
	}
}

console.log('Restructuring complete!');
