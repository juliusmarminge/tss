import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router'
import { useRef } from 'react'
import { createPost, listPosts } from '../utils/posts'

export const Route = createFileRoute('/posts')({
  loader: () => listPosts(),
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()

  return (
    <div className="flex gap-2 p-2">
      <div className="">
        <ul className="list-disc pl-4">
          {[...posts, { id: -1, title: 'Non-existent Post' }]?.map((post) => {
            return (
              <li key={post.id} className="whitespace-nowrap">
                <Link
                  to="/posts/$postId"
                  params={{
                    postId: post.id,
                  }}
                  className="block py-1 text-blue-800 hover:text-blue-600"
                  activeProps={{ className: 'text-black font-bold' }}
                >
                  <div>{post.title.substring(0, 20)}</div>
                </Link>
              </li>
            )
          })}
        </ul>
        <PostForm />
      </div>
      <hr />
      <Outlet />
    </div>
  )
}

function PostForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const res = await createPost({
          title: formData.get('title') as string,
          body: formData.get('body') as string,
        })
        formRef.current?.reset()
        await navigate({ to: '/posts/$postId', params: { postId: res } })
      }}
      className="mt-auto"
    >
      <div className="overflow-hidden rounded-lg border border-gray-300 p-1 shadow-sm">
        <input
          placeholder="Title"
          name="title"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) {
              formRef.current?.requestSubmit()
            }
          }}
          className="block w-full border-0 p-1 text-lg font-medium placeholder:text-gray-400"
        />

        <textarea
          placeholder="A quick brown fox ..."
          name="body"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.metaKey) {
              formRef.current?.requestSubmit()
            }
          }}
          rows={3}
          className="block w-full resize-none border-0 py-0 px-1 text-gray-900 placeholder:text-gray-400"
        />
        <div className="flex items-center justify-end border-t border-gray-300 p-1">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  )
}
