import { useSelector } from 'react-redux'
import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const sliceName = 'posts'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk(
  `${sliceName}/fetchPosts`,
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  }
)

export const addNewPost = createAsyncThunk(
  `${sliceName}/addNewPost`,
  async (post) => {
    const response = await client.post('/fakeApi/posts', post)
    return response.data
  }
)

const postsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, authorId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: authorId,
          },
        }
      },
    },
    editPost(state, action) {
      const { id, title, content } = action.payload
      const post = state.entities[id]
      if (post) {
        post.title = title
        post.content = content
      }
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      const post = state.entities[postId]
      if (post) {
        post.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    builder.addCase(addNewPost, (action, state) => {
      postsAdapter.addOne(action.payload)
    })
  },
})

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state[sliceName])

export const { addPost, editPost, addReaction } = postsSlice.actions

export const useSelectPosts = () => useSelector((state) => state.posts.posts)
export const useSelectPost = (postId) =>
  useSelector((state) => selectPostById(state, postId))
export const useSelectPostsStatus = () =>
  useSelector((state) => state.posts.status)

export default postsSlice.reducer
