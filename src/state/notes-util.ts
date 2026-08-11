import Note from "./model/note"
import World from "./model/world"

export function normalizeNoteTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function normalizeNoteTags(tags: string[]): string[] {
  return [...new Set(tags.map(normalizeNoteTag).filter(Boolean))]
}

export function normalizeNote(note: Note): Note {
  return {
    ...note,
    tags: normalizeNoteTags(note.tags),
  }
}

export function mergeWorldNoteTags(existingTags: string[], incomingTags: string[]): string[] {
  const normalizedExistingTags = existingTags
    .map(normalizeNoteTag)
    .filter(Boolean)
  const mergedTags = new Set<string>(normalizedExistingTags)

  incomingTags.forEach(tag => {
    const normalizedTag = normalizeNoteTag(tag)
    if (normalizedTag) {
      mergedTags.add(normalizedTag)
    }
  })

  return [...mergedTags].sort((firstTag, secondTag) => firstTag.localeCompare(secondTag))
}

export function getNewNote(world: World): Note {
  const noteId = crypto.randomUUID()
  let newTitle = 'New Note'
  let counter = 1
  while (world.notes.some(note => note.title === `${newTitle} ${counter}`)) {
    counter++
  }
  return {
    id: noteId,
    title: `${newTitle} ${counter}`,
    tags: [],
    content: '',
  }
}

export function getWorldNoteTags(world: World): string[] {
  return [...world.noteTags].sort((firstTag, secondTag) => firstTag.localeCompare(secondTag))
}