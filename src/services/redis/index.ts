import redis, { RedisClient } from 'redis'
import Promise from 'bluebird'
import logger from '../logger'

Promise.promisifyAll(redis.RedisClient.prototype)

declare module 'redis' {
  export interface RedisClient extends NodeJS.EventEmitter {
    setAsync(key: string, value: string): Promise<void>
    getAsync(key: string): Promise<string>
  }
}

class RedisManager {
  public client: RedisClient = <RedisClient>{}

  initialize(host: string, port: number, database: string | number, password?: string) {
    this.client = redis.createClient({
      host: host,
      port: port,
      db: database,
      password: password
    })

    this.client.on('error', function (error: any) {
      logger.error(error)
    })
  }
}

const redisManager = new RedisManager()
export default redisManager
