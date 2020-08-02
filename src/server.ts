import config, { EndpointConfig } from './config'
import version from './version.generated'
import controllers from './controllers'
import logger from './services/logger'
import compression from 'compression'
import redis from './services/redis'
import express from 'express'
import https from 'https'
import http from 'http'
import cors from 'cors'
import path from 'path'

// Initialize External Modules

logger.initializeLogger(config.logging.path, config.logging.filename)
logger.info('Running ArisLabs Backend - ' + version.major + '.' + version.minor + '.' + version.patch + ' Build ' + version.build)

if (config.redis.use) {
  logger.info(`Using redis at ${config.redis.host}:${config.redis.port}`)
  redis.initialize(config.redis.host, config.redis.port, config.redis.database, config.redis.password)
}

// App Configuration

const app = express()

app.use(cors())
app.use(express.json())
if (config.environment === 'production') app.use(compression())
app.use('/', express.static(path.resolve(config.server.root.replace('%CurrentDirectory%', __dirname))))
controllers(app)

// Version route

app.get('/api/version', (req, res) => {
  res.json({ Version: version.major + '.' + version.minor + '.' + version.patch, Build: version.build })
})

// Server Activation

config.server.endpoints.forEach((endpoint: EndpointConfig) => {
  if (endpoint.enabled) {
    if (endpoint.useSSL) {
      https.createServer(endpoint.options, app).listen(endpoint.port, endpoint.host)
      logger?.info(`Listening on https://${endpoint.host}:${endpoint.port}`)
    } else {
      http.createServer(app).listen(endpoint.port, endpoint.host)
      logger?.info(`Listening on http://${endpoint.host}:${endpoint.port}`)
    }
  }
})

export default app
