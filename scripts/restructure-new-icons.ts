import { readdir, mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const sourceRootDirectory = join(process.cwd(), '../..', 'Atsarul Mujahidin New');
const targetRootDirectory = join(process.cwd(), 'assets', 'icons');

// Variant folders in source
const availableVariants = ['fill', 'outline', 'colors'];

// Category mapping
const categoryMappingTable: Record<string, string> = {
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

for (const currentVariant of availableVariants) {
	const variantDirectory = join(sourceRootDirectory, currentVariant);
	try {
		const categoryEntries = await readdir(variantDirectory, { withFileTypes: true });
		for (const categoryEntry of categoryEntries) {
			if (!categoryEntry.isDirectory()) continue;
			const sourceCategoryName = categoryEntry.name;
			const targetCategoryName = categoryMappingTable[sourceCategoryName] || sourceCategoryName;
			const categoryPath = join(variantDirectory, sourceCategoryName);
			const iconFiles = await readdir(categoryPath);

			for (const iconFileName of iconFiles) {
				if (!iconFileName.endsWith('.svg')) continue;
				const iconName = iconFileName.replace('.svg', '');
				const normalizedVariantName = currentVariant === 'colors' ? 'color' : currentVariant;

				// Target: assets/icons/{category}/{icon-name}/{variant}.svg
				const targetCategoryDirectory = join(targetRootDirectory, targetCategoryName);
				const targetIconDirectory = join(targetCategoryDirectory, iconName);
				await mkdir(targetIconDirectory, { recursive: true });

				const sourceFilePath = join(categoryPath, iconFileName);
				const targetFilePath = join(targetIconDirectory, `${normalizedVariantName}.svg`);

				await copyFile(sourceFilePath, targetFilePath);
				console.log(`Copied: ${targetCategoryName}/${iconName}/${normalizedVariantName}.svg`);
			}
		}
	} catch (error: any) {
		if (error?.code !== 'ENOENT') throw error;
	}
}
