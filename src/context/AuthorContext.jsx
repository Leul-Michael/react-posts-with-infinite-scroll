import axios from "axios"
import { createContext, useContext, useState, useEffect, useRef } from "react"

const AUTHOR_API_URL = "https://jsonplaceholder.typicode.com/users"

const AuthorContext = createContext({})

export default function useAuthor() {
  return useContext(AuthorContext)
}

export function AuthorContextProvider({ children }) {
  const domLoaded = useRef(false)
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getPostAuthor = async () => {
      try {
        const res = await axios.get(AUTHOR_API_URL, {
          signal: controller.signal,
        })
        setAuthors(res.data)
      } catch (e) {
        console.log(e.message)
        setAuthors([])
      }
    }

    // React Strict mode
    domLoaded.current === true && getPostAuthor(controller.signal)

    return () => {
      domLoaded.current = true
      controller.abort()
    }
  }, [])

  const selectedAuthor = (id) => {
    if (authors?.length > 0) {
      return authors.find((author) => author.id === id)
    } else {
      return ""
    }
  }

  return (
    <AuthorContext.Provider value={{ selectedAuthor }}>
      {children}
    </AuthorContext.Provider>
  )
}
