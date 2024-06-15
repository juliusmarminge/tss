import { Await, createFileRoute, defer } from '@tanstack/react-router'
import { Suspense, useState } from 'react'

export const Route = createFileRoute('/deferred')({
  loader: () => {
    return {
      deferredStuff: defer(
        new Promise<string>((r) =>
          setTimeout(() => r('Hello deferred!'), 5000),
        ),
      ),
    }
  },
  component: Deferred,
})

function Deferred() {
  const [count, setCount] = useState(0)
  const { deferredStuff } = Route.useLoaderData()

  return (
    <div className="p-2">
      <Suspense fallback="Loading...">
        <Await promise={deferredStuff} children={(data) => <h3>{data}</h3>} />
      </Suspense>
      <div>Count: {count}</div>
      <div>
        <button
          className="flex rounded-md bg-blue-500 py-2 px-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  )
}
