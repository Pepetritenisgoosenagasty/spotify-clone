import React from 'react'
import { useSelector } from 'react-redux'
import Song from './Song'

const Songs = () => {
    const playlist = useSelector((state) => state.playlist.playlist)
    // console.log(playlist)
  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
        {playlist?.tracks.items.map((track, i) => (
            <Song key={track.track.id} track={track} order={i}/>
        ))}
    </div>
  )
}

export default Songs