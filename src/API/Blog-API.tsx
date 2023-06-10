import { BlogPostType } from '../types/blog-post-types'
import axios from 'axios'
import { UpdateBodyType, RefetchType } from '../types/blog-post-types'
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

export const DeletePost = async (id: string, refetch: RefetchType) => {
  const deletePost = await axios.delete(`http://localhost:3000/blog/post/${id}`)
  refetch()
  return deletePost
}

export const UpdatePost = async (
  id: string,
  body: UpdateBodyType,
  refetch: RefetchType,
) => {
  const updatePost = await axios.patch(
    `http://localhost:3000/blog/post/${id}`,
    body,
  )
  refetch()
  return updatePost
}
