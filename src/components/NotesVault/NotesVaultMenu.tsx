import type Note from '../../state/model/note'
import { APP_TEXT } from '../../content/appText'
import NoteListItem from './NoteListItem'
import TagFilterButton from './TagFilterButton'
import './NotesVaultMenu.scss'

interface NotesVaultMenuProps {
  notes: Note[]
  selectedNoteId: string | null
  allTags: string[]
  activeTagFilters: string[]
  onCreateNote: () => void
  onDeleteNote: (noteId: string) => void
  onSelectNote: (noteId: string) => void
  onToggleTagFilter: (tag: string) => void
  onClearTagFilters: () => void
}

function NotesVaultMenu({
  notes,
  selectedNoteId,
  allTags,
  activeTagFilters,
  onCreateNote,
  onDeleteNote,
  onSelectNote,
  onToggleTagFilter,
  onClearTagFilters,
}: NotesVaultMenuProps) {
  return (
    <aside className="notes-vault-menu">
      <div className="notes-vault-menu__section">
        <div className="notes-vault-menu__section-header">
          <h3 className="notes-vault-menu__title">{APP_TEXT.notesVault.filterTitle}</h3>
          <button
            type="button"
            className="notes-vault-menu__action-btn"
            onClick={onClearTagFilters}
            disabled={activeTagFilters.length === 0}
          >
            {APP_TEXT.notesVault.clear}
          </button>
        </div>
        {allTags.length === 0 ? (
          <div className="notes-vault-menu__placeholder">{APP_TEXT.notesVault.noTagsCreated}</div>
        ) : (
          <div className="notes-vault-menu__tag-list">
            {allTags.map(tag => (
              <TagFilterButton
                key={tag}
                tag={tag}
                isActive={activeTagFilters.includes(tag)}
                onToggle={onToggleTagFilter}
              />
            ))}
          </div>
        )}
      </div>

      <div className="notes-vault-menu__section">
        <div className="notes-vault-menu__section-header">
          <h3 className="notes-vault-menu__title">{APP_TEXT.notesVault.notesTitle}</h3>
          <button type="button" className="notes-vault-menu__action-btn" onClick={onCreateNote}>
            {APP_TEXT.notesVault.newNote}
          </button>
        </div>
        {notes.length === 0 ? (
          <div className="notes-vault-menu__placeholder">{APP_TEXT.notesVault.noMatches}</div>
        ) : (
          <ul className="notes-vault-menu__notes-list">
            {notes.map(note => (
              <NoteListItem
                key={note.id}
                note={note}
                isSelected={selectedNoteId === note.id}
                onSelectNote={onSelectNote}
                onDeleteNote={onDeleteNote}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}

export default NotesVaultMenu
