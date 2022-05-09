import React from 'react'
import { Link } from 'react-router-dom'
import { useSelectUsers } from './usersSlice'

const UsersList = () => {
  const users = useSelectUsers()

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersList
