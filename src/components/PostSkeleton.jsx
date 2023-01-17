import React from "react"
import { Post } from "./PostExcerpt"
import styled from "styled-components"

const Skeleton = styled(Post)`
  &:hover,
  &:focus {
    border-color: #777;
  }
`

const LoadingAuthor = styled.span`
  display: inline-block;
  width: 30%;
  height: 20px;
  background-color: #333;
  border-radius: 4px;
`

const Title = styled.h1`
  width: 80%;
  height: 45px;
  background-color: #333;
  border-radius: 4px;
`
const Par = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`

const By = styled(LoadingAuthor)`
  margin: 1rem 0;
`

export default function PostSkeleton() {
  return (
    <Skeleton>
      <Title />
      <By />
      <Par />
      <Par />
      <Par />
      <Par />
      <Par />
      <Par />
      <Par />
      <Par />
      <Par />
    </Skeleton>
  )
}
