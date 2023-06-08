import React from 'react'
import { UseMainContext } from '../context'
import { Link, Navigate } from 'react-router-dom'
import SideNavigation from '../components/SideNavigation'
import MainScreen from './screen/MainScreen'
const MainPage = () => {
  const { user, logout } = UseMainContext()
  if (user && user.user) {
    const style = {
      section: `flex w-[100wh] h-[100%] p-20 justify-between`,
    }
    return (
      <section className={style.section}>
        <SideNavigation />
        <MainScreen />
      </section>
    )
  } else {
    return <Navigate to="/login" />
  }
}
export default MainPage
