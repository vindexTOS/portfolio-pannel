import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query'

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

export type UpdateBodyType = {
  dec: string
  title: string
}

export type RefetchType = (
  options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined,
) => Promise<QueryObserverResult<any, unknown>>
