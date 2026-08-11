import { useState } from 'react'
import type Note from '../../state/model/note'
import { normalizeNoteTag } from '../../state/notes-util'
import './NotesWorkspace.scss'

interface NotesWorkspaceProps {
  note: Note | null
  onUpdateNote: (note: Note) => void
}

function NotesWorkspace({ note, onUpdateNote }: NotesWorkspaceProps) {
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (!note) {
      return
    }
    const normalizedTag = normalizeNoteTag(tagInput)
    if (!normalizedTag || note.tags.includes(normalizedTag)) {
      setTagInput('')
      return
    }
    onUpdateNote({
      ...note,
      tags: [...note.tags, normalizedTag],
    })
    setTagInput('')
  }

  const handleRemoveTag = (tag: string) => {
    if (!note) {
      return
    }
    onUpdateNote({
      ...note,
      tags: note.tags.filter(existingTag => existingTag !== tag),
    })
  }

  const handleTagInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleAddTag()
    }
  }

  return (
    <section className="notes-workspace">
      <div className="notes-workspace__header">
        <h3 className="notes-workspace__title">Workspace</h3>
        <p className="notes-workspace__subtitle">Edit a note and manage its tags.</p>
      </div>

      {!note ? (
        <div className="notes-workspace__placeholder">Select a note to begin editing.</div>
      ) : (
        <>
          <label className="notes-workspace__field-label" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            className="notes-workspace__input"
            type="text"
            value={note.title}
            onChange={event => onUpdateNote({ ...note, title: event.target.value })}
          />

          <label className="notes-workspace__field-label" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="notes-workspace__textarea"
            value={note.content}
            onChange={event => onUpdateNote({ ...note, content: event.target.value })}
            placeholder="Write details about your world here..."
          />

          <div className="notes-workspace__tags-header">
            <span className="notes-workspace__field-label">Tags</span>
          </div>
          <div className="notes-workspace__tag-input-row">
            <input
              className="notes-workspace__input"
              type="text"
              value={tagInput}
              onChange={event => setTagInput(event.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder="e.g. npc, city, quest"
            />
            <button
              type="button"
              className="notes-workspace__action-btn"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              Add tag
            </button>
          </div>

          {note.tags.length === 0 ? (
            <div className="notes-workspace__placeholder notes-workspace__placeholder--compact">
              This note has no tags yet.
            </div>
          ) : (
            <div className="notes-workspace__tag-list">
              {note.tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className="notes-workspace__tag-chip"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                >
                  {tag} x
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default NotesWorkspace
