// @flow
import test from 'ava'
import { useServer } from './helpers'
import puppeteer from 'puppeteer'
import findElement from '../src/findElement'

useServer()

test('finds elements by selector & text', async t => {
  const { port } = t.context

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}`)

  const otherStuff = await findElement(page, 'p')
  t.deepEqual(await otherStuff.boundingBox(), {
    x: 8,
    y: 16,
    width: 784,
    height: 18
  })

  const helloWorld = await findElement(page, 'p', 'Hello World!')
  t.deepEqual(await helloWorld.boundingBox(), {
    x: 8,
    y: 50,
    width: 784,
    height: 18
  })

  await browser.close()
  t.pass()
})

test('finds delayed elements', async t => {
  const { port } = t.context

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}`)

  const delayedElement = await findElement(page, 'p', 'delayed element')
  t.true(delayedElement !== null)

  await browser.close()
  t.pass()
})
