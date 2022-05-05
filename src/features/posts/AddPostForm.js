import React from 'react'
import { useDispatch } from 'react-redux'

import { addPost } from './postsSlice'

const AddPostForm = () => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  const dispatch = useDispatch()

  const handleAddPost = () => {
    if (title && content) {
      dispatch(addPost(title, content))
      setTitle('')
      setContent('')
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
        <button type="button" onClick={handleAddPost}>
          Save
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
