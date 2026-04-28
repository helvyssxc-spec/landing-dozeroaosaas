// Gera og-image.png a partir de og-render.html via Puppeteer.
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'og-render.html');
const outPath = resolve(__dirname, 'og-image.png');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500)); // espera Google Fonts
await page.screenshot({ path: outPath, type: 'png', omitBackground: false });
await browser.close();
console.log('OG image generated at:', outPath);
