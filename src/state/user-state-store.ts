import { create } from 'zustand'
import UserState from './model/user-state'
import World from './model/world'

const createInitialUserState = (): UserState => ({
  world: null,
})

interface UserStateStore extends UserState {
  reset: () => void 
  setWorld: (world: World | null) => void
  clearWorld: () => void
}

const useUserStateStore = create<UserStateStore>((set, get) => ({
  ...createInitialUserState(),

  reset: () => set(createInitialUserState()),

  setWorld: world => set({ world }),

  clearWorld: () => set({ world: null }),
}))

export default useUserStateStore