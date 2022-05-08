import { configureStore } from '@reduxjs/toolkit'
import playlistReducer from '../features/playlistId/playlistSlice'
import songsReducer from '../features/songs/songsSlice'


export const store = configureStore({
  reducer: {
      playlist: playlistReducer,
      songs: songsReducer
  },
})