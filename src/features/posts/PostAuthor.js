import React from 'react'
import { useSelectUser } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
  const user = useSelectUser(userId)

  return <span>by {user ? user.name : 'Uknown author'}</span>
}

export default PostAuthor
