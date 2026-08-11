import Note from "./note"

export default interface World {
  id: string
  name: string
  notes: Note[]
  noteTags: string[]
}