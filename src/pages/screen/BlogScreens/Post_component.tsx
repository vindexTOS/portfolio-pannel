import React, { FC } from 'react'
import { BlogPostDataType, BlogPostType } from '../../../types/blog-post-types'

const PostComponent: FC<BlogPostType> = (data) => {
  const { title, dec, time, img, type } = data

  const style = {
    mainDiv: ``,
  }

  return (
    <div className={style.mainDiv}>
      <h1>{title}</h1>
      <p>{dec}</p>
      <img src={img} />
    </div>
  )
}

export default PostComponent
