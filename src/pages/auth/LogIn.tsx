import React from 'react'
import { UseMainContext } from '../../context'

const LogIn = () => {
  const { setPassword, setEmail, login } = UseMainContext()
  const style = {
    mainDiv: ` w-[100vw] h-[100vh] flex items-center justify-center`,
    input: `input input-bordered input-info w-full max-w-xs`,
    btn: `btn btn-outline btn-accent`,
  }
  return (
    <div className={style.mainDiv}>
      <div className="flex flex-col gap-5">
        <input
          className={style.input}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
        />
        <input
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />

        <button type="submit" className={style.btn} onClick={login}>
          submit
        </button>
      </div>
      {/* <div>
        <button onClick={() => postDummydata()}>POST DUMMY DATA</button>
      </div> */}
    </div>
  )
}

export default LogIn