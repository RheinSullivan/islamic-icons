/**
 * Svelte Icon Component Generator
 * Returns Svelte component string that can be written to .svelte file
 */

export function createIconComponent(iconName, svgContent, variant = 'fill') {
	// Parse SVG to extract viewBox and paths
	const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
	const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
	
	// Extract SVG inner content (everything between <svg> tags)
	const innerMatch = svgContent.match(/<svg[^>]*>(.*?)<\/svg>/s);
	const innerContent = innerMatch ? innerMatch[1] : '';

	// Clean up the SVG content for Svelte
	const cleanedContent = innerContent
		.replace(/fill="currentColor"/g, 'fill={colors}')
		.replace(/stroke="currentColor"/g, 'stroke={colors}')
		.replace(/stroke-width="[^"]*"/g, 'stroke-width={strokeWidth}');

	return `<script>
	export let colors = 'currentColor';
	export let size = 24;
	export let strokeWidth = 1.5;
	let className = '';
	export { className as class };
</script>

<svg
	width={size}
	height={size}
	viewBox="${viewBox}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	role="img"
	aria-label="${iconName}"
	{...$$restProps}
>
${cleanedContent}
</svg>

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
`;
}
