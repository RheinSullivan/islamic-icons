/**
 * Atsarul Mujahidin - Standalone Icon API Server
 *
 * Lightweight, zero-dependency HTTP server for serving icon metadata
 * and SVG assets to mobile apps, backend services, and external frameworks.
 *
 * Usage:
 *   node library/api/server.js
 *   bun library/api/server.js
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFileDirectory = dirname(fileURLToPath(import.meta.url));

const catalogData = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'catalog.json'), 'utf-8')
);

const categoriesData = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'categories.json'), 'utf-8')
);

const metadataData = JSON.parse(
	readFileSync(resolve(currentFileDirectory, 'metadata.json'), 'utf-8')
);

const serverPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

function sendJsonResponse(serverResponse, statusCode, dataPayload) {
	serverResponse.writeHead(statusCode, {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Cache-Control': 'public, max-age=3600'
	});
	serverResponse.end(JSON.stringify(dataPayload, null, 2));
}

function sendSvgResponse(serverResponse, statusCode, svgContent) {
	serverResponse.writeHead(statusCode, {
		'Content-Type': 'image/svg+xml; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Cache-Control': 'public, max-age=86400'
	});
	serverResponse.end(svgContent);
}

function loadSvgFromVariantFile(iconName, variantName) {
	// 1. Direct check in assets/icons
	const item = catalogData.find((i) => i.name === iconName);
	if (item) {
		const directPath = resolve(
			currentFileDirectory,
			`../assets/icons/${item.category}/${iconName}/${variantName}.svg`
		);
		if (existsSync(directPath)) {
			return readFileSync(directPath, 'utf-8');
		}
	}

	// 2. Fallback to JS variant file
	const possiblePath = resolve(
		currentFileDirectory,
		`../${variantName}/${iconName}.js`
	);

	if (!existsSync(possiblePath)) {
		return null;
	}

	try {
		const fileContent = readFileSync(possiblePath, 'utf-8');
		const svgMatch = fileContent.match(/export const \w+ = ("[\s\S]*?");/);
		if (svgMatch && svgMatch[1]) {
			return JSON.parse(svgMatch[1]);
		}
		return null;
	} catch (error) {
		console.error(`Error loading SVG for ${iconName} (${variantName}):`, error);
		return null;
	}
}

const httpServer = createServer((incomingRequest, serverResponse) => {
	// Handle CORS preflight
	if (incomingRequest.method === 'OPTIONS') {
		serverResponse.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		});
		serverResponse.end();
		return;
	}

	const parsedUrl = new URL(
		incomingRequest.url || '/',
		`http://${incomingRequest.headers.host || 'localhost'}`
	);
	const pathname = parsedUrl.pathname;

	// Health check
	if (pathname === '/health') {
		sendJsonResponse(serverResponse, 200, { status: 'healthy', timestamp: new Date().toISOString() });
		return;
	}

	// Metadata
	if (pathname === '/api/metadata' || pathname === '/api/metadata.json') {
		sendJsonResponse(serverResponse, 200, metadataData);
		return;
	}

	// Categories
	if (pathname === '/api/categories' || pathname === '/api/categories.json') {
		sendJsonResponse(serverResponse, 200, categoriesData);
		return;
	}

	// Catalog
	if (pathname === '/api/catalog' || pathname === '/api/catalog.json') {
		sendJsonResponse(serverResponse, 200, catalogData);
		return;
	}

	// Search
	if (pathname === '/api/search') {
		const searchParam = (parsedUrl.searchParams.get('q') || '').toLowerCase().trim();
		const categoryParam = parsedUrl.searchParams.get('category') || '';

		const filteredIcons = catalogData.filter((iconItem) => {
			const matchesCategory = categoryParam ? iconItem.category === categoryParam : true;
			const matchesQuery = searchParam
				? iconItem.name.toLowerCase().includes(searchParam) ||
					iconItem.title.toLowerCase().includes(searchParam)
				: true;
			return matchesCategory && matchesQuery;
		});

		sendJsonResponse(serverResponse, 200, {
			query: searchParam,
			category: categoryParam,
			total: filteredIcons.length,
			icons: filteredIcons
		});
		return;
	}

	// Raw SVG: /api/icons/:name/:variant.svg
	const svgRouteMatch = pathname.match(/^\/api\/icons\/([^/]+)\/([^/]+)\.svg$/);
	if (svgRouteMatch) {
		const targetIconName = svgRouteMatch[1];
		const targetVariantName = svgRouteMatch[2];

		const svgContent = loadSvgFromVariantFile(targetIconName, targetVariantName);
		if (svgContent) {
			sendSvgResponse(serverResponse, 200, svgContent);
			return;
		}

		sendJsonResponse(serverResponse, 404, {
			error: 'Icon variant not found',
			icon: targetIconName,
			variant: targetVariantName
		});
		return;
	}

	// Single Icon metadata: /api/icons/:name
	const iconRouteMatch = pathname.match(/^\/api\/icons\/([^/]+)$/);
	if (iconRouteMatch) {
		const requestedIconName = iconRouteMatch[1];
		const foundIcon = catalogData.find((iconItem) => iconItem.name === requestedIconName);

		if (foundIcon) {
			sendJsonResponse(serverResponse, 200, foundIcon);
			return;
		}

		sendJsonResponse(serverResponse, 404, {
			error: 'Icon not found',
			icon: requestedIconName
		});
		return;
	}

	// Root welcome
	if (pathname === '/' || pathname === '/api') {
		sendJsonResponse(serverResponse, 200, {
			name: 'Atsarul Mujahidin API',
			description: 'Universal REST API for Islamic Icons',
			documentation: 'https://atsarulmujahidin.rheinsullivan.web.id/docs/frameworks',
			endpoints: {
				catalog: '/api/catalog',
				categories: '/api/categories',
				metadata: '/api/metadata',
				search: '/api/search?q=mosque',
				icon: '/api/icons/:name',
				iconSvg: '/api/icons/:name/:variant.svg'
			}
		});
		return;
	}

	// 404 Not Found
	sendJsonResponse(serverResponse, 404, {
		error: 'Endpoint not found',
		path: pathname
	});
});

httpServer.listen(serverPort, () => {
	console.log(`Atsarul Mujahidin Icon API Server running on http://localhost:${serverPort}`);
});

export default httpServer;
