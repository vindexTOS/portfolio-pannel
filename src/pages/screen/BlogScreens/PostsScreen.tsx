import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const PostsScreen = () => {
  const url = 'http://localhost:3000/blog'
  const blogPosts = useQuery({
    queryKey: ['blog'],
    queryFn: async () => await axios.get(url).then((res) => res.data),
  })
  if (blogPosts.isLoading) {
    return <h1>Loading...</h1>
  }

  if (blogPosts.isError) {
    return <pre>{JSON.stringify(blogPosts.error)}</pre>
  }
  return (
    <div onClick={() => console.log(blogPosts)}>
      {blogPosts.data.blogPosts.map((val: any) => {
        return <div>{val.title}</div>
      })}
      as
    </div>
  )
}

export default PostsScreen
