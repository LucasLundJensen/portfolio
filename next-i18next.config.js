const path = require("path");

module.exports = {
	i18n: {
		locales: ["no", "en"],
		defaultLocale: "no",
	},
	localePath: path.resolve("./public/locales"),
};
