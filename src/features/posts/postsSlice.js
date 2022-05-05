import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First post!', content: 'This is the first post!' },
  { id: '2', title: 'Second post!', content: 'This is the second post!' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: { id: nanoid(), title, content },
        }
      },
    },
    editPost(state, action) {
      const { id, title, content } = action.payload
      const post = state.find((post) => post.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
    },
  },
})

export const { addPost, editPost } = postsSlice.actions

export const useSelectPosts = () => useSelector((state) => state.posts)
export const useSelectPost = (postId) =>
  useSelector((state) => state.posts.find((post) => post.id === postId))

export default postsSlice.reducer
