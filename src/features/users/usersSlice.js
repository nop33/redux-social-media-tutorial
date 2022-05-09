import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { client } from '../../api/client'

const name = 'users'

const initialState = []

export const fetchUsers = createAsyncThunk(`${name}/fetchUsers`, async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name,
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
  },
})

export const useSelectUsers = () => useSelector((state) => state.users)
export const useSelectUser = (userId) =>
  useSelector((state) => state.users.find((user) => user.id === userId))

export const { addUser } = usersSlice.actions

export default usersSlice.reducer
