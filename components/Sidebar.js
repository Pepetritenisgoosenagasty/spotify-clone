import React, { useState, useEffect } from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylistId } from '../src/features/playlistId/playlistSlice'


const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  // const [playlistId, setPlaylistId] = useState(null)
  const playlistId = useSelector((state) => state.playlist.id)
  const dispatch = useDispatch()

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data)
      })
    }
  }, [session, spotifyApi])

  console.log("You clicked on Playlist id", playlistId)

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-default h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
      
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Song</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episode</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* PlayList */}

        {/* <div className=""> */}
          {playlists?.body?.items?.length > 0 ? (
          playlists?.body?.items?.map((playlist) => (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white truncate ... overflow-hidden .. w-40"
              onClick={() => dispatch(getPlaylistId(playlist.id))}
            >
              {playlist.name}
            </p>
          ))
        ) : (
          <p className="cursor-pointer hover:text-white">Empty PlayList</p>
        )}
        </div>
      {/* </div> */}
       <div className="absolute bottom-6">
          <button
          className="flex items-center space-x-2 bg-gray-900 px-6 py-2 rounded-lg hover:bg-gray-800"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>LogOut</p>
        </button>
       </div>
    </div>
  )
}

export default Sidebar
