import React, { FunctionComponent } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type NotificationProps = {
  title: string
  body: string
}

const ReactNotificationComponent: FunctionComponent<NotificationProps> = ({ title, body }) => {
  toast.info(<Display />)

  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    )
  }

  return <ToastContainer />
}

export default ReactNotificationComponent
