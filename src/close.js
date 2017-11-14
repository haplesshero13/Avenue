// @flow
import type Browser from 'puppeteer/lib/Browser'

export default async function(browser: Browser): Promise<void> {
  await browser.close()
}
