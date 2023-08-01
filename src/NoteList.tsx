import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { Note, Tag } from './App'
import ReactSelect from 'react-select'
import styles from './NoteList.module.css'

type NoteListProps = {
  availableTags: Tag[]
  notes: Note[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

type SimplifiedNote = {
  id: string
  tags: Tag[]
  title: string
}

type TagsModalProps = {
  availableTags: Tag[]
  closeModal: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
  showModal: boolean
}

export default function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps ) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [title, setTitle] = useState('')


  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      (selectedTags.every(tag =>note.tags.some(noteTag => noteTag.id === tag.id))) && 
      (title.length === 0 || note.title.toLowerCase().includes(title.toLowerCase()))) 
  }, [selectedTags, title, notes])

  
  return (
    <>
      <Row>
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button variant='outline-secondary' onClick={() => setShowModal(true)}>Edit Tags</Button>
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
      <EditTagsModal 
        availableTags={availableTags} 
        closeModal={() => setShowModal(false)} 
        showModal={showModal}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
        />
    </>
  )
}

function NoteCard({ id, tags, title }: SimplifiedNote) {

  return (
    <>
      <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
          <Stack gap={2} className='align-items-center justify-content-center h-100'>
            <span className='fs-5'>{title}</span>
            <Stack direction='horizontal' className='my-2'>
            { tags.length > 0 &&
              tags.map(tag => <Badge key={tag.id} className='mx-1 text-truncate'>{`${tag.label}`}</Badge>)
            }
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}

function EditTagsModal({availableTags, closeModal, onDeleteTag, onUpdateTag, showModal }: TagsModalProps) {
  

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>Edit tags</Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type='text' value={tag.label} onChange={(e) => onUpdateTag(tag.id, e.target.value)}/>
                </Col>
                <Col xs='auto'>
                  <Button variant='outline-danger' onClick={() => onDeleteTag(tag.id)}>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}