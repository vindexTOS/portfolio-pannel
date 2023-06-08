import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const FetchPosts = async () => {
  const url = 'http://localhost:3000/blog'
  const res = await axios.get(url)
  const posts = res.data

  return posts
}

export const MakePost = (newPost: any) => {
  const url = 'http://localhost:3000/blog/post'
  const post = axios.post(url, newPost)
  return post
}
