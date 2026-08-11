import type Note from '../../state/model/note'
import { APP_TEXT } from '../../content/appText'
import './NoteListItem.scss'

interface NoteListItemProps {
  note: Note
  isSelected: boolean
  onSelectNote: (noteId: string) => void
  onDeleteNote: (noteId: string) => void
}

function NoteListItem({ note, isSelected, onSelectNote, onDeleteNote }: NoteListItemProps) {
  return (
    <li className="notes-vault-menu__note-item">
      <button
        type="button"
        className={`notes-vault-menu__note-btn${isSelected ? ' notes-vault-menu__note-btn--selected' : ''}`}
        onClick={() => onSelectNote(note.id)}
      >
        <span className="notes-vault-menu__note-title">{note.title}</span>
      </button>
      <button
        type="button"
        className="notes-vault-menu__delete-btn"
        onClick={() => onDeleteNote(note.id)}
        aria-label={`${APP_TEXT.notesVault.delete} ${note.title}`}
      >
        {APP_TEXT.notesVault.delete}
      </button>
    </li>
  )
}

export default NoteListItem
