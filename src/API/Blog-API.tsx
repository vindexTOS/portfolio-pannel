import { useMutation } from '@tanstack/react-query'
import { BlogPostType } from '../types/blog-post-types'
import axios from 'axios'

export const FetchPosts = async () => {
  const url = 'http://localhost:3000/blog'
  const res = await axios.get(url)
  const posts = res.data

  return posts
}

export const MakePost = async (newPost: BlogPostType) => {
  const url = 'http://localhost:3000/blog/post'
  const post = await axios.post(url, newPost)
  return post
}

export const DeletePost = async (id: string) => {
  const url = `http://localhost:3000/blog/post/${id}`
  const deletePost = await axios.delete(url)
  return deletePost
}
