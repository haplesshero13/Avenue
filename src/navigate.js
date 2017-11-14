// @flow
import type Browser from 'puppeteer/lib/Browser'
import type Page from 'puppeteer/lib/Page'

export default async function(browser: Browser, url: string): Promise<Page> {
  const page = await browser.newPage()
  await page.goto(url)
  return page
}
