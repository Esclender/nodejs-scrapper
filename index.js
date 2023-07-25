const { chromium } = require('playwright')

const url = 'https://latamtravel-peru.despegar.com.pe/?utm_source=latamairlines'

const infoArr = [
  {
    tag: '.offer-card-pricebox-price-amount',
    attr: 'Price'
  },
  {
    tag: '.offer-card-title',
    attr: 'Title'
  },
  {
    tag: '.offer-card-image-main',
    attr: 'Image',
    src: async (offer) => {
      return await offer.evaluate(node => node.src)
    }
  }
]

const getOfferOBj = async (page, infos) => {
  const obj = []

  for (const info of infos) {
    const offer = await page.locator(info.tag).all()

    for (let i = 0; i < offer.length; i++) {
      if (!info.src) {
        obj[i] = {
          ...obj[i],
          [info.attr]: await offer[i].textContent()
        }
      } else {
        obj[i] = {
          ...obj[i],
          [info.attr]: await info.src(offer[i])
        }
      }
    }
  }

  return obj
}

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(url)
  console.log(await getOfferOBj(page, infoArr))

  await browser.close()
})()

/* console.log(await (await offer[i].evaluate(node => node.src)).jsonValue()) */
