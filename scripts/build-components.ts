// Build React, Vue, Svelte components and variant-based exports
// Run AFTER build-catalog.ts
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(new URL('.', import.meta.url)));
const catalog = JSON.parse(await readFile(join(root, 'assets', 'catalog.json'), 'utf8'));

const ident = (s: string) =>
	String(s)
		.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
		.replace(/[^A-Za-z0-9_$]/g, '');

const titleCase = (s: string) =>
	String(s)
		.split('-')
		.map(w => w[0].toUpperCase() + w.slice(1))
		.join('');

// 1. Clean output directories
await rm(join(root, 'fill'), { recursive: true, force: true });
await rm(join(root, 'outline'), { recursive: true, force: true });
await rm(join(root, 'color'), { recursive: true, force: true });
await rm(join(root, 'react'), { recursive: true, force: true });
await rm(join(root, 'vue'), { recursive: true, force: true });
await rm(join(root, 'svelte'), { recursive: true, force: true });
await rm(join(root, 'vanilla'), { recursive: true, force: true });

await mkdir(join(root, 'fill'), { recursive: true });
await mkdir(join(root, 'outline'), { recursive: true });
await mkdir(join(root, 'color'), { recursive: true });
await mkdir(join(root, 'react', 'fill'), { recursive: true });
await mkdir(join(root, 'react', 'outline'), { recursive: true });
await mkdir(join(root, 'react', 'color'), { recursive: true });
await mkdir(join(root, 'vue', 'fill'), { recursive: true });
await mkdir(join(root, 'vue', 'outline'), { recursive: true });
await mkdir(join(root, 'vue', 'color'), { recursive: true });
await mkdir(join(root, 'svelte', 'fill'), { recursive: true });
await mkdir(join(root, 'svelte', 'outline'), { recursive: true });
await mkdir(join(root, 'svelte', 'color'), { recursive: true });
await mkdir(join(root, 'vanilla'), { recursive: true });

// 2. Generate variant-based exports (fill/outline/color)
for (const item of catalog) {
	for (const source of item.sources) {
		for (const variant of source.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variant)) continue;

			// Read the SVG file
			const svgPath = source.id === 'community'
				? join(root, 'assets', 'icons', item.category, item.name, `${variant}.svg`)
				: join(root, 'assets', 'icons', item.category, item.name, 'sources', source.id, `${variant}.svg`);

			try {
				const svgContent = await readFile(svgPath, 'utf8');
				const iconName = ident(item.name);

				// Export SVG content as string
				const exportFile = `// ${item.title} - ${variant}
export const ${iconName} = ${JSON.stringify(svgContent)};
export default ${iconName};
`;
				await writeFile(join(root, variant, `${item.name}.js`), exportFile, 'utf8');
			} catch (err) {
				// SVG file doesn't exist for this variant, skip
			}
		}
	}
}

// 3. Generate React components
const reactFillExports: string[] = [];
const reactOutlineExports: string[] = [];
const reactColorExports: string[] = [];

