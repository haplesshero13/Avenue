// @flow
import test from 'ava'
import { useServer } from './helpers'
import { open, close, navigate, findElement } from '../src'

useServer()

test('finds elements by selector & text', async t => {
  const { port } = t.context

  const browser = await open()
  const page = await navigate(browser, `http://localhost:${port}`)

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

  await close(browser)
})

test('finds delayed elements', async t => {
  const { port } = t.context

  const browser = await open()
  const page = await navigate(browser, `http://localhost:${port}`)

  const delayedElement = await findElement(page, 'p', 'delayed element')
  t.true(delayedElement !== null)

  await close(browser)
})
