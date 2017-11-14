// @flow
import type Browser from 'puppeteer/lib/Browser'
import puppeteer from 'puppeteer'

export default function(): Promise<Browser> {
  return puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
}
