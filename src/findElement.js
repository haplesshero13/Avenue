// @flow
import type Page from 'puppeteer/lib/Page'
import type ElementHandle from 'puppeteer/lib/ElementHandle'
import cssToXPath from 'css-to-xpath'

export default async function(
  page: Page,
  selector: string,
  text: ?string
): Promise<ElementHandle> {
  const xpath =
    typeof text === 'string'
      ? cssToXPath
          .parse(selector)
          .where(cssToXPath.xPathBuilder.text().contains(text))
          .toXPath()
      : cssToXPath(selector)
  const xpathEvaluator = `document.evaluate(
    \`${xpath}\`, document, null, XPathResult.ANY_TYPE, null
  ).iterateNext()`
  await page.waitForFunction(xpathEvaluator)

  const elementHandle = await page.evaluateHandle(xpathEvaluator)
  return elementHandle.asElement()
}
