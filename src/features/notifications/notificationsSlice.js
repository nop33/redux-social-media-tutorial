import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const state = getState()
    const allNotifications = state.notifications
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''

    console.log(latestTimestamp)

    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    markAllNotificationsRead(state, action) {
      state.forEach((notification) => (notification.read = true))
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.forEach((notification) => (notification.isNew = !notification.read))
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const { markAllNotificationsRead } = notificationSlice.actions

export default notificationSlice.reducer
