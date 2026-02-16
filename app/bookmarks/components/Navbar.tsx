'use client'

import { supabase } from '../../../lib/supabase'

type Props={
  email?:string
  avatar?:string
}

export default function Navbar({email,avatar}:Props){

  const logout = async ()=>{
    await supabase.auth.signOut()
    window.location.href='/'
  }

  return(
    <div className="bg-black/40 border-b border-gray-800 px-6 py-3 flex justify-between items-center">

      <h1 className="font-bold text-lg">Smart Bookmark</h1>

      <div className="flex items-center gap-3">

        {avatar && (
          <img
            src={avatar}
            className="w-8 h-8 rounded-full"
          />
        )}

        <span className="text-sm text-gray-300">
          {email}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  )
}
