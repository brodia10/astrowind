// Enums for scenarios
enum Scenario {
	Api = 'api',
	Assets = 'assets',
	Site = 'site',
	Dashboard = 'dashboard',
	BloomPublicSite = 'bloomPublicSite',
	BloomAdminDashboard = 'bloomAdminDashboard',
	PostmarkReturnPath = 'postmarkReturnPath',
	Default = 'default'
}

// TODO:
// To handle custom domains: Call api and get list of tenants and domains. Store a dictionary of tenants and domains in redis 

// Constants for subdomains and domains
const SUBDOMAIN_SITE_SUFFIX = '-site.bloomcms.io';
const SUBDOMAIN_DASHBOARD_SUFFIX = '-dashboard.bloomcms.io';
const DOMAIN_BLOOM_PUBLIC_SITE = 'bloomcms.io';
const DOMAIN_BLOOM_PUBLIC_SITE_WWW = 'www.bloomcms.io';
const POSTMARK_RETURN_PATH = 'pm-bounces';
const POSTMARK_RETURN_PATH_HOST = 'https://pm.mtasv.net'


// URLs
const PUBLIC_SITE_SERVER_URL = 'https://bloomcms.pages.dev';
const ADMIN_DASHBOARD_SERVER_URL = 'https://bloomcms-production.up.railway.app';
const BLOOM_PUBLIC_SITE_URL = 'https://bloomcms.io';

interface Destination {
	destinationURL: string;
	displayURL?: string;
}

function createProxyRequest(request: Request, destinationURL: string, url: URL): Request {
	let destinationPath = new URL(destinationURL).pathname;
	let requestPath = url.pathname;

	// Remove the trailing slash for proper concatenation if destinationPath has one
	if (destinationPath.endsWith('/')) {
		destinationPath = destinationPath.slice(0, -1);
	}

	// Avoid duplicating the base path if it's already present in the request path
	if (requestPath.startsWith(destinationPath)) {
		requestPath = requestPath.slice(destinationPath.length);
	}

	const newRequest = new Request(destinationURL + requestPath + url.search, request);
	newRequest.headers.set('Origin', url.hostname);
	return newRequest;
}


async function fetchAndApplyContentType(newRequest: Request, contentType: string): Promise<Response> {
	const response = await fetch(newRequest);
	console.log('content type', contentType)
	if (!response.ok && response.headers.get('Content-Type')?.startsWith('text/html')) {
		console.error('Received HTML content for a static asset request. Check proxy routing rules.');
		return new Response('Incorrect content type received', { status: 500 });
	}
	const newHeaders = new Headers(response.headers);
	if (contentType) {
		newHeaders.set('Content-Type', contentType);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: newHeaders
	});
}


async function fetchRequest(newRequest: Request): Promise<Response> {
	return fetch(newRequest);
}

function getContentType(url: URL): string | null {
	if (url.pathname.endsWith('.css')) {
		return 'text/css';
	} else if (url.pathname.endsWith('.webmanifest')) {
		return 'application/manifest+json';
	}
	return null;
}

function modifyResponseForDashboard(response: Response, displayURL?: string): Response {
	if (!displayURL) return response;

	const modifiedResponse = new Response(response.body, response);
	modifiedResponse.headers.set('Location', displayURL);
	return modifiedResponse;
}


function getScenario(hostname: string, pathname: string): Scenario {
	if ((hostname === DOMAIN_BLOOM_PUBLIC_SITE || hostname === DOMAIN_BLOOM_PUBLIC_SITE_WWW) && pathname.startsWith('/admin')) {
		return Scenario.BloomAdminDashboard;
	}
	if (hostname.endsWith(SUBDOMAIN_SITE_SUFFIX) && pathname.startsWith('/admin')) {
		return Scenario.Dashboard;
	} else if (pathname.startsWith('/api/')) {
		return Scenario.Api;
	} else if (pathname.startsWith('/assets/')) {
		return Scenario.Assets;
	} else if (hostname.endsWith(SUBDOMAIN_SITE_SUFFIX)) {
		return Scenario.Site;
	} else if (hostname.endsWith(SUBDOMAIN_DASHBOARD_SUFFIX)) {
		return Scenario.Dashboard;
	} else if (hostname === DOMAIN_BLOOM_PUBLIC_SITE || hostname === DOMAIN_BLOOM_PUBLIC_SITE_WWW) {
		return Scenario.BloomPublicSite;
	} else if (hostname.startsWith(POSTMARK_RETURN_PATH)) {
		return Scenario.PostmarkReturnPath;
	} else {
		return Scenario.Default;
	}
}


