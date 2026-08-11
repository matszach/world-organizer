import World from "./model/world"

export function getNewWorld(name: string): World {
  return {
    id: crypto.randomUUID(),
    name,
    notes: [],
    noteTags: [],
  }
}