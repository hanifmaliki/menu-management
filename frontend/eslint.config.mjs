import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat for compatibility with traditional ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define your ESLint configuration
const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Core Web Vitals for Next.js
    "next/typescript" // TypeScript support for Next.js
  ),
  {
    rules: {
      // Custom rules can be added or modified here
      "@typescript-eslint/no-explicit-any": "off", // Disable the 'no-explicit-any' rule
      "@typescript-eslint/no-unused-expressions": "warn", // Warn instead of error for unused expressions
      "@typescript-eslint/no-unused-vars": "warn"
    },
  },
];

export default eslintConfig;