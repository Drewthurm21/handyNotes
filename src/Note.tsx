import { Badge, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";

export default function Note() {
  const note = useNote()

  return <>
    <Row className='align-items-center mb-4'>
      <Col>
        <h1>{note.title}</h1>
      </Col>
      { note.tags.length > 0 &&
        <Stack gap={1} direction='horizontal' className='flex-wrap'>
          { note.tags.length > 0 &&
            note.tags.map(tag => <Badge key={tag.id} className='mx-1 text-truncate'>{`${tag.label}`}</Badge>)
          }
        </Stack>
      }
    </Row>
  </>
}