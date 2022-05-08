import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from 'react';
import { shuffle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import spotifyApi from '../lib/sportify';
import { setPlaylist } from '../src/features/playlistId/playlistSlice';
import Songs from './Songs';

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

function Center() {
   const { data: session} = useSession();
   const [color, setColor] = useState(null);
   const playlistId = useSelector((state) => state.playlist.id)
   const playlist = useSelector((state) => state.playlist.playlist)
   const dispatch = useDispatch()


   useEffect(() => {
     setColor(shuffle(colors).pop())
   }, [playlistId])
   
   useEffect(() => {
     if (spotifyApi.getAccessToken()) {
     spotifyApi.getPlaylist(playlistId).then((data) => {
       dispatch(setPlaylist(data.body))
     }).catch((err) => console.log('something wnet wrong', err))
   
     }
   }, [spotifyApi, playlistId])


   
   const imgUrl = 'https://placeholder.pics/svg/300'

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
                <img className="rounded-full w-10 h-10" src={session?.user?.image ?? imgUrl} alt={session?.user?.name} />
                <h5>{session?.user.name}</h5>
                <ChevronDownIcon className="w-5 h-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
          <img className="w-44 h-44 shadow-2xl object-cover" src={playlist?.images?.[0]?.url ?? imgUrl}  alt={playlist?.name}/>
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
          </div>
        </section>
        <div>
          <Songs />
        </div>
    </div>
  )
}

export default Center