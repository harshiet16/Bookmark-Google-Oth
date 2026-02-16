'use client'

type Props = {
  id: string
  title: string
  url: string
  onDelete: (id: string) => void
  onEdit: (id: string, title: string, url: string) => void
}

export default function BookmarkCard({
  id,
  title,
  url,
  onDelete,
  onEdit
}: Props) {

  return (
    <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center hover:bg-white/20 transition">

      <a href={url} target="_blank" className="font-semibold underline">
        {title}
      </a>

      <div className="space-x-3">

        <button
          onClick={() => {
            const newTitle = prompt("Edit title", title)
            const newUrl = prompt("Edit URL", url)

            if(newTitle && newUrl){
              onEdit(id,newTitle,newUrl)
            }
          }}
          className="text-yellow-400 hover:text-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(id)}
          className="text-red-400 hover:text-red-600"
        >
          Delete
        </button>

      </div>

    </div>
  )
}
