import { create } from 'zustand'
import UserState from './model/user-state'
import World from './model/world'
import Note from './model/note'
import { getNewNote, validateNoteCategory } from './notes-util'
import { getNewWorld } from './world-util'

const createInitialUserState = (): UserState => ({
  world: null,
})

interface UserStateStore extends UserState {
  reset: () => void 
  setWorld: (world: World | null) => void
  clearWorld: () => void
  createWorld: (name: string) => void
  createNote: () => string | undefined
  deleteNote: (noteId: string) => void
  updateNote: (note: Note) => void
  createNoteCategory: (category: string) => void
  deleteNoteCategory: (category: string) => void
  renameNoteCategory: (oldCategory: string, newCategory: string) => void
}

const useUserStateStore = create<UserStateStore>((set, get) => ({
  ...createInitialUserState(),

  reset: () => set(createInitialUserState()),

  setWorld: world => set({ world }),

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
    set({
      world: {
        ...world,
        notes: world.notes.map(
          existingNote => existingNote.id === note.id ? note : existingNote,
        ),
      },
    })
  },

  createNoteCategory: category => {
    const { world } = get()
    if (!world) return
    const normalizedCategory = category.trim()
    if (!validateNoteCategory(world, normalizedCategory)) return
    set({
      world: {
        ...world,
        noteCategories: [...world.noteCategories, normalizedCategory],
      },
    })
  },

  deleteNoteCategory: category => {
    const { world } = get()
    if (!world) return
    set({
      world: {
        ...world,
        noteCategories: world.noteCategories.filter(
          existingCategory => existingCategory !== category
        ),
        notes: world.notes.map(
          note => note.category === category ? { ...note, category: null } : note,
        ),
      },
    })
  },

  renameNoteCategory: (oldCategory, newCategory) => {
    const { world } = get()
    if (!world) return
    const normalizedNewCategory = newCategory.trim()
    if (!validateNoteCategory(world, normalizedNewCategory) || normalizedNewCategory === oldCategory) return
    set({
      world: {
        ...world,
        noteCategories: world.noteCategories.map(
          existingCategory => existingCategory === oldCategory ? normalizedNewCategory : existingCategory
        ),
        notes: world.notes.map(
          note => note.category === oldCategory ? { ...note, category: normalizedNewCategory } : note
        ),
      },
    })
  },
}))

export default useUserStateStore