import { FC, useState, useRef } from 'react'
import { BlogPostType } from '../../../types/blog-post-types'
import useOutClick from '../../../Hooks/useOutClick'
import { BsThreeDots } from 'react-icons/bs'
import EditComponent from './Edit_component'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FetchPosts, UpdatePost } from '../../../API/Blog-API'
import { BlogPostClass } from '../../../utils/PostUtils'
const PostComponent: FC<BlogPostType> = (data) => {
  const { refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: FetchPosts,
  })
  const { title, dec, time, img, type, _id } = data
  const [dropDown, setDropDown] = useState<boolean>(false)
  const dropRef = useRef(null)
  const dropDownHandler = () => {
    setDropDown(false)
  }
  // editing infromation functionality and state

  const [isEdit, setIsEdit] = useState<boolean>(false)

  // editable states
  const [editTitle, setEditTitle] = useState<string>(title)
  const [editDec, setEditDec] = useState<string>(dec)
  const [editType, setEditType] = useState<string>(type)

  const mutation = useMutation(
    ({ id, body }: { id: string; body: BlogPostType }) =>
      UpdatePost(id, body, refetch),
  )

  const SaveUpdate = () => {
    const body = new BlogPostClass(editTitle, editDec, img, editType)
    mutation.mutate({ id: _id, body })
  }

  useOutClick(dropRef, dropDownHandler)
  const style = {
    mainDiv: ` relative  px-5 bg-gray-200 rounded-[12px] max-h-[1200px] py-5 w-[90%] flex flex-col items-center justify-around gap-5 shadow-md 
    `,
    header: ` text-[1.2rem]`,
    img: `w-[500px] h-[500px] `,
    p: `break-words`,
    icon: `absolute right-20 top-5 text-[1.3rem]`,
    input: `w-[60%] h-[2rem] px-2  rounded-[6px] `,
    editTextArea: `w-[100%] p-5  h-[200] max-h-[500px] rounded-[6px]`,
  }
  return (
    <div ref={dropRef} className={style.mainDiv}>
      <BsThreeDots
        className={style.icon}
        onClick={() => setDropDown(!dropDown)}
      />
      {/* <p>{time}</p> */}
      {dropDown && (
        <EditComponent
          setDropDown={setDropDown}
          setIsEdit={setIsEdit}
          _id={_id}
        />
      )}
      {!isEdit ? (
        <h1 className={style.header}>{title}</h1>
      ) : (
        <input
          onChange={(e) => setEditTitle(e.target.value)}
          className={style.input}
          value={editTitle}
        />
      )}

      <img className={style.img} src={img} />
      {!isEdit ? (
        <p className={style.p}>{dec}</p>
      ) : (
        <textarea
          onChange={(e) => setEditDec(e.target.value)}
          value={editDec}
          className={style.editTextArea}
        ></textarea>
      )}
      {isEdit && (
        <button
          onClick={() => SaveUpdate()}
          className="btn bg-green-400 text-white outline-none w-[100%]"
        >
          Save Changes
        </button>
      )}
    </div>
  )
}

export default PostComponent
