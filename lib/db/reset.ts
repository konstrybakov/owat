if (!process.env.ALLOW_DB_RESET) {
  throw new Error('💣 ALLOW_DB_RESET is required')
}

import { db } from './db'
import { companies } from './schema'

await db.delete(companies)
