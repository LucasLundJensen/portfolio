/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-gray": "#111111",
				"dark-lightgray": "#1e1e1e",
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			screens: {
				tall: { raw: "(min-height: 1300px)" },
			},
			transitionProperty: {
				introduction: "width, opacity, visibility",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
	darkMode: "class",
};
