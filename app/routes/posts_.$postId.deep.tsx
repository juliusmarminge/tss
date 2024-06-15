import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { getPost } from '../utils/posts'
import { PostErrorComponent } from './posts.$postId'

export const Route = createFileRoute('/posts/$postId/deep')({
  parseParams: (raw) => z.object({ postId: z.coerce.number() }).parse(raw),
  loader: async ({ params: { postId } }) => getPost(postId),
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="space-y-2 p-2">
      <Link
        to="/posts"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
