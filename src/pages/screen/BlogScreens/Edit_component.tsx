import { DeletePost } from '../../../API/Blog-API'
import { useMutation } from '@tanstack/react-query'
import AlertComponent from '../../../components/Alert_component'
import { FC, useState } from 'react'
import axios from 'axios'

type EditCompnentProps = {
  _id: string
}

const EditComponent: FC<EditCompnentProps> = ({ _id }) => {
  const style = {
    mainDiv: `w-[200px] h-[120px] bg-gray-300 absolute flex flex-col py-2 gap-2 items-center right-20 top-10 rounded-[5px] shadow-md`,
  }

  const mutation = useMutation((id: string) => DeletePost(id))

  const handleDelete = (id: string) => {
    mutation.mutate(id)

    setIsDelete(false)
  }
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const handleFalsyValue = () => {
    setIsDelete(false)
  }
  return (
    <div className={style.mainDiv}>
      {isDelete && (
        <AlertComponent
          _id={_id}
          handleFalsyValu={handleFalsyValue}
          handleAction={handleDelete}
        />
      )}
      <button className="btn  btn-success text-white w-[90%]">Edit</button>
      <button
        onClick={() => setIsDelete(true)}
        className="btn btn-error text-white w-[90%]"
      >
        Delete
      </button>
    </div>
  )
}

export default EditComponent
