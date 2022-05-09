import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchNotifications,
  selectUnreadNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const unreadNotifications = useSelector(selectUnreadNotifications)
  const numUnreadNotifications = unreadNotifications.length

  const dispatch = useDispatch()

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  useEffect(() => {})

  console.log('Navbar renders')

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications{' '}
              {numUnreadNotifications > 0 && (
                <span className="badge">{numUnreadNotifications}</span>
              )}
            </Link>
          </div>
        </div>
        <button className="button" onClick={fetchNewNotifications}>
          Refresh notifications
        </button>
      </section>
    </nav>
  )
}
