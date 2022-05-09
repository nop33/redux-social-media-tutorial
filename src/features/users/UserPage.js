import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useSelectUser } from '../users/usersSlice'

const UserPage = ({
  match: {
    params: { userId },
  },
}) => {
  const user = useSelectUser(userId)

  const userPosts = useSelector((state) =>
    state.posts.posts.filter((post) => post.user === userId)
  )

  console.log('UserPage renders')

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {userPosts &&
          userPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default UserPage
