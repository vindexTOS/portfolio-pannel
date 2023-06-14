import { DeletePost, FetchPosts } from '../../../API/Blog-API'
import { useMutation, useQuery } from '@tanstack/react-query'
import AlertComponent from '../../../components/Alert_component'
import { FC, useState } from 'react'
 
type EditCompnentProps = {
  _id: string
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>
}

const EditComponent: FC<EditCompnentProps> = ({
  _id,
  setIsEdit,
  setDropDown,
}) => {
  const style = {
    mainDiv: `w-[200px] h-[120px] bg-gray-300 absolute flex flex-col py-2 gap-2 items-center right-20 top-10 rounded-[5px] shadow-md`,
  }
  const { refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: FetchPosts,
  })

  const mutation = useMutation((id: string) => DeletePost(id, refetch))

  const handleDelete = async (id: string) => {
    mutation.mutate(id)
    refetch()
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
      <button
        onClick={() => {
          setIsEdit(true), setDropDown(false)
        }}
        className="btn  btn-success text-white w-[90%]"
      >
        Edit
      </button>
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
