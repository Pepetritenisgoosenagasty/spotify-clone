import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react'
import React, {useState, useEffect} from 'react';
import { shuffle } from 'lodash';

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


   useEffect(() => {
     
     setColor(shuffle(colors).pop())
   }, [])
   

   const imgUrl = 'https://placeholder.pics/svg/300'

  return (
    <div className="flex-grow">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
                <img className="rounded-full w-10 h-10" src={session?.user?.image ?? imgUrl} alt={session?.user?.name} />
                <h5>{session?.user.name}</h5>
                <ChevronDownIcon className="w-5 h-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}>

        </section>
    </div>
  )
}

export default Center