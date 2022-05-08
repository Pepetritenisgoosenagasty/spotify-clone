import { PauseIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'
import { setCurrentTrackId, setIsPlaying } from '../src/features/songs/songsSlice'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const currentTrackId = useSelector((state) => state.songs.currentTrackId)
  const isPlaying = useSelector((state) => state.songs.isPlaying)
  const dispatch = useDispatch()
  const [volume, setVolume] = useState(50)

const songInfo = useSongInfo()

const fetchCurrentSong = () => {
    if(!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            dispatch(setCurrentTrackId(data.body?.item?.id));

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
              dispatch(setIsPlaying(data.body?.is_playing))
            })
        })
    }
}

useEffect(() => {
if(spotifyApi.getAccessToken() && !currentTrackId) {
    fetchCurrentSong();
    setVolume(50)
}
}, [currentTrackId, spotifyApi, session])


  return(
      <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
       {/* Left */}
       <div className="flex items-center space-x-4">
           <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0]?.url} alt="" />
           <div>
               <h3>{songInfo?.name}</h3>
               <p>{songInfo?.artists?.[0]?.name}</p>
           </div>
       </div>
       <div>
           <SwitchHorizontalIcon className="button"/>
           <RewindIcon className="button"/>

           {isPlaying ? (
               <PauseIcon className="button w-10 h-10"/>
           ) : (
               <PlayIcon className="button w-10 h-10"/>
           )}
       </div>
      </div>
  )
}

export default Player
