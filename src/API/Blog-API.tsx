import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from '@tanstack/react-query'
import { BlogPostType } from '../types/blog-post-types'
import axios from 'axios'

const baseUrl = axios.create({
  baseURL: `http://localhost:3000`,
})

export const FetchPosts = async () => {
  const res = await baseUrl.get('/blog')
  const posts = res.data

  return posts
}

export const MakePost = async (newPost: BlogPostType) => {
  const post = await axios.post(`http://localhost:3000/blog/post`, newPost)
  return post
}

export const DeletePost = async (
  id: string,
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined,
  ) => Promise<QueryObserverResult<any, unknown>>,
) => {
  const deletePost = await axios.delete(`http://localhost:3000/blog/post/${id}`)
  refetch()
  return deletePost
}
