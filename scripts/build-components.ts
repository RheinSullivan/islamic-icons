// Build React, Vue, Svelte components and variant-based exports
// Run AFTER build-catalog.ts
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const libraryRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));

interface CatalogItemSource {
	id: string;
	label: string;
	variants?: string[];
}

interface CatalogEntryItem {
	name: string;
	title: string;
	category: string;
	sources: CatalogItemSource[];
}

const catalog: CatalogEntryItem[] = JSON.parse(await readFile(join(libraryRoot, 'assets', 'catalog.json'), 'utf8'));

const createCamelIdentifier = (rawIdentifier: string): string =>
	String(rawIdentifier)
		.replace(/-([a-z])/g, (_, matchedCharacter: string) => matchedCharacter.toUpperCase())
		.replace(/[^A-Za-z0-9_$]/g, '');

const createPascalCaseIdentifier = (rawIdentifier: string): string =>
	String(rawIdentifier)
		.split('-')
		.map((wordToken: string) => wordToken.charAt(0).toUpperCase() + wordToken.slice(1))
		.join('');

function sanitizeSvgContent(content: string, variantName: string): string {
	if (variantName === 'color') return content;
	let res = content
		.replace(/fill="black"/gi, 'fill="currentColor"')
		.replace(/stroke="black"/gi, 'stroke="currentColor"')
		.replace(/style="[^"]*fill:\s*#[0-9a-fA-F]{3,6};?[^"]*"/gi, 'fill="currentColor"')
		.replace(/style="[^"]*fill:\s*black;?[^"]*"/gi, 'fill="currentColor"')
		.replace(/fill="#([0-9a-fA-F]{3,6})"/gi, (match, hex) => {
			let clean = hex.length === 3 ? hex.split('').map((c: string) => c + c).join('') : hex;
			if (clean.length === 6) {
				const r = parseInt(clean.substring(0, 2), 16);
				const g = parseInt(clean.substring(2, 4), 16);
				const b = parseInt(clean.substring(4, 6), 16);
				if (r < 80 && g < 80 && b < 80) return 'fill="currentColor"';
			}
			return match;
		})
		.replace(/stroke="#([0-9a-fA-F]{3,6})"/gi, (match, hex) => {
			let clean = hex.length === 3 ? hex.split('').map((c: string) => c + c).join('') : hex;
			if (clean.length === 6) {
				const r = parseInt(clean.substring(0, 2), 16);
				const g = parseInt(clean.substring(2, 4), 16);
				const b = parseInt(clean.substring(4, 6), 16);
				if (r < 80 && g < 80 && b < 80) return 'stroke="currentColor"';
			}
			return match;
		});

	// Ensure any path without fill/stroke inside fill="none" gets fill="currentColor"
	res = res.replace(/<path(?![^>]*\b(fill|stroke)\b)([^>]*)>/gi, '<path fill="currentColor"$2>');
	return res;
}

// 1. Clean output directories
await rm(join(libraryRoot, 'fill'), { recursive: true, force: true });
await rm(join(libraryRoot, 'outline'), { recursive: true, force: true });
await rm(join(libraryRoot, 'color'), { recursive: true, force: true });
await rm(join(libraryRoot, 'react'), { recursive: true, force: true });
await rm(join(libraryRoot, 'vue'), { recursive: true, force: true });
await rm(join(libraryRoot, 'svelte'), { recursive: true, force: true });
await rm(join(libraryRoot, 'vanilla'), { recursive: true, force: true });

await mkdir(join(libraryRoot, 'fill'), { recursive: true });
await mkdir(join(libraryRoot, 'outline'), { recursive: true });
await mkdir(join(libraryRoot, 'color'), { recursive: true });
await mkdir(join(libraryRoot, 'react', 'fill'), { recursive: true });
await mkdir(join(libraryRoot, 'react', 'outline'), { recursive: true });
await mkdir(join(libraryRoot, 'react', 'color'), { recursive: true });
await mkdir(join(libraryRoot, 'vue', 'fill'), { recursive: true });
await mkdir(join(libraryRoot, 'vue', 'outline'), { recursive: true });
await mkdir(join(libraryRoot, 'vue', 'color'), { recursive: true });
await mkdir(join(libraryRoot, 'svelte', 'fill'), { recursive: true });
await mkdir(join(libraryRoot, 'svelte', 'outline'), { recursive: true });
await mkdir(join(libraryRoot, 'svelte', 'color'), { recursive: true });
await mkdir(join(libraryRoot, 'vanilla'), { recursive: true });

