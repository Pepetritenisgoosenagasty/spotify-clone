import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

const login = ({providers}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <img loading="lazy" className="w-52 mb-10" src="https://links.papareact.com/9xl" alt="Sportify logo"/>
      {
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <button className="bg-[#18d860] p-5 rounded-lg text-white" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>Login in with {provider.name}</button>
          </div>
        ))
      }
    </div>
  )
}

export default login

export async function getServerSideProps() {
   const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}