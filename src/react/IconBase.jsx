/**
 * React Base Component for Athar Icons
 */
import React from 'react';

export function createIconComponent(iconName, svgContent, variant = 'fill') {
	const IconComponent = React.forwardRef((props, ref) => {
		const {
			colors = 'currentColor',
			size = 24,
			strokeWidth = 1.5,
			className = '',
			style = {},
			...rest
		} = props;

		// Parse SVG content
		const parser = new DOMParser();
		const doc = parser.parseFromString(svgContent, 'image/svg+xml');
		const svgEl = doc.documentElement;

		// Extract viewBox
		const viewBox = svgEl.getAttribute('viewBox') || '0 0 24 24';
		
		// Get all SVG children
		const svgChildren = Array.from(svgEl.children);
		const svgInnerHTML = svgChildren.map(child => child.outerHTML).join('');

		// Customize colors in SVG
		let customizedSVG = svgInnerHTML;
		if (colors !== 'currentColor') {
			customizedSVG = customizedSVG.replace(/fill="[^"]*"/g, `fill="${colors}"`);
			customizedSVG = customizedSG.replace(/stroke="[^"]*"(?!.*fill="none")/g, `stroke="${colors}"`);
		}

		return (
			<svg
				ref={ref}
				width={size}
				height={size}
				viewBox={viewBox}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={className}
				style={style}
				role="img"
				aria-label={iconName}
				{...rest}
				dangerouslySetInnerHTML={{ __html: customizedSVG }}
			/>
		);
	});

	IconComponent.displayName = `${iconName}Icon`;
	return IconComponent;
}
