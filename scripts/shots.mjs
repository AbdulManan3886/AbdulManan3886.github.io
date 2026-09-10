import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const OUT = process.argv[2] || '/tmp/shots'
const URL = process.argv[3] || 'http://localhost:5273'
const W = Number(process.argv[4] || 1440)
const H = Number(process.argv[5] || 900)

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--hide-scrollbars', '--force-device-scale-factor=1'],
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
})
const page = await browser.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)) })
page.on('requestfailed', (r) => errors.push('reqfail: ' + r.url().slice(0, 120)))

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto' })
await new Promise((r) => setTimeout(r, 3000))

const total = await page.evaluate(() => document.body.scrollHeight)
const steps = Math.ceil(total / H)
console.log(JSON.stringify({ total, viewport: [W, H], steps }))

for (let i = 0; i < steps; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * H)
  await new Promise((r) => setTimeout(r, 1100))
  await page.screenshot({ path: `${OUT}/s${String(i).padStart(2, '0')}.png` })
}

if (errors.length) console.log('ERRORS:\n' + [...new Set(errors)].join('\n'))
else console.log('no page errors')
await browser.close()
