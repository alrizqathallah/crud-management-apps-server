// eslint.config.mjs
import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly", // ✅ Mengizinkan penggunaan console
        process: "readonly", // ✅ Untuk dotenv dan environment
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
    },
    rules: {
      // Gunakan konfigurasi Prettier eksternal (.prettierrc)
      ...configPrettier.rules,
      "prettier/prettier": "error",

      // Aturan umum
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",

      // Aturan tambahan untuk import
      "import/order": [
        "warn",
        {
          groups: [["builtin", "external", "internal"]],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
];
