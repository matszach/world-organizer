import type Note from '../../state/model/note'
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
          <h3 className="notes-vault-menu__title">Notes</h3>
          <button type="button" className="notes-vault-menu__action-btn" onClick={onCreateNote}>
            New
          </button>
        </div>
        {notes.length === 0 ? (
          <div className="notes-vault-menu__placeholder">No notes match the current filter.</div>
        ) : (
          <ul className="notes-vault-menu__notes-list">
            {notes.map(note => (
              <li key={note.id} className="notes-vault-menu__note-item">
                <button
                  type="button"
                  className={`notes-vault-menu__note-btn${selectedNoteId === note.id ? ' notes-vault-menu__note-btn--selected' : ''}`}
                  onClick={() => onSelectNote(note.id)}
                >
                  <span className="notes-vault-menu__note-title">{note.title}</span>
                  <span className="notes-vault-menu__note-meta">
                    {note.tags.length === 0 ? 'No tags' : `${note.tags.length} tag${note.tags.length === 1 ? '' : 's'}`}
                  </span>
                </button>
                <button
                  type="button"
                  className="notes-vault-menu__delete-btn"
                  onClick={() => onDeleteNote(note.id)}
                  aria-label={`Delete ${note.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="notes-vault-menu__section">
        <div className="notes-vault-menu__section-header">
          <h3 className="notes-vault-menu__title">Filter by tags</h3>
          <button
            type="button"
            className="notes-vault-menu__action-btn"
            onClick={onClearTagFilters}
            disabled={activeTagFilters.length === 0}
          >
            Clear
          </button>
        </div>
        {allTags.length === 0 ? (
          <div className="notes-vault-menu__placeholder">No tags created yet.</div>
        ) : (
          <div className="notes-vault-menu__tag-list">
            {allTags.map(tag => {
              const isActive = activeTagFilters.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  className={`notes-vault-menu__tag-btn${isActive ? ' notes-vault-menu__tag-btn--active' : ''}`}
                  onClick={() => onToggleTagFilter(tag)}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}

export default NotesVaultMenu
