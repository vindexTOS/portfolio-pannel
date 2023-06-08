export type BlogPostType = {
  title: string
  dec: string
  img: string
  time?: Date
  type: string
  _id?: string
}

export type BlogPostDataType = {
  data: BlogPostType
}
