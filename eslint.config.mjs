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
        console: "readonly", // ✅ Boleh pakai console.log
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
      // ✅ Integrasi Prettier (pakai .prettierrc eksternal)
      "prettier/prettier": "error",

      // ✅ Aturan umum
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",

      // ❌ Matikan aturan import/order
      "import/order": "off",
    },
  },
  // Letakkan config Prettier di akhir agar override aturan gaya
  configPrettier,
];
