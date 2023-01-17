import axios from "axios"
import { useState, useEffect, useRef } from "react"

const API_URL = "https://jsonplaceholder.typicode.com/posts"

export default function usePosts(page = 1) {
  const domLoaded = useRef(false)
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [posts, setPosts] = useState([])
  const [hasNextPage, setHasNextPage] = useState(false)

  useEffect(() => {
    page > 1 ? setLoadingNextPage(true) : setLoading(true)

    const controller = new AbortController()
    const { signal } = controller

    const getPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}?_page=${page}`, {
          signal,
        })
        setPosts((prev) => [
          ...prev,
          ...res.data?.filter((p) => {
            const exists = prev.some((pr) => pr.id === p?.id)
            if (!exists) return p
          }),
        ])
        setHasNextPage(Boolean(res.data.length > 0))
      } catch (e) {
        if (signal.aborted) return
        console.log(e.message)
        setErrMsg(e.message)
      } finally {
        setLoading(false)
        setLoadingNextPage(false)
      }
    }

    domLoaded.current === true && getPosts()

    return () => {
      controller.abort()
      domLoaded.current = true
    }
  }, [page])

  return { loading, errMsg, posts, hasNextPage, loadingNextPage }
}
