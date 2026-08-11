import './NoteTagChip.scss'
import { APP_TEXT } from '../../content/appText'

interface NoteTagChipProps {
  tag: string
  onRemove: (tag: string) => void
}

function NoteTagChip({ tag, onRemove }: NoteTagChipProps) {
  return (
    <button
      type="button"
      className="note-tag-chip"
      onClick={() => onRemove(tag)}
      aria-label={`${APP_TEXT.notesVault.delete} tag ${tag}`}
    >
      {tag} x
    </button>
  )
}

export default NoteTagChip
