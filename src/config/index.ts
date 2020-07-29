import path from 'path'
import fs from 'fs'

//Server
export interface OptionsConfig {
  key?: string
  certificate?: string
}
export interface EndpointConfig {
  enabled: boolean
  host: string
  port: number
  useSSL: boolean
  options: OptionsConfig
}
export interface ServerConfig {
  root: string
  endpoints: EndpointConfig[]
}

// DataBase
export interface ConnectionConfig {
  host: string
  user: string
  password: string | undefined
  database: string
}
export interface PoolConfig {
  max: number
  min: number
}
export interface MigrationsConfig {
  directory: string
}
export interface DatabaseConfig {
  client: string
  connection: ConnectionConfig
  pool: PoolConfig
  migrations: MigrationsConfig
}

// Redis
export interface RedisConfig {
  use: boolean
  host: string
  port: number
  database: number
  password?: string | null
}

// JWT
export interface JWTConfig {
  privateKey: string
  publicKey: string
  resetSecret: ''
}

// Mail
export interface AuthConfig {
  user: string
  pass: string | null
}
export interface MailConfig {
  host: string
  port: number
  auth: AuthConfig
}

// Log
export interface LoggingConfig {
  path: string
  filename: string
}

class ConfigManager {
  environment: 'development' | 'production' = 'development'

  server: ServerConfig = {
    root: '%CurrentDirectory%/../www',
    endpoints: [
      {
        enabled: true,
        host: '127.0.0.1',
        port: 8080,
        useSSL: false,
        options: {}
      }
    ]
  }

  database: DatabaseConfig = {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'steamslab'
    },
    pool: {
      max: 10,
      min: 0
    },
    migrations: {
      directory: '../database/migrations'
    }
  }

  redis: RedisConfig = {
    use: false,
    host: '127.0.0.1',
    port: 6379,
    database: 1,
    password: null
  }

  jwt: JWTConfig = {
    privateKey: '',
    publicKey: '',
    resetSecret: ''
  }

  captchaKey: string = ''

  mail: MailConfig = {
    host: 'smtp.steamslab.com',
    port: 465,
    auth: {
      user: 'username',
      pass: null
    }
  }

  logging: LoggingConfig = {
    path: './logs/',
    filename: './latest.log'
  }

  loadConfig(filename: string): void {
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, JSON.stringify(this), 'utf8')
    }

    let text = fs.readFileSync(filename, 'utf8')
    let config: ConfigManager = JSON.parse(text)
    this.server = config.server
    this.database = config.database
    this.redis = config.redis
    this.jwt = config.jwt
    this.captchaKey = config.captchaKey
    this.mail = config.mail
    this.logging = config.logging
  }
}

const configLocation = '../../.config/server.json'
const configPath = path.join(path.dirname(__filename), configLocation)

const configManager: ConfigManager = new ConfigManager()
configManager.loadConfig(configPath)

export default configManager
