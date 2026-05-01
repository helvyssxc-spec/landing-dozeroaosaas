// Gera logo-kiwify.png (600x120) a partir de logo-render.html
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dirname, 'logo-render.html');
const outPath = resolve(__dirname, 'logo-kiwify.png');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 600, height: 120, deviceScaleFactor: 2 });
await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({ path: outPath, type: 'png', omitBackground: false });
await browser.close();
console.log('Logo gerado:', outPath);
