'use client'

type Props = {
  title:string
  url:string
  setTitle:(v:string)=>void
  setUrl:(v:string)=>void
  onAdd:()=>void
}

export default function BookmarkForm({
  title,
  url,
  setTitle,
  setUrl,
  onAdd
}:Props){

  return(
    <div className="bg-white/10 p-4 rounded-xl mb-6 flex gap-2">

      <input
        placeholder="Title"
        value={title}
        onChange={e=>setTitle(e.target.value)}
        className="flex-1 p-2 rounded bg-black/40 border border-gray-700"
      />

      <input
        placeholder="URL"
        value={url}
        onChange={e=>setUrl(e.target.value)}
        className="flex-1 p-2 rounded bg-black/40 border border-gray-700"
      />

      <button
        onClick={onAdd}
        className="bg-blue-600 px-5 rounded hover:bg-blue-700"
      >
        Add
      </button>

    </div>
  )
}
