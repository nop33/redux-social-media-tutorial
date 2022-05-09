import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import {
  markAllNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'

import { useSelectUsers } from '../users/usersSlice'

const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelectUsers()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(markAllNotificationsRead())
  }, [dispatch, notifications.length])

  console.log('NotificationsList renders')

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {notifications.map((notification) => {
        const user = users.find((user) => user.id === notification.user)
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)

        return (
          <div
            key={notification.id}
            className={classnames('notification', { new: notification.isNew })}
          >
            <div>
              <b>{user.name}</b> {notification.message}
            </div>
            <div title={notification.date}>
              <i>{timeAgo} ago</i>
              <b>{notification.date}</b>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default NotificationsList
