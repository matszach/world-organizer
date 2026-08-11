import { useState } from 'react'
import { APP_TEXT } from '../../content/appText'
import type Note from '../../state/model/note'
import { normalizeNoteTag } from '../../state/notes-util'
import NoteTagChip from './NoteTagChip'
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
        <h3 className="notes-workspace__title">{APP_TEXT.notesVault.workspaceTitle}</h3>
        <p className="notes-workspace__subtitle">{APP_TEXT.notesVault.workspaceSubtitle}</p>
      </div>

      {!note ? (
        <div className="notes-workspace__placeholder">{APP_TEXT.notesVault.selectNote}</div>
      ) : (
        <>
          <label className="notes-workspace__field-label" htmlFor="note-title">
            {APP_TEXT.notesVault.titleLabel}
          </label>
          <input
            id="note-title"
            className="notes-workspace__input"
            type="text"
            value={note.title}
            onChange={event => onUpdateNote({ ...note, title: event.target.value })}
          />

          <label className="notes-workspace__field-label" htmlFor="note-content">
            {APP_TEXT.notesVault.contentLabel}
          </label>
          <textarea
            id="note-content"
            className="notes-workspace__textarea"
            value={note.content}
            onChange={event => onUpdateNote({ ...note, content: event.target.value })}
            placeholder={APP_TEXT.notesVault.contentPlaceholder}
          />

          <div className="notes-workspace__tags-header">
            <span className="notes-workspace__field-label">{APP_TEXT.notesVault.tagsLabel}</span>
          </div>
          <div className="notes-workspace__tag-input-row">
            <input
              className="notes-workspace__input"
              type="text"
              value={tagInput}
              onChange={event => setTagInput(event.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder={APP_TEXT.notesVault.tagPlaceholder}
            />
            <button
              type="button"
              className="notes-workspace__action-btn"
              onClick={handleAddTag}
              disabled={!tagInput.trim()}
            >
              {APP_TEXT.notesVault.addTag}
            </button>
          </div>

          {note.tags.length === 0 ? (
            <div className="notes-workspace__placeholder notes-workspace__placeholder--compact">
              {APP_TEXT.notesVault.noTagsForNote}
            </div>
          ) : (
            <div className="notes-workspace__tag-list">
              {note.tags.map(tag => (
                <NoteTagChip
                  key={tag}
                  tag={tag}
                  onRemove={handleRemoveTag}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default NotesWorkspace
