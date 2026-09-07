export interface CatalogItem {
	name: string;
	title: string;
	category: string;
	variants: string[];
	sources: unknown[];
	cdnUrls: Record<string, string>;
	apiEndpoint: string;
}

export interface CategoryItem {
	id: string;
	name: string;
	count: number;
	icons: string[];
}

export interface ApiMetadata {
	name: string;
	version: string;
	totalIcons: number;
	totalCategories: number;
	license: string;
	homepage: string;
	repository: string;
	cdn: {
		jsdelivr: string;
		unpkg: string;
	};
	endpoints: Record<string, string>;
}

export declare const catalog: CatalogItem[];
export declare const categories: CategoryItem[];
export declare const metadata: ApiMetadata;

export declare function getIcon(iconName: string): CatalogItem | null;
export declare function searchIcons(searchQuery: string, categoryFilter?: string): CatalogItem[];
export declare function getIconsByCategory(categoryIdentifier: string): CatalogItem[];
export declare function getCdnUrl(iconName: string, variantName?: string, provider?: 'jsdelivr' | 'unpkg'): string;

declare const _default: {
	catalog: CatalogItem[];
	categories: CategoryItem[];
	metadata: ApiMetadata;
	getIcon: typeof getIcon;
	searchIcons: typeof searchIcons;
	getIconsByCategory: typeof getIconsByCategory;
	getCdnUrl: typeof getCdnUrl;
};

export default _default;
