'use client'

import BookmarkCard from '../../../app/bookmarks/components/BookmarkCard'

type Bookmark = {
  id: string
  title: string
  url: string
}

type Props = {
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
  onEdit: (id: string, title: string, url: string) => void
}

export default function BookmarkList({
  bookmarks,
  onDelete,
  onEdit
}: Props){

  if(bookmarks.length===0){
    return(
      <div className="text-center text-gray-400 mt-10">
        No bookmarks yet 🚀
      </div>
    )
  }

  return(
    <div className="space-y-3">
      {bookmarks.map(b=>(
        <BookmarkCard
          key={b.id}
          id={b.id}
          title={b.title}
          url={b.url}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
