import React from 'react'
import { motion as m } from 'framer-motion'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import useOutClick from '../../../Hooks/useOutClick'
const MakeBlogPostScreen = () => {
  const style = {
    mainDiv: `flex flex-col items-center justify-center  w-[100%] h-[90%] gap-2`,
    input: `max-w-[90%] w-[900%] bg-gray-200 shadow-md rounded-[20px] h-[3rem] outline-none p-2`,

    textArea: `max-w-[90%] w-[900%] h-[400px] resize-none bg-gray-200 shadow-md rounded-[20px] h-[3rem] outline-none p-5`,
    bottomWrapper: `w-[90%] h-[5rem] flex  justify-end items-end`,
    dropDown: `relative  flex lex-col h-[3rem]  `,
    blogDropDownWrapper: `bg-gray-200 flex  items-center justify-around gap-10  w-[10rem] py-1  rounded-[9px] shadow-md `,
    array: `absolute w-[8rem] bg-gray-200 rounded-[5px] shadow-md p-2  flex flex-col items-center top-[3rem] `,
    mappedItem: `w-[100%]  text-center  hover:bg-gray-400 hover:text-gray-200 cursor-pointer`,
    btn: `btn btn-success w-[10rem] text-white hover:bg-green-500`,
  }

  const [dropDown, setDropDown] = React.useState<Boolean>(false)
  const dropRef = React.useRef(null)
  const dropDownFunction = () => {
    setDropDown(false)
  }

  useOutClick(dropRef, dropDownFunction)
  return (
    <div className={style.mainDiv}>
      <input className={style.input} type="text" placeholder="title" />
      <textarea className={style.textArea} placeholder="Blog Post"></textarea>
      {/* <img /> */}
      <div ref={dropRef} className={style.bottomWrapper}>
        <div className={style.dropDown} onClick={() => setDropDown(!dropDown)}>
          <div className={style.blogDropDownWrapper}>
            <h1>blog </h1>
            <div>{dropDown ? <MdArrowDropDown /> : <MdArrowDropUp />}</div>
          </div>

          <m.div
            animate={{ visibility: dropDown ? 'visible' : 'hidden' }}
            className={style.array}
          >
            {new Array('blog', 'diary').map((val: string) => {
              return <div className={style.mappedItem}>{val}</div>
            })}
          </m.div>
        </div>
        <button className={style.btn}>Post</button>
      </div>
    </div>
  )
}

export default MakeBlogPostScreen
