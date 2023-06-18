import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const MainBlogScreen = () => {
  const style = {
    section: `flex h-[100%] relative  `,

    nav: ` flex flex-col w-[200px]   h-[100%] items-start  py-20   `,
    outlet: `w-[100%] h-[100%] py-5`,
    icon: `absolute text-[1.6rem] left-2 top-2 cursor-pointer`,
    link: `hover:bg-gray-200 w-[100%] text-center py-1 duration-300 rounded-[9px]`,
  }

  const BlogLinks = [
    { link: 'make', title: 'Make Post' },
    { link: 'posts', title: 'Post' },
  ]
  const location = useLocation()
  return (
    <section className={style.section}>
      <nav className={style.nav}>
        {BlogLinks.map((val: any) => (
          <Link
            className={`${style.link} ${
              location.pathname === `/blog/${val.link}` && 'bg-gray-100'
            } `}
            key={val.link}
            to={val.link}
          >
            {val.title}
          </Link>
        ))}
      </nav>
      <section className={style.outlet}>
        <Outlet />
      </section>
    </section>
  )
}

export default MainBlogScreen
