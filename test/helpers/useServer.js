// @flow
import test from 'ava'
import getPort from 'get-port'
import { Server as HttpServer } from 'http'
import { Server as StaticServer } from 'node-static'

export default function() {
  test.beforeEach(async t => {
    const port = await getPort()
    const staticServer = new StaticServer('./')
    const httpServer = new HttpServer()

    httpServer.on('request', (request, response) => {
      staticServer.serve(request, response)
    })
    httpServer.listen(port)

    await new Promise(resolve => {
      httpServer.once('listening', resolve)
    })

    Object.assign(t.context, { httpServer, port })
  })

  test.afterEach(async t => {
    const { httpServer } = t.context
    await new Promise(resolve => {
      httpServer.close(resolve)
    })
  })
}
