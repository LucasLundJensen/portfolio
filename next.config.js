/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'vitals.vercel-insights.com';
  child-src vitals.vercel-insights.com;
  style-src 'self';
  font-src 'self';  
`;

const headers = [
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
	},
];

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
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/:path*",
				headers: headers,
			},
		];
	},
};

module.exports = nextConfig;
