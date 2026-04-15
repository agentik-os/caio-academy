import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 600 } });
const page = await ctx.newPage();
await page.goto('http://localhost:22020/fr/podcast/vision/business-plan-2025', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
// Clip on hero region with player/generate box
await page.screenshot({ path: '.orchestrator/phase6-screenshots/podcast-player-detail.png', clip: { x: 0, y: 150, width: 1200, height: 500 } });
await browser.close();
