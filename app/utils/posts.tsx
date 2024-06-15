import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { z } from 'zod'
import { db } from '../db/client'
import { Post } from '../db/schema'
import { serverFnProcedure } from '../trpc/init'

export const getPost = createServerFn(
  'GET',
  serverFnProcedure.input(z.number()).query(async ({ input: postId }) => {
    console.log(`Fetching post with id ${postId}...`)

    const post = await db.query.Post.findFirst({
      where: (fields, { eq }) => eq(fields.id, postId),
    })
    if (!post) throw notFound()

    return post
  }),
)

export const listPosts = createServerFn(
  'GET',
  serverFnProcedure.query(async () => {
    console.log('Fetching posts...')

    const posts = await db.query.Post.findMany({
      orderBy: (fields, { asc }) => asc(fields.createdAt),
    })

    return posts
  }),
)

export const createPost = createServerFn(
  'POST',
  serverFnProcedure
    .input(z.object({ title: z.string(), body: z.string() }))
    .mutation(async ({ input }) => {
      console.log(`Creating post with title ${input.title}...`)

      const post = await db.insert(Post).values({
        title: input.title,
        body: input.body,
      })

      return Number(post.lastInsertRowid)
    }),
)
