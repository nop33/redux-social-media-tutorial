import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { editPost, useSelectPost } from './postsSlice'

const EditPostForm = ({
  match: {
    params: { postId },
  },
}) => {
  const post = useSelectPost(postId)
  const [title, setTitle] = React.useState(post.title)
  const [content, setContent] = React.useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleAddPost = () => {
    if (title && content) {
      dispatch(editPost({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
      setTitle('')
      setContent('')
    }
  }

  console.log('EditPostForm renders')

  return (
    <section>
      <h2>Edit post</h2>
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

export default EditPostForm
