import React from 'react'
import { useDispatch } from 'react-redux'

import { addNewPost } from './postsSlice'
import { useSelectUsers } from '../users/usersSlice'

const AddPostForm = () => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [authorId, setAuthorId] = React.useState('')
  const [status, setStatus] = React.useState('idle')

  const users = useSelectUsers()

  const dispatch = useDispatch()

  const canSave =
    title.length > 0 &&
    content.length > 0 &&
    authorId.length > 0 &&
    status === 'idle'

  const handleAddPost = async () => {
    if (canSave) {
      // dispatch(addPost(title, content, authorId))
      try {
        setStatus('pending')
        await dispatch(addNewPost({ title, content, user: authorId })).unwrap()

        setTitle('')
        setContent('')
        setAuthorId('')
      } catch (e) {
        console.error(e)
      } finally {
        setStatus('idle')
      }
    }
  }

  console.log('AddPostForm renders')

  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label htmlFor="author">Author</label>
        <select
          id="author"
          name="author"
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Select author</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAddPost} disabled={!canSave}>
          Save
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
