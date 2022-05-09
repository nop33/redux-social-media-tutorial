import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const state = getState()
    const allNotifications = Object.values(state.notifications.entities)
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''

    console.log(latestTimestamp)

    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    markAllNotificationsRead(state, action) {
      // state.forEach((notification) => (notification.read = true))
      Object.values(state.entities).forEach(
        (notification) => (notification.read = true)
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      // state.push(...action.payload)
      notificationAdapter.upsertMany(state, action.payload)
      // state.forEach((notification) => (notification.isNew = !notification.read))
      Object.values(state.entities).forEach(
        (notification) => (notification.isNew = !notification.read)
      )
      // state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state) => state.notifications)

export const selectUnreadNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter((notification) => notification.isNew)
)

export const { markAllNotificationsRead } = notificationSlice.actions

export default notificationSlice.reducer
