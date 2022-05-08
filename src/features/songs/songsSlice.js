import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTrackId: null,
  isPlaying: false
}


export const SongsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setCurrentTrackId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentTrackId = action.payload
    },
    setIsPlaying: (state, action) => {
        state.isPlaying = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentTrackId, setIsPlaying} = SongsSlice.actions

export default SongsSlice.reducer