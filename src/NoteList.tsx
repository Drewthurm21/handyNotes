import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { Note, Tag } from './App'
import ReactSelect from 'react-select'

type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
}

export default function NoteList({ availableTags, notes }: NoteListProps ) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')

  return (
    <>
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
        
      </Row>
    </>
  )
}