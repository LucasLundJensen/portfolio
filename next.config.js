/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const ContentSecurityPolicy = `
  default-src 'self' vitals.vercel-insights.com media.graphassets.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' vitals.vercel-insights.com;
  child-src vitals.vercel-insights.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' 'unsafe-inline' fonts.gstatic.com;  
`;

const headers = [
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
	},
];

// const applyHeaders =

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
				pathname: "**",
			},
		],
	},
	i18n,
	async headers() {
		if (process.env.NODE_ENV === "production") {
			return [
				{
					// Apply these headers to all routes in your application.
					source: "/:path*",
					headers: headers,
				},
			];
		} else {
			return [];
		}
	},
};

module.exports = nextConfig;
