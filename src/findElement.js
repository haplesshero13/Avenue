// @flow
import type Page from 'puppeteer/lib/Page'
import type ElementHandle from 'puppeteer/lib/ElementHandle'
import cssToXPath from 'css-to-xpath'

export default function(
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

  return page.evaluateHandle(
    xpath =>
      document
        .evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)
        .iterateNext(),
    xpath
  )
}
