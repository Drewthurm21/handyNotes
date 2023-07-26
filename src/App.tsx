import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NewNote from "./NewNote"

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

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Hello.</h1>} />
        <Route path='/new' element={<NewNote />} />
        <Route path=':id'>
          <Route index element={<h1>Show</h1>} />
          <Route path='edit' element={<h1>Edit</h1>} />
        </Route>
        <Route path='*' element={ <Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
