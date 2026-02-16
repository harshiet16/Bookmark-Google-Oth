'use client'

import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home(){

  const router = useRouter()

  const [loading,setLoading]=useState(true)
  const [isSignup,setIsSignup]=useState(false)

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')

  useEffect(()=>{

    const checkUser=async()=>{
      const {data}=await supabase.auth.getUser()

      if(data.user){
        router.replace('/bookmarks')
      }else{
        setLoading(false)
      }
    }

    checkUser()

  },[router])

  // GOOGLE LOGIN
  const googleLogin=async()=>{
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo:`${window.location.origin}/bookmarks`
      }
    })
  }

  // EMAIL SIGNUP
  const signup=async()=>{
    setError('')

    const {error}=await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      setError(error.message)
    }else{
      alert('Signup successful! Now login.')
      setIsSignup(false)
    }
  }

  // EMAIL LOGIN
  const login=async()=>{
    setError('')

    const {error}=await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
    }else{
      router.replace('/bookmarks')
    }
  }

  if(loading){
    return(
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        Checking session...
      </main>
    )
  }

  return(
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">

      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl text-center w-[360px]">

        <h1 className="text-3xl font-bold mb-2">Smart Bookmark</h1>

        <p className="text-gray-300 mb-6">
          {isSignup?'Create account':'Login to your account'}
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-black/40 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/40 border border-gray-700"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={isSignup?signup:login}
          className="w-full bg-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-700 mb-3"
        >
          {isSignup?'Sign Up':'Login'}
        </button>

        <button
          onClick={()=>setIsSignup(!isSignup)}
          className="text-sm text-gray-300 mb-6 underline"
        >
          {isSignup?'Already have an account? Login':'Create new account'}
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
          Continue with Google
        </button>

      </div>

    </main>
  )
}
