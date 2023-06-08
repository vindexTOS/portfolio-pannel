import { FC, useState, useRef } from 'react'
import { BlogPostDataType, BlogPostType } from '../../../types/blog-post-types'
import useOutClick from '../../../Hooks/useOutClick'
import { BsThreeDots } from 'react-icons/bs'
import EditComponent from './Edit_component'
import AlertComponent from '../../../components/Alert_component'
const PostComponent: FC<BlogPostType> = (data) => {
  const { title, dec, time, img, type, _id } = data
  const [dropDown, setDropDown] = useState<boolean>(false)
  const dropRef = useRef(null)
  const dropDownHandler = () => {
    setDropDown(false)
  }

  useOutClick(dropRef, dropDownHandler)
  const style = {
    mainDiv: ` relative  px-5 bg-gray-200 rounded-[12px] max-h-[1200px] py-5 w-[90%] flex flex-col items-center justify-around gap-5 shadow-md 
    `,
    header: ` text-[1.2rem]`,
    img: `w-[500px] h-[500px] `,
    p: `break-words`,
    icon: `absolute right-20 top-5 text-[1.3rem]`,
  }
  return (
    <div ref={dropRef} className={style.mainDiv}>
      <BsThreeDots
        className={style.icon}
        onClick={() => setDropDown(!dropDown)}
      />
      {/* <p>{time}</p> */}
      {dropDown && <EditComponent _id={_id} />}
      <h1 className={style.header}>{title}</h1>

      <img className={style.img} src={img} />
      <p className={style.p}>{dec}</p>
    </div>
  )
}

export default PostComponent
