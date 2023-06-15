import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UseMainContext } from '../../context'

const MainScreen = () => {
  const { user, logout } = UseMainContext()
  const style = {
    mainDiv: ` bg-gray-300 w-[90%] h-[100vh] z-30 rounded-[12px] shadow-md `,
    section: `flex gap-2 px-10 py-5 justify-end shadow-md `,
  }
  return (
    <div className={style.mainDiv}>
      <section className={style.section}>
        {/* <Link to="/login">Login</Link> */}
        {/* <button onClick={() => console.log(user)}>on click</button> */}

        <p className="text-orange-500">{user.user.role}</p>
        <p>{user.user.email}</p>
        <button
          className="btn btn-outline btn-error sm:btn-sm "
          onClick={logout}
        >
          LOG OUT
        </button>
      </section>

      <Outlet />
    </div>
  )
}

export default MainScreen
