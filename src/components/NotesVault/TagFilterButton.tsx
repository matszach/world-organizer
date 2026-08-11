import './TagFilterButton.scss'

interface TagFilterButtonProps {
  tag: string
  isActive: boolean
  onToggle: (tag: string) => void
}

function TagFilterButton({ tag, isActive, onToggle }: TagFilterButtonProps) {
  return (
    <button
      type="button"
      className={`tag-filter-button${isActive ? ' tag-filter-button--active' : ''}`}
      onClick={() => onToggle(tag)}
    >
      {tag}
    </button>
  )
}

export default TagFilterButton
