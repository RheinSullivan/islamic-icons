/**
 * Vue 3 Base Component for Athar Icons
 */
import { h } from 'vue';

export function createIconComponent(iconName, svgContent, variant = 'fill') {
	return {
		name: `${iconName}Icon`,
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
			},
			class: {
				type: String,
				default: ''
			}
		},
		setup(props, { attrs }) {
			return () => {
				// Parse SVG content
				const parser = new DOMParser();
				const doc = parser.parseFromString(svgContent, 'image/svg+xml');
				const svgEl = doc.documentElement;

				// Extract viewBox
				const viewBox = svgEl.getAttribute('viewBox') || '0 0 24 24';
				
				// Get all SVG children and convert to VNodes
				const svgChildren = Array.from(svgEl.children);
				let svgInnerHTML = svgChildren.map(child => child.outerHTML).join('');

				// Customize colors
				if (props.colors !== 'currentColor') {
					svgInnerHTML = svgInnerHTML.replace(/fill="[^"]*"/g, `fill="${props.colors}"`);
					svgInnerHTML = svgInnerHTML.replace(/stroke="[^"]*"(?!.*fill="none")/g, `stroke="${props.colors}"`);
				}

				// Customize stroke-width
				if (props.strokeWidth) {
					svgInnerHTML = svgInnerHTML.replace(/stroke-width="[^"]*"/g, `stroke-width="${props.strokeWidth}"`);
				}

				return h('svg', {
					width: props.size,
					height: props.size,
					viewBox: viewBox,
					fill: 'none',
					xmlns: 'http://www.w3.org/2000/svg',
					class: props.class,
					role: 'img',
					'aria-label': iconName,
					innerHTML: svgInnerHTML,
					...attrs
				});
			};
		}
	};
}
