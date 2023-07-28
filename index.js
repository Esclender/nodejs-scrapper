const { chromium } = require('playwright')
const { getOfferOBj } = require('./utilities/getOfferObj.js')
const Db = require('./db')

const url = 'https://latamtravel-peru.despegar.com.pe/?utm_source=latamairlines'

const infoArr = [
  {
    tag: '.offer-card-pricebox-price-amount',
    attr: 'price'
  },
  {
    tag: '.offer-card-title',
    attr: 'title'
  },
  {
    tag: '.offer-card-image-main',
    attr: 'image',
    src: async (father, tag) => {
      return await father.locator(tag).evaluate(node => node.src)
    }
  },
  {
    tag: '.offer-card-main-driver > .driver-text',
    attr: 'avaible'
  },
  {
    tag: '.rating-text',
    attr: 'rating'
  },
  {
    tag: '.luggage-item-title',
    attr: 'benefits',
    array: true
  }
]

const connectDb = async (data) => {
  const database = new Db()

  const { message } = await database.inserter(data)
  database.close()

  return message
};

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const offere = await page.locator('.offer-card-container').all()
  const data = await getOfferOBj(page, infoArr, offere)

  console.log(await connectDb(data))

  await browser.close()
})()