// 2. Generate variant-based exports (fill/outline/color)
for (const catalogItem of catalog) {
	for (const sourceCandidate of catalogItem.sources) {
		for (const variantName of sourceCandidate.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variantName)) continue;

			// Read the SVG file
			const svgFilePath = sourceCandidate.id === 'community'
				? join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, `${variantName}.svg`)
				: join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, 'sources', sourceCandidate.id, `${variantName}.svg`);

			try {
				let svgFileContent = await readFile(svgFilePath, 'utf8');
				if (variantName !== 'color') {
					svgFileContent = sanitizeSvgContent(svgFileContent, variantName);
				}
				const exportedConstantIdentifier = createCamelIdentifier(catalogItem.name);

				// Export SVG content as string
				const exportFileContent = `// ${catalogItem.title} - ${variantName}
export const ${exportedConstantIdentifier} = ${JSON.stringify(svgFileContent)};
export default ${exportedConstantIdentifier};
`;
				await writeFile(join(libraryRoot, variantName, `${catalogItem.name}.js`), exportFileContent, 'utf8');
			} catch {
				// SVG file doesn't exist for this variant, skip
			}
		}
	}
}

// 3. Generate React components
const reactFillExports: string[] = [];
const reactOutlineExports: string[] = [];
const reactColorExports: string[] = [];

for (const catalogItem of catalog) {
	for (const sourceCandidate of catalogItem.sources) {
		for (const variantName of sourceCandidate.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variantName)) continue;

			const svgFilePath = sourceCandidate.id === 'community'
				? join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, `${variantName}.svg`)
				: join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, 'sources', sourceCandidate.id, `${variantName}.svg`);

			try {
				const svgFileContent = await readFile(svgFilePath, 'utf8');
				const componentName = createPascalCaseIdentifier(catalogItem.name);

				// Parse SVG
				const viewBoxMatch = svgFileContent.match(/viewBox="([^"]*)"/);
				const viewBoxAttribute = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerSvgMatch = svgFileContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerSvgContent = innerSvgMatch ? innerSvgMatch[1].trim() : '';

				if (variantName !== 'color') {
					innerSvgContent = sanitizeSvgContent(innerSvgContent, variantName);
				}

				// React component
				const reactComponentCode = `import React from 'react';

export const ${componentName} = React.forwardRef((props, forwardedReference) => {
	const {
		colors = 'currentColor',
		size = 24,
		strokeWidth = 1.5,
		className = '',
		style = {},
		...restProperties
	} = props;

	return (
		<svg
			ref={forwardedReference}
			width={size}
			height={size}
			viewBox="${viewBoxAttribute}"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			style={{ ...style, color: colors }}
			role="img"
			aria-label="${catalogItem.title}"
			{...restProperties}
		>
${innerSvgContent}
		</svg>
	);
});

${componentName}.displayName = '${componentName}';
export default ${componentName};
`;

				await writeFile(
					join(libraryRoot, 'react', variantName, `${componentName}.jsx`),
					reactComponentCode,
					'utf8'
				);

				if (variantName === 'fill') reactFillExports.push(`export { ${componentName} } from './${componentName}.jsx';`);
				if (variantName === 'outline') reactOutlineExports.push(`export { ${componentName} } from './${componentName}.jsx';`);
				if (variantName === 'color') reactColorExports.push(`export { ${componentName} } from './${componentName}.jsx';`);
			} catch {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write React index files
await writeFile(join(libraryRoot, 'react', 'fill', 'index.js'), reactFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'react', 'outline', 'index.js'), reactOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'react', 'color', 'index.js'), reactColorExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'react', 'index.js'), [
	`export * as fill from './fill/index.js';`,
	`export * as outline from './outline/index.js';`,
	`export * as color from './color/index.js';`,
	`export * from './fill/index.js';`
].join('\n') + '\n', 'utf8');

// 4. Generate Vue components
const vueFillExports: string[] = [];
const vueOutlineExports: string[] = [];
const vueColorExports: string[] = [];

