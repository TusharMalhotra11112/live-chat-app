import React from 'react'
import { useSelector } from 'react-redux'

export default function MessageSent({props}) {
  const lightMode = useSelector((state)=>state.themeKey)

  return (
    <div className={'messageSent'+ (lightMode?"":" dark")}>
        <div className={"sentMessageBox"+ (lightMode?"":" dark")}>
            <p className="sentMessage">{props.content}</p>
            {/* <p className="sentMessage-TimeStamp">10:10</p> */}
        </div>
    </div>
  )
}
