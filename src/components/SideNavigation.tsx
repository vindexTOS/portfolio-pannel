import React from 'react'
import { Link } from 'react-router-dom'

const SideNavigation = () => {
  const style = {
    nav: ` shadow-md w-[300px] h-[100%] bg-gray-300 rounded-[12px]`,
  }
  return (
    <nav className={style.nav}>
      <Link to="blog">Blog</Link>
    </nav>
  )
}

export default SideNavigation