for (const item of catalog) {
	for (const source of item.sources) {
		for (const variant of source.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variant)) continue;

			const svgPath = source.id === 'community'
				? join(root, 'assets', 'icons', item.category, item.name, `${variant}.svg`)
				: join(root, 'assets', 'icons', item.category, item.name, 'sources', source.id, `${variant}.svg`);

			try {
				const svgContent = await readFile(svgPath, 'utf8');
				const ComponentName = titleCase(item.name);

				// Parse SVG
				const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
				const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerContent = innerMatch ? innerMatch[1].trim() : '';

				// Replace hardcoded black fills with currentColor ONLY for fill/outline variants
				// DO NOT replace for color/multicolor variants - preserve original colors
				if (variant !== 'color') {
					innerContent = innerContent.replace(/fill="#000000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="#000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="black"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/stroke="#000000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="#000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="black"/g, 'stroke="currentColor"');
				}

				// React component
				const reactComponent = `import React from 'react';

export const ${ComponentName} = React.forwardRef((props, ref) => {
	const {
		colors = 'currentColor',
		size = 24,
		strokeWidth = 1.5,
		className = '',
		style = {},
		...rest
	} = props;

	return (
		<svg
			ref={ref}
			width={size}
			height={size}
			viewBox="${viewBox}"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			style={{ ...style, color: colors }}
			role="img"
			aria-label="${item.title}"
			{...rest}
		>
${innerContent}
		</svg>
	);
});

${ComponentName}.displayName = '${ComponentName}';
export default ${ComponentName};
`;

				await writeFile(
					join(root, 'react', variant, `${ComponentName}.jsx`),
					reactComponent,
					'utf8'
				);

				if (variant === 'fill') reactFillExports.push(`export { ${ComponentName} } from './${ComponentName}.jsx';`);
				if (variant === 'outline') reactOutlineExports.push(`export { ${ComponentName} } from './${ComponentName}.jsx';`);
				if (variant === 'color') reactColorExports.push(`export { ${ComponentName} } from './${ComponentName}.jsx';`);
			} catch (err) {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write React index files
await writeFile(join(root, 'react', 'fill', 'index.js'), reactFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'react', 'outline', 'index.js'), reactOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'react', 'color', 'index.js'), reactColorExports.join('\n') + '\n', 'utf8');

// 4. Generate Vue components
const vueFillExports: string[] = [];
const vueOutlineExports: string[] = [];
const vueColorExports: string[] = [];

for (const item of catalog) {
	for (const source of item.sources) {
		for (const variant of source.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variant)) continue;

			const svgPath = source.id === 'community'
				? join(root, 'assets', 'icons', item.category, item.name, `${variant}.svg`)
				: join(root, 'assets', 'icons', item.category, item.name, 'sources', source.id, `${variant}.svg`);

			try {
				const svgContent = await readFile(svgPath, 'utf8');
				const ComponentName = titleCase(item.name);

				const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
				const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerContent = innerMatch ? innerMatch[1].trim() : '';

				// Replace hardcoded black fills with currentColor ONLY for fill/outline variants
				// DO NOT replace for color/multicolor variants - preserve original colors
				if (variant !== 'color') {
					innerContent = innerContent.replace(/fill="#000000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="#000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="black"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/stroke="#000000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="#000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="black"/g, 'stroke="currentColor"');
				}

				// Vue component
				const vueComponent = `<script>
export default {
	name: '${ComponentName}',
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
		viewBox="${viewBox}"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		:style="{ color: colors }"
		role="img"
		aria-label="${item.title}"
		v-bind="$attrs"
	>
${innerContent}
	</svg>
</template>
`;

				await writeFile(
					join(root, 'vue', variant, `${ComponentName}.vue`),
					vueComponent,
					'utf8'
				);

				if (variant === 'fill') vueFillExports.push(`export { default as ${ComponentName} } from './${ComponentName}.vue';`);
				if (variant === 'outline') vueOutlineExports.push(`export { default as ${ComponentName} } from './${ComponentName}.vue';`);
				if (variant === 'color') vueColorExports.push(`export { default as ${ComponentName} } from './${ComponentName}.vue';`);
			} catch (err) {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write Vue index files
await writeFile(join(root, 'vue', 'fill', 'index.js'), vueFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'vue', 'outline', 'index.js'), vueOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'vue', 'color', 'index.js'), vueColorExports.join('\n') + '\n', 'utf8');

// 5. Generate Svelte components
const svelteFillExports: string[] = [];
const svelteOutlineExports: string[] = [];
const svelteColorExports: string[] = [];

for (const item of catalog) {
	for (const source of item.sources) {
		for (const variant of source.variants || []) {
			if (!['fill', 'outline', 'color'].includes(variant)) continue;

			const svgPath = source.id === 'community'
				? join(root, 'assets', 'icons', item.category, item.name, `${variant}.svg`)
				: join(root, 'assets', 'icons', item.category, item.name, 'sources', source.id, `${variant}.svg`);

			try {
				const svgContent = await readFile(svgPath, 'utf8');
				const ComponentName = titleCase(item.name);

				const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
				const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
				const innerMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
				let innerContent = innerMatch ? innerMatch[1].trim() : '';

				// Replace hardcoded black fills with currentColor ONLY for fill/outline variants
				// DO NOT replace for color/multicolor variants - preserve original colors
				if (variant !== 'color') {
					innerContent = innerContent.replace(/fill="#000000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="#000"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/fill="black"/g, 'fill="currentColor"');
					innerContent = innerContent.replace(/stroke="#000000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="#000"/g, 'stroke="currentColor"');
					innerContent = innerContent.replace(/stroke="black"/g, 'stroke="currentColor"');
				}

				// Svelte 5 component with runes mode
				const svelteComponent = `<script>
	let {
		colors = 'currentColor',
		size = 24,
		strokeWidth = 1.5,
		class: className = '',
		...restProps
	} = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="${viewBox}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="color: {colors}"
	class={className}
	role="img"
	aria-label="${item.title}"
	{...restProps}
>
${innerContent}
</svg>

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
`;

				await writeFile(
					join(root, 'svelte', variant, `${ComponentName}.svelte`),
					svelteComponent,
					'utf8'
				);

				if (variant === 'fill') svelteFillExports.push(`export { default as ${ComponentName} } from './${ComponentName}.svelte';`);
				if (variant === 'outline') svelteOutlineExports.push(`export { default as ${ComponentName} } from './${ComponentName}.svelte';`);
				if (variant === 'color') svelteColorExports.push(`export { default as ${ComponentName} } from './${ComponentName}.svelte';`);
			} catch (err) {
				// Skip if SVG doesn't exist
			}
		}
	}
}

// Write Svelte index files
await writeFile(join(root, 'svelte', 'fill', 'index.js'), svelteFillExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'svelte', 'outline', 'index.js'), svelteOutlineExports.join('\n') + '\n', 'utf8');
await writeFile(join(root, 'svelte', 'color', 'index.js'), svelteColorExports.join('\n') + '\n', 'utf8');

// 6. Copy Vanilla Web Component
await writeFile(
	join(root, 'vanilla', 'atsarul-mujahidin.js'),
	await readFile(join(root, 'src', 'vanilla', 'atsarul-mujahidin.js'), 'utf8'),
	'utf8'
);

console.log(`✓ Generated components for ${catalog.length} icons across fill, outline, color variants`);
console.log(`✓ React: ${reactFillExports.length + reactOutlineExports.length + reactColorExports.length} components`);
console.log(`✓ Vue: ${vueFillExports.length + vueOutlineExports.length + vueColorExports.length} components`);
console.log(`✓ Svelte: ${svelteFillExports.length + svelteOutlineExports.length + svelteColorExports.length} components`);
