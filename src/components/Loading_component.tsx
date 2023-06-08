import React, { FC } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
type loadingProps = {
  loading: boolean
}
const LoadingComponent: FC<loadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <p className="text-[6rem] text-[#ec2b58] absolute left-[45%] bottom-60  ">
          <AiOutlineLoading className="rotate" />
        </p>
      )}
    </>
  )
}

export default LoadingComponent
