import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from '../features/playlistId/playlistSlice'


export const store = configureStore({
  reducer: {
      playlist: playlistReducer
  },
})