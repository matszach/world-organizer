import Note from "./note"

export default interface NoteDirectory {
  name: string
  subdirectories: NoteDirectory[]
  notes: Note[]
}