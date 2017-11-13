// @flow
import test from 'ava'
import { useServer } from './helpers'
import puppeteer from 'puppeteer'
import findElement from '../src/findElement'

useServer()

test('it works', async t => {
  const { port } = t.context

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}`)

  const paragraph = await findElement(page, 'p')
  console.log(await paragraph.boundingBox())

  await browser.close()
  t.pass()
})
