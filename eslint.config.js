// eslint.config.js (CommonJS version)
const { dirname } = require("path");
const { fileURLToPath } = require("url");
const { FlatCompat } = require("@eslint/eslintrc");

// __filename and __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the FlatCompat helper
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend the Next.js core-web-vitals config
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
];

// Export via CommonJS
module.exports = eslintConfig;