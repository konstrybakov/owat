import { migrate } from 'drizzle-orm/neon-http/migrator'
import { logger } from '../logger'
import { db } from './db'

try {
  await migrate(db, { migrationsFolder: './drizzle' })
  logger.info('Migrations completed')
} catch (error) {
  logger.error(error)
}
