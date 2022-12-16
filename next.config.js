/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
				pathname: "**",
			},
		],
	},
};

module.exports = nextConfig;
