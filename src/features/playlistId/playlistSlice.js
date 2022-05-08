import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '37i9dQZEVXbMDoHDwVN2tF',
  playlist: null
}

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    getPlaylistId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.id = action.payload
    },
    setPlaylist: (state, action) => {
        state.playlist = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getPlaylistId, setPlaylist} = playlistSlice.actions

export default playlistSlice.reducer