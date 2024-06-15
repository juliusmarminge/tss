import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

let DB_URL = process.env.DATABASE_URL
if (!DB_URL) {
  console.warn('Missing DATABASE_URL environment variable. Using local file')
  DB_URL = 'file:./db.sqlite'
}

const queryClient = createClient({ url: DB_URL })
export const db = drizzle(queryClient, { schema })
