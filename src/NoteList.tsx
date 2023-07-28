import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col, Form, Row, Stack } from 'react-bootstrap'
import { Note, Tag } from './App'
import ReactSelect from 'react-select'
import style from './NoteList.module.css'

type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
}

type SimplifiedNote = {
  id: string
  tags: Tag[]
  title: string
}

export default function NoteList({ availableTags, notes }: NoteListProps ) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')


  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      (selectedTags.every(tag =>note.tags.some(noteTag => noteTag.id === tag.id))) && 
      (title.length === 0 || note.title.toLowerCase().includes(title.toLowerCase()))) 
  }, [selectedTags, title, notes])

  
  return (
    <>
    <Button onClick={() => console.log(selectedTags, filteredNotes, notes)}></Button>
      <Row>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary'>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>  
              <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group controlId='title'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect 
                value={selectedTags.map(tag =>({label: tag.label, value:tag.id}))}
                options={availableTags.map(tag =>({label: tag.label, value: tag.id }))}
                onChange={tags => {
                  setSelectedTags(tags.map(tag => ({label: tag.label, id: tag.value})))
                }}
                isMulti 
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  )
}


function NoteCard({ id, tags, title }: SimplifiedNote) {

  return (
    <>
      <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${style.card}`}>
        <Card.Body>
          {title}
        </Card.Body>
        <Card.Footer className='px-4'> Tags:
          {tags.map(tag => (
            <Badge className='mx-2'>{`${tag.label}`}</Badge>
          ))}
        </Card.Footer>
      </Card>
    </>
  )
}