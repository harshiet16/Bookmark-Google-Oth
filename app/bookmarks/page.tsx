'use client'

import { supabase } from '../../lib/supabase'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import BookmarkForm from './components/BookmarkForm'
import BookmarkList from './components/BookmarkList'

type Bookmark={
  id:string
  title:string
  url:string
}

export default function Bookmarks(){

  const [user,setUser]=useState<any>(null)
  const [bookmarks,setBookmarks]=useState<Bookmark[]>([])
  const [title,setTitle]=useState('')
  const [url,setUrl]=useState('')

  const loadBookmarks=async()=>{
    const {data}=await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at',{ascending:false})

    setBookmarks(data||[])
  }

  useEffect(()=>{

    const init=async()=>{
      const {data}=await supabase.auth.getUser()

      if(!data.user){
        window.location.href='/'
        return
      }

      setUser(data.user)
      loadBookmarks()
    }

    init()

  },[])

  const addBookmark=async()=>{
    if(!title||!url||!user) return

    const tempId=crypto.randomUUID()

    setBookmarks(prev=>[
      {id:tempId,title,url},
      ...prev
    ])

    const {error}=await supabase
      .from('bookmarks')
      .insert({
        title,
        url,
        user_id:user.id
      })

    if(error){
      console.error(error)
      loadBookmarks()
    }

    setTitle('')
    setUrl('')
  }

  const deleteBookmark=async(id:string)=>{

    setBookmarks(prev=>prev.filter(b=>b.id!==id))

    const {error}=await supabase
      .from('bookmarks')
      .delete()
      .eq('id',id)

    if(error){
      console.error(error)
      loadBookmarks()
    }
  }

  const editBookmark=async(id:string,title:string,url:string)=>{

    setBookmarks(prev=>
      prev.map(b=>b.id===id?{...b,title,url}:b)
    )

    const {error}=await supabase
      .from('bookmarks')
      .update({title,url})
      .eq('id',id)

    if(error){
      console.error(error)
      loadBookmarks()
    }
  }

  if(!user) return <p className="p-10 text-white">Loading dashboard...</p>

  return(
    <main className="min-h-screen bg-gray-950 text-white">

      <Navbar
        email={user?.email}
        avatar={user?.user_metadata?.avatar_url}
      />

      <div className="max-w-3xl mx-auto p-6">

        <BookmarkForm
          title={title}
          url={url}
          setTitle={setTitle}
          setUrl={setUrl}
          onAdd={addBookmark}
        />

        <BookmarkList
          bookmarks={bookmarks}
          onDelete={deleteBookmark}
          onEdit={editBookmark}
        />

      </div>

    </main>
  )
}
