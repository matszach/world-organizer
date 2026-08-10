import NoteTag from "./note-tag"

export default interface Note {
  id: string
  title: string
  tags: NoteTag[]
  content: string
}
