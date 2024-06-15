import { defineConfig } from 'drizzle-kit'

let DB_URL = process.env.DATABASE_URL
if (!DB_URL) {
  console.warn('Missing DATABASE_URL environment variable. Using local file')
  DB_URL = 'file:./db.sqlite'
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './app/db/schema.ts',
  out: './app/db/migrations',
  dbCredentials: {
    url: DB_URL,
  },
})
