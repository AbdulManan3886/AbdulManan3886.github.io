import puppeteer from 'puppeteer-core'
const [out, url, w, h, y] = [process.argv[2], process.argv[3], +process.argv[4], +process.argv[5], +process.argv[6]]
const b = await puppeteer.launch({ executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless:'new', args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--hide-scrollbars'], defaultViewport:{width:w,height:h}})
const p = await b.newPage()
await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000})
await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto'})
await new Promise(r=>setTimeout(r,2500))
await p.evaluate((yy)=>window.scrollTo(0,yy), y)
await new Promise(r=>setTimeout(r,2200))
await p.screenshot({path: out})
await b.close()
