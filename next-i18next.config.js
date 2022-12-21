const path = require("path");

module.exports = {
	i18n: {
		locales: ["en_US", "no_NO"],
		defaultLocale: "no_NO",
	},
	localePath: path.resolve("./public/locales"),
};
