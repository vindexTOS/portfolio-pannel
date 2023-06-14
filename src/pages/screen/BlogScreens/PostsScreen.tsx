import { useQuery } from '@tanstack/react-query'
import { FetchPosts } from '../../../API/Blog-API'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useEffect } from 'react'
import { BlogPostType } from '../../../types/blog-post-types'
import PostComponent from './Post_component'
 
const PostsScreen = () => {
  const blogPosts = useQuery({
    queryKey: ['blog'],
    queryFn: FetchPosts,
    staleTime: 30000,
    refetchOnMount: true,
    onError: () => {
      console.log('ERROR', blogPosts.error)
    },
  })
  useEffect(() => {
    blogPosts.refetch()
  }, [])
  if (blogPosts.isLoading) {
    return <h1>Loading...</h1>
  }

  if (blogPosts.isError) {
    return <pre>{JSON.stringify(blogPosts.error)}</pre>
  }

  const style = {
    mainDiv: `h-[550px] overflow-y-scroll flex  flex-col gap-5`,
  }

  return (
    <div className={style.mainDiv} onClick={() => console.log(blogPosts)}>
      {blogPosts.data.blogPosts.map((val: BlogPostType) => {
        return <PostComponent key={val._id} {...val} />
      })}
      <ReactQueryDevtools />
    </div>
  )
}

export default PostsScreen
