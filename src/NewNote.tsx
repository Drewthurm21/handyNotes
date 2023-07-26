import NoteForm from './NoteForm'
import { NoteData } from './App'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
}

export default function NewNote({ onSubmit }: NewNoteProps) {

  return (
    <>
      <h1 className='mb-4'>newNote</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}