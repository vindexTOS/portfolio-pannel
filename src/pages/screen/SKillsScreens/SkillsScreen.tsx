import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FetchSkills, DeleteSkills, UpdateSkills } from '../../../API/Skill-API'
import { motion as m } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import { RiEdit2Line } from 'react-icons/ri'
import { MdPhotoCamera } from 'react-icons/md'
import { UseMainContext } from '../../../context'
import { SkillsTypes } from '../../../types/skills-types'

import useOutClick from '../../../Hooks/useOutClick'
const SkillsScreen = () => {
  const style = {
    skillsDiv: ` flex flex-wrap   items-start justify-center w-[100%] h-[100%]  py-10 px-20 max_sm:p-0 gap-20  max_sm:gap-10 max_sm:h-[90%]  overflow-y-scroll `,
    singleSkill: `flex flex-col items-center justify-center max_sm:w-[100px] gap-2 relative  z-10  p-5  `,
    img: `w-[100px] h-[100px] max_sm:w-[40px] max_sm:h-[40px]  z-10`,
    imgDiv: `rounded-[50%] w-[180px] h-[180px] max_sm:w-[80px] max_sm:h-[80px]  bg-opacity-5  z-10  flex items-center justify-center`,
    skillHeader: `text-[1.2rem] font-bold text-gray-600  max_sm:text-[14px]  z-10`,
    HoverDiv: `absolute w-[100%] h-[100%] gap-2 outline outline-[1px] outline-gray-400 rounded-[20px] flex p-2`,
    trashIcon: `text-[1.3rem] text-red-400 hover:text-red-600 cursor-pointer`,
    editIcon: `text-[1.4rem] text-blue-500 hover:text-blue-400 cursor-pointer`,
    editableLabelPhoto: `relative flex items-center justify-center`,
    PhotoIcon: `text-[3rem] text-pink-500  hover:text-pink-600 absolute  z-20 cursor-pointer `,
  }
  const { imgUpload, image } = UseMainContext()
  const skills = useQuery({
    queryKey: ['skill'],
    queryFn: FetchSkills,
    staleTime: 30000,
    refetchOnMount: true,
    onError: () => {
      console.log('error', skills.error)
    },
  })

  const { data, isLoading, isError, refetch } = skills

  useEffect(() => {
    refetch()
  }, [])

  // mutation for delete and update
  const mutation = useMutation((_id: string) => DeleteSkills(_id))
  const updateMutate = useMutation(
    ({ _id, data }: { _id: string; data: SkillsTypes }) =>
      UpdateSkills(_id, data),
  )
  const handleDelete = (_id: string) => {
    mutation.mutate(_id)
    setTimeout(() => {
      refetch()
    }, 1000)
  }

  const handleUpdate = ({ _id, data }: { _id: string; data: SkillsTypes }) => {
    updateMutate.mutate({ _id, data })
    setTimeout(() => {
      refetch()
    }, 1000)
  }
  // mouse over animations ///
  const [MouseEnter, setMouseEnter] = useState<boolean[]>(
    new Array(data?.data.length || 10).fill(false),
  )

  const MouseOverHanndler = (index: number) => {
    let newMouseOver = [...MouseEnter]
    newMouseOver[index] = true
    setMouseEnter(newMouseOver)
  }
  const MouseLeaveHannlder = (index: number) => {
    let newMouseOver = [...MouseEnter]
    newMouseOver[index] = false
    setMouseEnter(newMouseOver)
  }

  const [Editable, setEditable] = useState<boolean[]>(
    new Array(data?.data.length || 10).fill(false),
  )

  const EditableHanndle = (index: number) => {
    let newEditableArr = [...Editable]
    newEditableArr[index] = !newEditableArr[index]
    setEditable(newEditableArr)
  }

  const cancelBoolean = () => {
    setEditable(new Array(data?.data.length || 10).fill(false))
  }
  const editDropDownRef = useRef(null)
  useOutClick(editDropDownRef, cancelBoolean)

  if (isLoading) {
    return <div>Loading</div>
  }

  if (isError) {
    return <div onClick={() => console.log(isError)}>ERROR</div>
  }
  if (data) {
    return (
      <div className={style.skillsDiv}>
        {data.data.map((val: any, i: number) => {
          return (
            <div
              ref={editDropDownRef}
              onClick={() => console.log(val._id)}
              onMouseEnter={() => MouseOverHanndler(i)}
              onMouseLeave={() => MouseLeaveHannlder(i)}
              key={String(val.bgo + i)}
              className={style.singleSkill}
            >
              <m.div
                animate={{
                  visibility: MouseEnter[i] ? 'visible' : 'hidden',
                }}
                className={style.HoverDiv}
              >
                <FiTrash2
                  onClick={() => handleDelete(val._id)}
                  title="Delete Skill"
                  className={style.trashIcon}
                />
                <RiEdit2Line
                  onClick={() => EditableHanndle(i)}
                  title="Edit Skill"
                  className={style.editIcon}
                />
              </m.div>
              <m.div
                whileHover={{ backgroundColor: `${val.color}` }}
                transition={{ duration: 1 }}
                className={`${style.imgDiv}   `}
                style={{ backgroundColor: `${val.bgo}` }}
              >
                {!Editable[i] ? (
                  <img src={val.icon} className={style.img} />
                ) : (
                  <label className={style.editableLabelPhoto} htmlFor="img">
                    <input
                      multiple
                      onChange={(e) => imgUpload(e)}
                      id="img"
                      className="hidden"
                      type="file"
                    />
                    <MdPhotoCamera className={style.PhotoIcon} />
                    <img src={val.icon} className={style.img} />
                  </label>
                )}
              </m.div>

              {!Editable[i] ? (
                <h1 className={style.skillHeader}>{val.title}</h1>
              ) : (
                <div className="flex flex-col z-20">
                  <input
                    className="h-[2rem] rounded-[12px] text-center bg-gray-500"
                    placeholder={val.title}
                  />
                  <button className="btn btn-success text-white btn-sm cursor-pointer">
                    Save Change
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

export default SkillsScreen
