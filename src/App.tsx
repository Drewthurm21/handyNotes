import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "./useLocalStorage"
import Note from "./Note.tsx"
import NewNote from "./NewNote"
import NoteList from "./NoteList"
import NoteLayout from "./NoteLayout"

export type Tag = {
  id: string
  label: string
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: String[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Note = {
  id: string
} & NoteData

function App() {
  const navigate = useNavigate()
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])


  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes( prevNotes => {
      return [
        ...prevNotes, 
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })

    navigate('/')
  }

  function addTag(tag: Tag) {
    setTags(prevTags => [...prevTags, tag])
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList availableTags={tags} notes={notesWithTags} />} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path=':id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={ <Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
