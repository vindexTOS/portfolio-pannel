import { useMutation } from '@tanstack/react-query'
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
  const post = await baseUrl.post(`/blog/post`, newPost)
  return post
}

export const DeletePost = async (id: string) => {
  const deletePost = await axios.delete(`http://localhost:3000/blog/post/${id}`)
  return deletePost
}