for (const catalogItem of catalog) {
	for (const sourceCandidate of catalogItem.sources) {
		for (const variantName of sourceCandidate.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variantName)) continue;

			const svgFilePath = sourceCandidate.id === 'community'
				? join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, `${variantName}.svg`)
				: join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, 'sources', sourceCandidate.id, `${variantName}.svg`);

			try {
				const svgFileContent = await readFile(svgFilePath, 'utf8');
				const componentName = createPascalCaseIdentifier(catalogItem.name);

				const viewBoxMatch = svgFileContent.match(/viewBox="([^"]*)"/);
				const viewBoxAttribute = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerSvgMatch = svgFileContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerSvgContent = innerSvgMatch ? innerSvgMatch[1].trim() : '';

				if (variantName !== 'color') {
					innerSvgContent = sanitizeSvgContent(innerSvgContent, variantName);
				}

				// Vue component
				const vueComponentCode = `<script>
export default {
	name: '${componentName}',
	props: {
		colors: {
			type: String,
			default: 'currentColor'
		},
		size: {
			type: [Number, String],
			default: 24
		},
		strokeWidth: {
			type: [Number, String],
			default: 1.5
		}
	}
};
</script>

<template>
	<svg
		:width="size"
		:height="size"
		viewBox="${viewBoxAttribute}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		:style="{ color: colors }"
		role="img"
		aria-label="${catalogItem.title}"
		v-bind="$attrs"
	>
${innerSvgContent}
	</svg>
</template>
`;

				await writeFile(
					join(libraryRoot, 'vue', variantName, `${componentName}.vue`),
					vueComponentCode,
					'utf8'
				);

				if (variantName === 'fill') vueFillExports.push(`export { default as ${componentName} } from './${componentName}.vue';`);
				if (variantName === 'outline') vueOutlineExports.push(`export { default as ${componentName} } from './${componentName}.vue';`);
				if (variantName === 'color') vueColorExports.push(`export { default as ${componentName} } from './${componentName}.vue';`);
			} catch {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write Vue index files
await writeFile(join(libraryRoot, 'vue', 'fill', 'index.js'), vueFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'vue', 'outline', 'index.js'), vueOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'vue', 'color', 'index.js'), vueColorExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'vue', 'index.js'), [
	`export * as fill from './fill/index.js';`,
	`export * as outline from './outline/index.js';`,
	`export * as color from './color/index.js';`,
	`export * from './fill/index.js';`
].join('\n') + '\n', 'utf8');

// 5. Generate Svelte components
const svelteFillExports: string[] = [];
const svelteOutlineExports: string[] = [];
const svelteColorExports: string[] = [];

for (const catalogItem of catalog) {
	for (const sourceCandidate of catalogItem.sources) {
		for (const variantName of sourceCandidate.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variantName)) continue;

			const svgFilePath = sourceCandidate.id === 'community'
				? join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, `${variantName}.svg`)
				: join(libraryRoot, 'assets', 'icons', catalogItem.category, catalogItem.name, 'sources', sourceCandidate.id, `${variantName}.svg`);

			try {
				const svgFileContent = await readFile(svgFilePath, 'utf8');
				const componentName = createPascalCaseIdentifier(catalogItem.name);

				const viewBoxMatch = svgFileContent.match(/viewBox="([^"]*)"/);
				const viewBoxAttribute = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerSvgMatch = svgFileContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerSvgContent = innerSvgMatch ? innerSvgMatch[1].trim() : '';

				if (variantName !== 'color') {
					innerSvgContent = sanitizeSvgContent(innerSvgContent, variantName);
				}

				// Svelte 5 component with runes mode
				const svelteComponentCode = `<script>
	let {
		colors = 'currentColor',
		size = 24,
		strokeWidth = 1.5,
		class: className = '',
		...restProperties
	} = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="${viewBoxAttribute}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="color: {colors}"
	class={className}
	role="img"
	aria-label="${catalogItem.title}"
	{...restProperties}
>
${innerSvgContent}
</svg>

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
`;

				await writeFile(
					join(libraryRoot, 'svelte', variantName, `${componentName}.svelte`),
					svelteComponentCode,
					'utf8'
				);

				if (variantName === 'fill') svelteFillExports.push(`export { default as ${componentName} } from './${componentName}.svelte';`);
				if (variantName === 'outline') svelteOutlineExports.push(`export { default as ${componentName} } from './${componentName}.svelte';`);
				if (variantName === 'color') svelteColorExports.push(`export { default as ${componentName} } from './${componentName}.svelte';`);
			} catch {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write Svelte index files
await writeFile(join(libraryRoot, 'svelte', 'fill', 'index.js'), svelteFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'svelte', 'outline', 'index.js'), svelteOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'svelte', 'color', 'index.js'), svelteColorExports.join('\n') + '\n', 'utf8');
await writeFile(join(libraryRoot, 'svelte', 'index.js'), [
	`export * as fill from './fill/index.js';`,
	`export * as outline from './outline/index.js';`,
	`export * as color from './color/index.js';`,
	`export * from './fill/index.js';`
].join('\n') + '\n', 'utf8');

// 6. Copy Vanilla Web Component
await writeFile(
	join(libraryRoot, 'vanilla', 'atsarul-mujahidin.js'),
	await readFile(join(libraryRoot, 'src', 'vanilla', 'atsarul-mujahidin.js'), 'utf8'),
	'utf8'
);

console.log(`✓ Generated components for ${catalog.length} icons across fill, outline, color variants`);
console.log(`✓ React: ${reactFillExports.length + reactOutlineExports.length + reactColorExports.length} components`);
console.log(`✓ Vue: ${vueFillExports.length + vueOutlineExports.length + vueColorExports.length} components`);
console.log(`✓ Svelte: ${svelteFillExports.length + svelteOutlineExports.length + svelteColorExports.length} components`);
