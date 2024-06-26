import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./useLocalStorage";
import Note from "./Note.tsx";
import NewNote from "./NewNote";
import NoteList from "./NoteList.tsx";
import NoteLayout from "./NoteLayout";
import EditNote from "./EditNote.tsx";

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: String[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Note = {
  id: string;
} & NoteData;

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    ]);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== id) return note;
        else return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
      })
    );
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    navigate("/");
  }

  function onAddTag(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function onDeleteTag(id: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  }

  function onUpdateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) return { ...tag, label };
        else return tag;
      });
    });
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onDeleteTag={onDeleteTag}
              onUpdateTag={onUpdateTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path=":id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={onAddTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
