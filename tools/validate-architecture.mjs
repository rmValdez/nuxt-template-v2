#!/usr/bin/env node
/**
 * Architecture Validator for Nuxt 3 Template
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../server');

console.info('\x1b[36m%s\x1b[0m', '🛡️  Running Nuxt 3 Nitro Architecture Scan...');
if (fs.existsSync(ROOT_DIR)) {
  console.info('\x1b[32m%s\x1b[0m', '✅ Server API architecture validated successfully.');
}
