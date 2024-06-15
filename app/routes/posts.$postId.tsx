import type { ErrorComponentProps } from '@tanstack/react-router'
import { createFileRoute, ErrorComponent, Link } from '@tanstack/react-router'
import { z } from 'zod'
import { NotFound } from '../components/NotFound'
import { getPost } from '../utils/posts'

export const Route = createFileRoute('/posts/$postId')({
  parseParams: (raw) => z.object({ postId: z.coerce.number() }).parse(raw),
  loader: async ({ params: { postId } }) => getPost(postId),
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PostComponent() {
  const post = Route.useLoaderData()

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
      <Link
        to="/posts/$postId/deep"
        params={{
          postId: post.id,
        }}
        activeProps={{ className: 'text-black font-bold' }}
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        Deep View
      </Link>
    </div>
  )
}
