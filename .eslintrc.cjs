/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
	parser: "@typescript-eslint/parser",
	plugins: ["svelte", "@typescript-eslint", "prettier"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			processor: "svelte/svelte",
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	rules: {
		"prettier/prettier": ["warn"],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				varsIgnorePattern: "^_",
				argsIgnorePattern: "^_",
			},
		],
	},
};
