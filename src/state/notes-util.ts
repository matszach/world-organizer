import Note from "./model/note"
import World from "./model/world"

export function getNewNote(world: World): Note {
  const noteId = crypto.randomUUID()
  let newTitle = 'New Note'
  let counter = 1
  while (world.notes.some(note => note.title === `${newTitle} ${counter}`)) {
    counter++
  }
  return {
    id: noteId,
    title: `${newTitle} ${counter}`,
    category: null,
    content: '',
  }
}

export function validateNoteCategory(world: World, category: string): boolean {
  if (!category) {
    return false
  }
  if (world.noteCategories.includes(category)) {
    return false
  }
  return true
}