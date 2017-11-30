// @flow

import xPathBuilder from 'xpath-builder'
import puppeteer from 'puppeteer'
import type { Page, Browser } from 'puppeteer'

const x = xPathBuilder.dls()

class Q {
  constructor(page: Page, browser: Browser): Q {
    this.page = page
    this.browser = browser
  }

  goto = async (url: string): Promise<any> => this.page.goto(url)

  inputField = (locator: string): string => {
    const fieldPath = x.descendant('input')
      .where(x.inverse(x.attr('type').oneOf('submit', 'image', 'hidden')))
    return locateField(fieldPath, locator)
  }
}

const CreateQ = async (headless: boolean): Q => {
  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()

  return new Q(page, browser)
}

module.exports = CreateQ
