import React, { useState } from 'react'
import { UseMainContext } from '../../../context'
import { FcImageFile } from 'react-icons/fc'
const MakeSkill = () => {
  const {
    imgUploadDrag,
    imgUpload,
    image,
    htmlImg,
    handleDragOver,
    handleDrop,
  } = UseMainContext()
  const style = {
    section: `flex items-center  justify-between flex-col w-[100%]  p-5 `,
    inputDiv: `bg-gray-100 w-[150px] items-center flex  justify-center h-[2.2rem] rounded-[9px] shadow-md`,
    icon: `text-[40px]`,
    imgDropWrapper: `w-[100%] flex items-start `,
    innerWrapper: `flex flex-col items-center justify-center`,
    htmlImg: `w-[40%] h-[70%] rounded-[9px]`,
    imgDrop: ` w-[350px] h-[220px]  gap-2 border-2 border-dashed border-orange-400  rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
  }
  return (
    <section className={style.section}>
      <div className={style.imgDropWrapper}>
        <div className={style.innerWrapper}>
          <h1 className="text-gray-500 text-[1.5rem]">Drop Skills Photo</h1>
          <p className="text-[10px]">
            for best quality make sure photo is proparily cropped and its PNG
          </p>
          <label
            onDragOver={(e) => handleDragOver(e)}
            onDrop={handleDrop}
            className={style.imgDrop}
            htmlFor="img"
          >
            {!htmlImg ? (
              <FcImageFile className={style.icon} />
            ) : (
              <img className={style.htmlImg} src={htmlImg} />
            )}
            <h1 className="font-bold text-[14px]"></h1>
            <p className="font-bold text-[10px] text-gray-400"></p>
            <input
              multiple
              onChange={(e) => imgUpload(e)}
              id="img"
              className="hidden"
              type="file"
            />
          </label>
        </div>
      </div>
      <div>
        <div className={style.inputDiv}>
          <input
            placeholder=" Skill Name"
            className="outline-none bg-transparent w-[85%]"
          />
        </div>
      </div>
    </section>
  )
}

export default MakeSkill
