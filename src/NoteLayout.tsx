import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from './App'

type NoteLayoutProps = {
  notes: Note[]
}

export const useNote = () => useOutletContext<Note>()

export default function NoteLayout({ notes }: NoteLayoutProps) {

  const { id } = useParams()
  const note = notes.find(n => n.id === id)

  if (!note) return <Navigate to='/' />

  return <Outlet context={note} />
}