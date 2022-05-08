import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSpotify from './useSpotify'

function useSongInfo() {
  const spotifyApi = useSpotify()
  const currentTrackId = useSelector((state) => state.songs.currentTrackId)
  const dispatch = useDispatch()
  const [songInfo, setSongInfo] = useState(null)

   useEffect(() => {
      const fetchSongInfo = async () => {
       if (currentTrackId) {
           const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,
           {
               headers: {
                   Authorization: 'Bearer ' + spotifyApi.getAccessToken()
               }
           }).then(response => response.json());

           setSongInfo(trackInfo);
       }
      }

      fetchSongInfo();
   }, [currentTrackId, spotifyApi])
   

  return songInfo
}

export default useSongInfo
