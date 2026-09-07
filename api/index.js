/**
 * Atsarul Mujahidin - Universal API Module
 *
 * Provides functions to access icon metadata, categories, and SVG assets
 * for use in server environments, backend services, or cross-language frameworks.
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFileDirectory = dirname(fileURLToPath(import.meta.url));

export const catalog = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'catalog.json'), 'utf-8')
);

export const categories = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'categories.json'), 'utf-8')
);

export const metadata = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'metadata.json'), 'utf-8')
);

/**
 * Retrieve icon metadata by its kebab-case name.
 *
 * @param {string} iconName - The kebab-case name of the icon (e.g., "mosque-simple")
 * @returns {object | null} The icon catalog item or null if not found
 */
export function getIcon(iconName) {
	return catalog.find((iconItem) => iconItem.name === iconName) || null;
}

/**
 * Search icons by query string and optional category filter.
 *
 * @param {string} searchQuery - The search term
 * @param {string} [categoryFilter] - Optional category identifier
 * @returns {Array<object>} Matching icon catalog items
 */
export function searchIcons(searchQuery, categoryFilter) {
	const normalizedQuery = (searchQuery || '').toLowerCase().trim();

	return catalog.filter((iconItem) => {
		const matchesCategory = categoryFilter
			? iconItem.category === categoryFilter
			: true;

		const matchesQuery = normalizedQuery
			? iconItem.name.toLowerCase().includes(normalizedQuery) ||
				iconItem.title.toLowerCase().includes(normalizedQuery)
			: true;

		return matchesCategory && matchesQuery;
	});
}

/**
 * Get all icons belonging to a specific category.
 *
 * @param {string} categoryIdentifier - The category identifier (e.g., "mosque")
 * @returns {Array<object>} Icons in the requested category
 */
export function getIconsByCategory(categoryIdentifier) {
	return catalog.filter(
		(iconItem) => iconItem.category === categoryIdentifier
	);
}

/**
 * Construct a CDN URL for an icon variant.
 *
 * @param {string} iconName - The kebab-case icon name
 * @param {string} [variantName='fill'] - The desired variant (fill, outline, color)
 * @param {string} [provider='jsdelivr'] - The CDN provider ('jsdelivr' or 'unpkg')
 * @returns {string} Fully qualified CDN URL
 */
export function getCdnUrl(iconName, variantName = 'fill', provider = 'jsdelivr') {
	const versionNumber = metadata.version || '0.1.1';

	if (provider === 'unpkg') {
		return `https://unpkg.com/atsarul-mujahidin@${versionNumber}/${variantName}/${iconName}.js`;
	}

	return `https://cdn.jsdelivr.net/npm/atsarul-mujahidin@${versionNumber}/${variantName}/${iconName}.js`;
}

export default {
	catalog,
	categories,
	metadata,
	getIcon,
	searchIcons,
	getIconsByCategory,
	getCdnUrl
};
