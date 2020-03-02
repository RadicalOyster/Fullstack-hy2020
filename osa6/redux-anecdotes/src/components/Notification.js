import React from 'react'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

const Notification = () => {
  console.log("STATE IS ", useSelector(state => state))
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification === null) {
    return (
      <div>
      </div>
    )
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const ConnectedNotification = connect()(Notification)

export default ConnectedNotification