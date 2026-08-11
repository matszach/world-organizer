import './NoteTagChip.scss'

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
      aria-label={`Remove tag ${tag}`}
    >
      {tag} x
    </button>
  )
}

export default NoteTagChip
