// Import selected icons from google/material-design-icons (Apache-2.0).
// Usage: bun scripts/import-google.ts
//
// This importer treats google/material-design-icons as a first-party Apache-2.0 source.
// Google Search is DISCOVERY only and never grants redistribution permission.
// Always import from the official repository URL:
//   https://github.com/google/material-design-icons
// and retain provenance in external-sources.json.
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const libraryRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));

const GOOGLE_MATERIAL_BASE =
  'https://raw.githubusercontent.com/google/material-design-icons/master/src';

const ICON_IMPORTS: Array<{ name: string; category: string; materialPath: string }> = [
  // Example: mosque icon from Google Material Icons (Apache-2.0)
  // { name: 'mosque', category: 'mosque', materialPath: 'maps/mosque/materialicons/24px.svg' },
  //
  // Add more entries here following the same pattern.
  // Each entry will be fetched from:
  //   ${GOOGLE_MATERIAL_BASE}/${materialPath}
  // and saved to:
  //   library/assets/icons/${category}/${name}/sources/google-material/original.svg
];

if (ICON_IMPORTS.length === 0) {
  console.log(
    'No icons configured for import. Add entries to ICON_IMPORTS array and re-run.'
  );
  process.exit(0);
}

let importedCount = 0;
for (const entry of ICON_IMPORTS) {
  const resourceUrl = `${GOOGLE_MATERIAL_BASE}/${entry.materialPath}`;
  const destinationDirectory = join(libraryRoot, 'assets', 'icons', entry.category, entry.name, 'sources', 'google-material');
  const destinationFilePath = join(destinationDirectory, 'original.svg');

  try {
    const response = await fetch(resourceUrl);
    if (!response.ok) {
      console.error(`Failed to fetch ${resourceUrl}: ${response.status} ${response.statusText}`);
      continue;
    }
    const svgContent = await response.text();
    await mkdir(destinationDirectory, { recursive: true });
    await writeFile(destinationFilePath, svgContent, 'utf8');
    console.log(`Imported ${entry.category}/${entry.name} from google/material-design-icons (Apache-2.0)`);
    importedCount++;
  } catch (error: unknown) {
    console.error(`Error importing ${entry.name}: ${(error as Error).message}`);
  }
}

console.log(`Done. Imported ${importedCount} icon(s) from google/material-design-icons.`);
console.log('Run `bun run icons:catalog` to regenerate the catalog.');
