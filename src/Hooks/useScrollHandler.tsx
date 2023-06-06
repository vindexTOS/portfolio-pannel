import { useRef } from 'react'

const useScrollHandler = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    const scrollDistance = 257
    const element = scrollRef.current

    if (element) {
      if (direction === 'left') {
        element.scrollBy({
          left: -scrollDistance,
          behavior: 'smooth',
        })
      } else if (direction === 'right') {
        element.scrollBy({
          left: scrollDistance,
          behavior: 'smooth',
        })
      }
    }
  }

  return { scrollRef, handleScroll }
}

export default useScrollHandler
