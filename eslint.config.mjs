import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    ignores: ["dist/**", "node_modules/**"],
    files: ["**/*.ts"],
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": "warn",
      semi: ["warn", "always"],
      eqeqeq: ["error", "always"],
      "no-console": "off",
      "no-var": "error",
    },
  },
  tseslint.configs.recommended,
]);
