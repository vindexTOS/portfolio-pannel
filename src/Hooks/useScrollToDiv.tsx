import { useEffect, useRef } from 'react'

const useScrollToDiv = (pages: string | undefined) => {
  const pageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scrollEvent = pageRef.current as HTMLDivElement
    if (scrollEvent) {
      scrollEvent.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [pages])

  return pageRef
}

export default useScrollToDiv
