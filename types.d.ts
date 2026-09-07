export type CatalogItem = {
  name: string;
  category: string;
  title: string;
  aliases?: string[];
  sources: Array<{
    id: string;
    label: string;
    variants?: string[];
    solidVariants?: string[];
  }>;
};

export type SourceItem = {
  name: string;
  kind: string;
  discoveredVia: string;
  source: string;
  license?: string;
  licensePolicy: string;
  examples?: Array<{ name: string; url: string; license: string }>;
};

export type LibraryMetadata = {
  name: string;
  version: string;
  logo: string;
  description: string;
  author: string;
  runtime: string;
  css: string;
  assetModel: string;
  documentation: string;
  iconCount: number;
  sourceArchive: string;
  importedIconPolicy: string;
  repository?: string;
  homepage?: string;
  license?: string;
};

export type CategoryEntry = {
  id: string;
  name: string;
  count: number;
};
