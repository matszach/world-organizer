import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import NotesVaultMenu from '../components/NotesVault/NotesVaultMenu'
import NotesWorkspace from '../components/NotesVault/NotesWorkspace'
import useUserStateStore from '../state/user-state-store'
import './NotesVaultPage.scss'

function NotesVaultPage() {
  const world = useUserStateStore(state => state.world)
  const createNote = useUserStateStore(state => state.createNote)
  const deleteNote = useUserStateStore(state => state.deleteNote)
  const updateNote = useUserStateStore(state => state.updateNote)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [activeTagFilters, setActiveTagFilters] = useState<string[]>([])

  const allTags = useMemo(() => {
    if (!world) {
      return []
    }
    return world.noteTags
  }, [world])

  const filteredNotes = useMemo(() => {
    if (!world) {
      return []
    }
    if (activeTagFilters.length === 0) {
      return world.notes
    }
    return world.notes.filter(note => activeTagFilters.every(tag => note.tags.includes(tag)))
  }, [activeTagFilters, world])

  const selectedNote = useMemo(() => {
    if (!world || !selectedNoteId) {
      return null
    }
    return world.notes.find(note => note.id === selectedNoteId) ?? null
  }, [selectedNoteId, world])

  const handleCreateNote = () => {
    const newNoteId = createNote()
    if (newNoteId) {
      setSelectedNoteId(newNoteId)
    }
  }

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId)
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null)
    }
  }

  const handleToggleTagFilter = (tag: string) => {
    setActiveTagFilters(currentFilters => {
      if (currentFilters.includes(tag)) {
        return currentFilters.filter(existingTag => existingTag !== tag)
      }
      return [...currentFilters, tag]
    })
  }

  return (
    <div className="app">
      <Navbar appTitle="notes-vault" showHomeButton />
      <main className="notes-vault-page">
        <NotesVaultMenu
          notes={filteredNotes}
          selectedNoteId={selectedNoteId}
          allTags={allTags}
          activeTagFilters={activeTagFilters}
          onCreateNote={handleCreateNote}
          onDeleteNote={handleDeleteNote}
          onSelectNote={setSelectedNoteId}
          onToggleTagFilter={handleToggleTagFilter}
          onClearTagFilters={() => setActiveTagFilters([])}
        />
        <NotesWorkspace note={selectedNote} onUpdateNote={updateNote} />
      </main>
    </div>
  )
}

export default NotesVaultPage
