import NoteDirectory from "./note-directory";

export default interface World {
  id: string
  name: string
  notes: NoteDirectory
}