function determineDestination(url: URL): Destination {
	const scenario = getScenario(url?.hostname, url.pathname);
	console.log(`Determined scenario: ${scenario} for hostname: ${url?.hostname} and pathname: ${url?.pathname}\n}`);

	switch (scenario) {
		case Scenario.Site:
			return {
				destinationURL: url.pathname.startsWith('/admin') ? ADMIN_DASHBOARD_SERVER_URL : PUBLIC_SITE_SERVER_URL,
				displayURL: url.hostname + url.pathname
			};
		case Scenario.Api:
		case Scenario.Assets:
			return {
				destinationURL: ADMIN_DASHBOARD_SERVER_URL,
				displayURL: url.hostname + url.pathname
			};
		case Scenario.Dashboard:
			// Ensure static assets in the admin path are correctly proxied
			if (url.pathname.startsWith('/admin')) {
				return { destinationURL: ADMIN_DASHBOARD_SERVER_URL + url.pathname };
			} else if (url.pathname === '/') {
				return {
					destinationURL: ADMIN_DASHBOARD_SERVER_URL + '/admin',
					displayURL: url.hostname + '/admin'
				};
			} else {
				return { destinationURL: ADMIN_DASHBOARD_SERVER_URL };
			}
		case Scenario.BloomPublicSite:
			return {
				destinationURL: PUBLIC_SITE_SERVER_URL,
				displayURL: url.hostname + url.pathname
			};
		case Scenario.BloomAdminDashboard:
			// Add specific handling for the root path redirect to /admin
			// Ensure static assets in the admin path are correctly proxied
			if (url.pathname.startsWith('/admin')) {
				return { destinationURL: ADMIN_DASHBOARD_SERVER_URL + url.pathname };
			} else if (url.pathname === '/') {
				return {
					destinationURL: ADMIN_DASHBOARD_SERVER_URL + '/admin',
					displayURL: url.hostname + '/admin'
				};
			} else {
				return { destinationURL: ADMIN_DASHBOARD_SERVER_URL };
			}
		case Scenario.PostmarkReturnPath:
			return { destinationURL: POSTMARK_RETURN_PATH_HOST }
		default:
			return { destinationURL: BLOOM_PUBLIC_SITE_URL };
	}
}

export default {
	async fetch(request: Request): Promise<Response> {
		console.log(request.url);
		const url = new URL(request.url);

		const scenario = getScenario(url.hostname, url.pathname);
		const { destinationURL, displayURL } = determineDestination(url);
		const contentType = getContentType(url);

		try {
			const newRequest = createProxyRequest(request, destinationURL, url);
			console.log(`Proxying request to: ${newRequest.url}`);
			const response = await fetchRequest(newRequest);
			// let response;
			// if (contentType) {
			// 	response = await fetchAndApplyContentType(newRequest, contentType);
			// } else {
			// 	response = await fetchRequest(newRequest);
			// }

			// Do not modify the response for assets or the web manifest file
			if (scenario === Scenario.Assets || scenario === Scenario.BloomPublicSite || scenario == Scenario.PostmarkReturnPath) {
				return response;
			}

			// return modifyResponseForDashboard(response, displayURL);
			return response;
		} catch (error) {
			console.error('Error fetching the new request:', error);
			return new Response('Error fetching the request', { status: 500 });
		}
	},
};

