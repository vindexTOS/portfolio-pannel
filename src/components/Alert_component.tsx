import React, { FC } from 'react'
type AlertPropType = {
  handleFalsyValu: () => void
  handleAction: (id: string | undefined) => void
  _id: string | undefined
}
const AlertComponent: FC<AlertPropType> = ({
  handleFalsyValu,
  handleAction,
  _id,
}) => {
  const style = {
    section: ` w-[100%] h-[100%] bg-gray-300/20 absolute  `,
    alertDiv: ` absolute w-[400px] h-[320px] bg-gray-200 rounded-[20px] flex  items-center justify-around`,
  }

  return (
    <div className={style.alertDiv}>
      <button
        onClick={() => handleAction(_id)}
        className="btn bg-red-600  text-white w-[9rem]"
      >
        Dlete
      </button>
      <button
        onClick={handleFalsyValu}
        className="btn  bg-green-500 text-white w-[9rem]"
      >
        Cancel
      </button>
    </div>
  )
}

export default AlertComponent
