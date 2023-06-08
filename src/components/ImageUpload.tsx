import React, { FC } from 'react'
import { TbPhotoX } from 'react-icons/tb'
import { UseMainContext } from '../context'
import { MdAddAPhoto } from 'react-icons/md'
type ImgProp = {
  htmlImg?: String | null
}
const ImgUpload: FC<ImgProp> = () => {
  const {
    imgUploadDrag,
    imgUpload,
    removeImgFromHtml,
    htmlImg,
  } = UseMainContext()
  return (
    <div className="flex w-[10rem]  items-center justify-center max_md2:w-[40%] h-[3rem] bg-gray-200 rounded-md">
      <label
        onDrop={(e) => imgUploadDrag(e)}
        className="text-[2rem] h-[2.2rem]   items-center justify-center text-gray-400   cursor-pointer w-[20rem] rounded-[6px] flex "
        htmlFor="photo"
      >
        <input
          placeholder="Photo"
          onChange={(e) => imgUpload(e)}
          id="photo"
          className=" w-full text-sm   hidden text-[#ec2b58]  boxshaddow   rounded-lg cursor-pointer   bg-gray-200   focus:outline-none   "
          type="file"
        />
        <MdAddAPhoto className={`${htmlImg && 'hidden'}`} />
      </label>
      {htmlImg && (
        <div className="absolute h-[100%] relative flex items-center justify-center right-[3rem]">
          <img
            className="w-[200px] h-[40px] rounded-[10px] "
            src={htmlImg ? htmlImg : ''}
          />
          <TbPhotoX
            className="text-red-500  text-[2rem]  absolute  "
            onClick={() => removeImgFromHtml()}
          />
        </div>
      )}
    </div>
  )
}

export default ImgUpload
