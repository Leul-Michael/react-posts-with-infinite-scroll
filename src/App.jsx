import { useState, useCallback, useRef } from "react"
import PostExcerpt from "./components/PostExcerpt"
import PostSkeleton from "./components/PostSkeleton"
import usePosts from "./hooks/usePosts"
import "./App.css"

function App() {
  const [page, setPage] = useState(1)
  const { posts, loading, errMsg, hasNextPage, loadingNextPage } =
    usePosts(page)

  const intersectionObserver = useRef()
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return

      if (intersectionObserver.current)
        intersectionObserver.current.disconnect()

      intersectionObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPage((prev) => prev + 1)
        }
      })

      if (node) intersectionObserver.current.observe(node)
    },
    [loading, hasNextPage]
  )

  let content
  if (loading) {
    content = (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    )
  } else if (posts?.length > 0) {
    content = posts.map((post, idx) => {
      if (posts.length === idx + 1) {
        return <PostExcerpt ref={lastPostRef} key={post.id} post={post} />
      }
      return <PostExcerpt key={post.id} post={post} />
    })
  } else if (errMsg) {
    content = <p className="text-light">{errMsg}</p>
  } else {
    content = <p className="text-light">No posts to show</p>
  }

  return (
    <main className="main">
      <div className="container">
        <h1 className="title">
          Posts <span>{posts.length}</span>
        </h1>
        <div className="posts">
          {content}
          {loadingNextPage && <PostSkeleton />}
        </div>
      </div>
    </main>
  )
}

export default App
