
import { FormEvent, useRef, useState } from 'react'
import { Form, Row, Col, Stack, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from './App'

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: []
    })
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect 
              value={selectedTags.map(tag =>({label: tag.label, value:tag.id}))}
              onChange={tags => {
                setSelectedTags(tags.map(tag => ({label: tag.label, id: tag.value})))
              }}
              isMulti 
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Body</Form.Label>
              <Form.Control required  as='textarea' ref={markdownRef} rows={10}/>
            </Form.Group>
          </Col>
        </Row>
      </Stack>
      <Stack direction='horizontal' className='justify-content-end'>
        <Button type='submit' variant='primary'>Save</Button>
        <Link to='..'>
          <Button type='button' variant='outline-secondary'>Cancel</Button>
        </Link>
      </Stack>
    </Form>
  )
}