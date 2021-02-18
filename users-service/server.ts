import http, { Server } from 'http'
import app from './src/app'
import consola from 'consola'

const server = http.createServer(app) as Server
const host: any = process.env.HOST
const port: any = process.env.PORT

server.listen(port, host, (): void => consola.success(`server is running on ${port}`))
