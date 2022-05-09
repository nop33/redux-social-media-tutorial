import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { client } from '../../api/client'
import { selectAllPosts } from '../posts/postsSlice'

const sliceName = 'users'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const fetchUsers = createAsyncThunk(
  `${sliceName}/fetchUsers`,
  async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
  }
)

const usersSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(name) {
        return {
          payload: { id: nanoid(), name },
        }
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state[sliceName])

export const useSelectUsers = () => useSelector(selectAllUsers)
export const useSelectUser = (userId) =>
  useSelector((state) => selectUserById(state, userId))

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export const { addUser } = usersSlice.actions

export default usersSlice.reducer
