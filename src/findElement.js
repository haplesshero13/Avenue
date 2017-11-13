// @flow
import type Page from 'puppeteer/lib/Page'
import type ElementHandle from 'puppeteer/lib/ElementHandle'

export default function(page: Page, selector: string): Promise<ElementHandle> {
  return page.$(selector)
}
