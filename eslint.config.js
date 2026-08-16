const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: [
            "node_modules/**",
            "coverage/**",
        ],
    },

    js.configs.recommended,

    {
        files: ["eslint.config.js"],

        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    {
        files: [
            "src/**/*.js",
            "tests/**/*.js",
        ],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",

            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
            },
        },
    },
];