import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AiOutlineBars } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
import { BsBoxArrowInLeft } from 'react-icons/bs'
const MainBlogScreen = () => {
  const [navDrop, setNavDrop] = useState<boolean>(true)
  const style = {
    section: `flex h-[100%] relative  `,

    nav: ` flex flex-col w-[200px] shadow-md h-[90%] items-start  py-20   `,
    outlet: `w-[100%] h-[100%]`,
    icon: `absolute text-[1.6rem] left-2 top-2 cursor-pointer`,
    link: `hover:bg-gray-200 w-[100%] text-center py-1 duration-300`,
  }
  return (
    <section className={style.section}>
      {!navDrop ? (
        <AiOutlineBars
          className={style.icon}
          onClick={() => setNavDrop(!navDrop)}
        />
      ) : (
        <BsBoxArrowInLeft
          className={style.icon}
          onClick={() => setNavDrop(!navDrop)}
        />
      )}
      <m.nav
        animate={{
          visibility: navDrop ? 'visible' : 'hidden',
          y: navDrop ? 0 : 400,
        }}
        className={style.nav}
      >
        <Link className={style.link} to="make">
          Make Post
        </Link>
        <Link className={style.link} to="posts">
          Posts
        </Link>
      </m.nav>
      <section className={style.outlet}>
        <Outlet />
      </section>
    </section>
  )
}

export default MainBlogScreen