import type { InferSelectModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Post = sqliteTable('post', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  author: text('name'),
  title: text('title').notNull(),
  body: text('text').notNull(),

  createdAt: integer('created_at', {
    mode: 'timestamp',
  })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at', {
    mode: 'timestamp',
  })
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => new Date()),
})

export type PostType = InferSelectModel<typeof Post>
