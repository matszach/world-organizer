import { create } from 'zustand'
import UserState from './model/user-state'
import World from './model/world'
import Note from './model/note'
import { getNewNote, mergeWorldNoteTags, normalizeNote } from './notes-util'
import { getNewWorld } from './world-util'

const createInitialUserState = (): UserState => ({
  world: null,
})

function normalizeIncomingWorld(world: World | null): World | null {
  if (!world) {
    return null
  }

  const normalizedNotes = world.notes.map(normalizeNote)

  return {
    ...world,
    notes: normalizedNotes,
    noteTags: mergeWorldNoteTags(world.noteTags ?? [], normalizedNotes.flatMap(note => note.tags)),
  }
}

interface UserStateStore extends UserState {
  reset: () => void 
  setWorld: (world: World | null) => void
  clearWorld: () => void
  createWorld: (name: string) => void
  createNote: () => string | undefined
  deleteNote: (noteId: string) => void
  updateNote: (note: Note) => void
}

const useUserStateStore = create<UserStateStore>((set, get) => ({
  ...createInitialUserState(),

  reset: () => set(createInitialUserState()),

  setWorld: world => set({ world: normalizeIncomingWorld(world) }),

  clearWorld: () => set({ world: null }),

  createWorld: name => {
    const trimmedName = name.trim()
    if (!trimmedName) return
    const newWorld: World = getNewWorld(trimmedName)
    set({ world: newWorld })
  },

  createNote: () => {
    const { world } = get()
    if (!world) return
    const newNote = getNewNote(world)
    set({
      world: {
        ...world,
        notes: [...world.notes, newNote],
      },
    })
    return newNote.id
  },

  deleteNote: noteId => {
    const { world } = get()
    if (!world) return
    set({
      world: {
        ...world,
        notes: world.notes.filter(
          note => note.id !== noteId
        ),
      },
    })
  },

  updateNote: note => {
    const { world } = get()
    if (!world) return
    const normalizedNote = normalizeNote(note)
    set({
      world: {
        ...world,
        notes: world.notes.map(
          existingNote => existingNote.id === normalizedNote.id ? normalizedNote : existingNote,
        ),
        noteTags: mergeWorldNoteTags(world.noteTags, normalizedNote.tags),
      },
    })
  },
}))

export default useUserStateStore