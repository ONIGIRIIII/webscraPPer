const puppeteer = require("puppeteer");

(async() => {
    const browser = await puppeteer.launch({
        headless: false , //it run at headless = true by default but at true that mean it doesnt show you the browser
        defaultViewport: false,
        userDataDir: "./tmp"
    }) //launches a new browser
    
    
    // To scrape a single dom element
    const page = await browser.newPage() // launches a new page
    await page.goto("https://www.amazon.com/Apple-MacBook-16-inch-10%E2%80%91core-16%E2%80%91core/dp/B09MSRJ97Y/ref=sr_1_6?crid=1DZWK8SWS4AB9&keywords=macbook&qid=1689319578&sprefix=macboo%2Caps%2C556&sr=8-6")

    //await page.screenshot({path:"example.png"})  screenshots the page and saves it in the path mentioned

    const mainDiv = await page.$$("div.a-section a-spacing-none")
    const title = await page.evaluate(() => document.querySelector("#productTitle").textContent, mainDiv)
    const price = await page.evaluate(()=> document.querySelector(".a-price > .a-offscreen").textContent,mainDiv)
    const image = await page.evaluate(()=>document.querySelector(".a-dynamic-image.a-stretch-horizontal").getAttribute("src"),mainDiv)
    console.log(title,price,image)

    // to scrape multiple dom elements (for example: list of title,price and image from an amazon page)

    // await page.goto("https://www.amazon.com/s?k=gaming+keyboard&pd_rd_r=1290ae0d-f805-47b0-ae69-b81313ef8068&pd_rd_w=4AUXn&pd_rd_wg=bkv67&pf_rd_p=12129333-2117-4490-9c17-6d31baf0582a&pf_rd_r=8XNM87QAR6WFK27SGCNW&ref=pd_gw_unk") //the page go to the specified url 

    // const maindiv = await page.$$("div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item") //parent div
    // for (const products of maindiv){
    //     try {
    //     const title = await page.evaluate(el => el.querySelector("h2 > a > span").textContent, products)
    //     // console.log(title)
    //     const price = await page.evaluate(el => el.querySelector(".a-price > .a-offscreen").textContent, products)
    //     //console.log(price)
    //     const img = await page.evaluate(el => el.querySelector(".s-image").getAttribute("src"), products)
    //     console.log(img)
    // }
    //     catch (error) {    
    //     }
    // }
    //await browser.close() // closes the browser
})();