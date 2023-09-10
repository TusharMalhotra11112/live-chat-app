import React from 'react'
import { useSelector } from 'react-redux'

export default function MessageReceived({props}) {
  const lightMode = useSelector((state)=>state.themeKey)
  return (
    <div className={'messageReceived'+ (lightMode?"":" dark")}>
        <div className={"messageReceivedContainer"+ (lightMode?"":" dark")}>
          <div className={"receivedMessageIcon"+ (lightMode?"":" dark")}>{props.sender.name[0]}</div>
          <div className={"receivedMessageBox"+ (lightMode?"":" dark")}>
            <div className={"receivedMessage"+ (lightMode?"":" dark")}>
              <p className="receivedMessageName">{props.sender.name}</p>
              <p className="receivedMessageText">{props.content} </p>
            </div>
          {/* <p className="rececivedMessage-TimeStamp">10:10</p> */}
          </div>
        </div>
    </div>
  )
}
