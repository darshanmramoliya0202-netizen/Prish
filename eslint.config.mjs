import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/**", "assets-src/**", "playwright-report/**", "test-results/**"]),
  {
    rules: {
      // three.js / R3F props are not DOM attributes
      "react/no-unknown-property": "off",
    },
  },
  {
    // @react-pdf primitives are not DOM elements
    files: ["lib/pdf/**/*.tsx"],
    rules: { "jsx-a11y/alt-text": "off" },
  },
]);
