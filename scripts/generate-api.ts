import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from '../catalog.js';
import { categories } from '../categories.js';
import { metadata } from '../metadata.js';

const currentFileDirectory = dirname(fileURLToPath(import.meta.url));
const apiOutputDirectory = resolve(currentFileDirectory, '../api');

if (!existsSync(apiOutputDirectory)) {
	mkdirSync(apiOutputDirectory, { recursive: true });
}

interface IconVariantMapping {
	variant: string;
	fileName: string;
	cdnUrl: string;
}

interface EnhancedCatalogEntry {
	name: string;
	title: string;
	category: string;
	variants: string[];
	sources: unknown[];
	cdnUrls: Record<string, string>;
	apiEndpoint: string;
}

const cdnBaseUrl = 'https://cdn.jsdelivr.net/npm/atsarul-mujahidin@0.1.1';

const enhancedCatalog: EnhancedCatalogEntry[] = catalog.map((iconItem) => {
	const availableVariantsSet = new Set<string>();

	for (const sourceItem of iconItem.sources) {
		for (const variantItem of sourceItem.variants) {
			availableVariantsSet.add(variantItem);
		}
	}

	const variantsList = Array.from(availableVariantsSet);
	const cdnUrlsRecord: Record<string, string> = {};

	for (const variantItem of variantsList) {
		cdnUrlsRecord[variantItem] = `${cdnBaseUrl}/${variantItem}/${iconItem.name}.js`;
	}

	return {
		name: iconItem.name,
		title: iconItem.title,
		category: iconItem.category,
		variants: variantsList,
		sources: iconItem.sources,
		cdnUrls: cdnUrlsRecord,
		apiEndpoint: `/api/icons/${iconItem.name}`
	};
});

// Write catalog.json
writeFileSync(
	resolve(apiOutputDirectory, 'catalog.json'),
	JSON.stringify(enhancedCatalog, null, 2),
	'utf-8'
);

// Write categories.json
const enhancedCategories = categories.map((categoryItem) => {
	const iconsInCategory = enhancedCatalog.filter(
		(iconItem) => iconItem.category === categoryItem.id
	);
	return {
		id: categoryItem.id,
		name: categoryItem.name,
		count: iconsInCategory.length,
		icons: iconsInCategory.map((iconItem) => iconItem.name)
	};
});

writeFileSync(
	resolve(apiOutputDirectory, 'categories.json'),
	JSON.stringify(enhancedCategories, null, 2),
	'utf-8'
);

// Write metadata.json
const enhancedMetadata = {
	...metadata,
	totalIcons: enhancedCatalog.length,
	totalCategories: enhancedCategories.length,
	cdn: {
		jsdelivr: cdnBaseUrl,
		unpkg: 'https://unpkg.com/atsarul-mujahidin@0.1.1'
	},
	endpoints: {
		catalog: '/api/catalog.json',
		categories: '/api/categories.json',
		metadata: '/api/metadata.json',
		iconByName: '/api/icons/:name',
		iconSvg: '/api/icons/:name/:variant.svg'
	}
};

writeFileSync(
	resolve(apiOutputDirectory, 'metadata.json'),
	JSON.stringify(enhancedMetadata, null, 2),
	'utf-8'
);

console.log(`Successfully generated API data in ${apiOutputDirectory}`);
