/**
 * Atsarul Mujahidin Web Component
 * <atsarul-mujahidin variant="mosque" colors="#000" size="24">Masjid</atsarul-mujahidin>
 */

class AtsarulMujahidinIcon extends HTMLElement {
	static observedAttributes = ['variant', 'colors', 'size', 'stroke-width'];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	async render() {
		const variant = this.getAttribute('variant') || 'mosque';
		const colors = this.getAttribute('colors') || 'currentColor';
		const size = this.getAttribute('size') || '24';
		const strokeWidth = this.getAttribute('stroke-width') || '1.5';
		const label = this.textContent?.trim() || variant;

		// Import SVG data dynamically
		try {
			// Try fill first, then outline, then color
			let svgModule;
			try {
				svgModule = await import(`../../fill/${variant}.js`);
			} catch {
				try {
					svgModule = await import(`../../outline/${variant}.js`);
				} catch {
					svgModule = await import(`../../color/${variant}.js`);
				}
			}

			const svgContent = svgModule.default || svgModule[variant];

			if (!svgContent) {
				throw new Error(`Icon "${variant}" not found`);
			}

			// Parse and customize SVG
			const parser = new DOMParser();
			const doc = parser.parseFromString(svgContent, 'image/svg+xml');
			const svg = doc.documentElement;

			// Set size
			svg.setAttribute('width', size);
			svg.setAttribute('height', size);
			svg.setAttribute('role', 'img');
			svg.setAttribute('aria-label', label);

			// Apply colors
			if (colors && colors !== 'currentColor') {
				const paths = svg.querySelectorAll('path, circle, rect, polygon');
				paths.forEach(path => {
					if (!path.hasAttribute('fill') || path.getAttribute('fill') !== 'none') {
						path.setAttribute('fill', colors);
					}
					if (path.hasAttribute('stroke')) {
						path.setAttribute('stroke', colors);
					}
				});
			}

			// Apply stroke-width
			if (strokeWidth) {
				const paths = svg.querySelectorAll('[stroke]');
				paths.forEach(path => {
					path.setAttribute('stroke-width', strokeWidth);
				});
			}

			// Apply CSS classes from host
			if (this.className) {
				svg.setAttribute('class', this.className);
			}

			// Add styles
			const style = document.createElement('style');
			style.textContent = `
				:host {
					display: inline-block;
					line-height: 0;
				}
				svg {
					display: block;
					max-width: 100%;
					max-height: 100%;
				}
			`;

			this.shadowRoot.innerHTML = '';
			this.shadowRoot.appendChild(style);
			this.shadowRoot.appendChild(svg);
		} catch (error) {
			console.error('Athar icon error:', error);
			this.shadowRoot.innerHTML = `
				<style>
					:host { display: inline-block; color: red; }
				</style>
				<span title="${error.message}">⚠</span>
			`;
		}
	}
}

// Register the custom element
if (typeof window !== 'undefined' && !customElements.get('atsarul-mujahidin')) {
	customElements.define('atsarul-mujahidin', AtsarulMujahidinIcon);
}

export default AtharIcon;
