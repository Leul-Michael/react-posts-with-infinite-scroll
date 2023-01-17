import { forwardRef } from "react"
import styled from "styled-components"
import useAuthor from "../context/AuthorContext"

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #777;
  border-radius: 4px;
  &:hover,
  &:focus {
    border-color: #3f76da;
  }
  @media (max-width: 600px) {
    padding: 1rem;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.1;
  padding-bottom: 1rem;
`

const By = styled.span`
  font-size: 0.8rem;
  color: #d4d4d4;
`

const Body = styled.div`
  font-size: 1rem;
  color: #f4f4f4;
  padding: 1rem 0;
`

const PostExcerpt = forwardRef(function ({ post }, ref) {
  const { selectedAuthor } = useAuthor()
  const author = selectedAuthor(post?.userId)

  const content = (
    <>
      <Title>{post?.title}</Title>
      <By>By {author?.name ? author.name : "unknown author"}</By>
      <Body>{post?.body}</Body>
    </>
  )

  return ref ? <Post ref={ref}>{content}</Post> : <Post>{content}</Post>
})

export default PostExcerpt
