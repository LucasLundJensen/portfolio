const path = require("path");

module.exports = {
	i18n: {
		locales: ["no", "en"],
		defaultLocale: "no",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
