import React, { useEffect, useState } from 'react'
import { UseMainContext } from '../../../context'
import { FcImageFile } from 'react-icons/fc'
import { FaTrashAlt } from 'react-icons/fa'
import { ChromePicker } from 'react-color'
import { motion as m } from 'framer-motion'
import DefaulSkill from '../../../assets/DefaultSKill.png'
import { SkillClass } from '../../../utils/SkillUtils'
import { useMutation } from '@tanstack/react-query'
import { PostSkill } from '../../../API/Skill-API'
const MakeSkill = () => {
  const {
    imgUpload,
    image,
    htmlImg,
    handleDragOver,
    handleDrop,
    removeImgFromHtml,
  } = UseMainContext()
  const style = {
    form: `flex items-center justify-center gap-20 h-[500px] bg-gray-100 shadow-md w-[100%]  p-5  `,
    inputDiv: `bg-gray-100 w-[280px] items-center flex  justify-center h-[2.2rem] rounded-[9px] shadow-md`,
    icon: `text-[40px]`,
    imgDropWrapper: ` gap-5 flex items-center justify-center flex-col `,
    innerWrapper: `flex flex-col items-center justify-center`,
    htmlImg: `w-[40%] h-[70%] rounded-[9px]`,
    imgDrop: ` w-[350px] h-[220px]  gap-2 border-2 border-dashed border-orange-400  rounded-[17px] flex flex-col items-center justify-center cursor-pointer`,
    colorBGDIV: `bg-gray-100 flex items-center justify-cetner w-[225px] rounded-[5px] h-[200px] flex-col shadow-md`,
    colroWrapper: `flex gap-2 h-[100%]  pt-20 `,
    skillsDiv: ` flex flex-wrap items-center justify-center w-[100%] h-[90%] py-10 px-20 max_sm:p-0 gap-20  max_sm:gap-10 max_sm:h-[90%]  overflow-y-scroll `,
    singleSkill: `flex flex-col items-center justify-center max_sm:w-[100px] gap-2  `,
    img: `w-[100px] h-[100px] max_sm:w-[40px] max_sm:h-[40px]`,
    imgDiv: `rounded-[50%] w-[180px] h-[180px] max_sm:w-[80px] max_sm:h-[80px]  bg-opacity-5  flex items-center justify-center`,
    skillHeader: `text-[1.2rem] font-bold text-gray-600  max_sm:text-[14px]`,
    displayiconDiv: `flex flex-col items-center  justify-center gap-5 w-[250px] h-[270px] bg-gray-200 rounded-[9px] shadow-md`,
    trashIcon: `text-[2rem] text-red-400 hover:text-red-500 absolute `,
  }

  const [color, setColor] = useState<string>('')
  const [backGroundColor, setBackGroudColor] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const handleColor = (color: any) => {
    setColor(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    )
  }
  const handleBackgroundColor = (color: any) => {
    setBackGroudColor(
      `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
    )
  }
  const makeSkillMutation = useMutation((data: any) => PostSkill(data))

  const handleSkill = (e: any) => {
    e.preventDefault()
    if (title && image) {
      const formData = new FormData()

      formData.append('title', title)
      formData.append('file', image)
      formData.append('color', color)
      formData.append('bgo', backGroundColor)
      const data = new SkillClass(title, image, color, backGroundColor)
      makeSkillMutation.mutate(formData)
      console.log(data)
    }
  }
  return (
    <form
      onSubmit={(e) => handleSkill(e)}
      encType="multipart/form-data"
      className={style.form}
    >
      <div className={style.imgDropWrapper}>
        <div className={style.innerWrapper}>
          <div className={style.inputDiv}>
            <input
              placeholder=" Skill Name"
              className="outline-none bg-transparent w-[85%]"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
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
              <div className="relative w-[100%] h-[100%] flex items-center justify-center z-20">
                <FaTrashAlt
                  onClick={removeImgFromHtml}
                  className={style.trashIcon}
                />
                <img className={style.htmlImg} src={htmlImg} />
              </div>
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
      <div className={style.colroWrapper}>
        <div className={style.colorBGDIV}>
          <h1>Hover Color</h1>

          <ChromePicker color={color} onChangeComplete={handleColor} />
        </div>
        <div className={style.colorBGDIV}>
          <h1>Back Ground Color</h1>
          <ChromePicker
            color={backGroundColor}
            onChangeComplete={handleBackgroundColor}
          />
        </div>
      </div>
      <div className={style.displayiconDiv}>
        <p className="text-[12px]">Hover over to see changes</p>
        <div className={style.singleSkill}>
          <m.div
            whileHover={{ backgroundColor: color }}
            transition={{ duration: 1 }}
            className={`${style.imgDiv}   `}
            style={{ backgroundColor: backGroundColor }}
          >
            <img src={htmlImg ? htmlImg : DefaulSkill} className={style.img} />
          </m.div>

          <h1 className={style.skillHeader}>{title}</h1>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default MakeSkill
