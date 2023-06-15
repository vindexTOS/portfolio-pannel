import React from 'react'
import { Link } from 'react-router-dom'
import { NavigationLinks, NavigationLinkType } from '../utils/NavigationUtils'
const SideNavigation = () => {
  const style = {
    nav: ` flex flex-col py-10 gap-20  shadow-md w-[300px] h-[100vh] bg-gray-300 rounded-[12px]`,
    link: `w-[100%] hover:bg-gray-200 h-[2rem] flex items-center justify-center  duration-500 rounded-[12px] `,
  }
  return (
    <nav className={style.nav}>
      {NavigationLinks.map((val: NavigationLinkType) => (
        <Link className={style.link} to={val.link} key={val.link}>
          {val.title}
        </Link>
      ))}
    </nav>
  )
}

export default SideNavigation
