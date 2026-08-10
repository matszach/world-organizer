import './App.scss'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HexMapMakerPage from './pages/HexMapMakerPage'
import HomePage from './pages/HomePage'
import NotesVaultPage from './pages/NotesVaultPage'
import useUserStateStore from './state/user-state-store'

function RequireWorld({ children }: { children: ReactNode }) {
  const world = useUserStateStore(state => state.world)
  return world ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/hex-map-maker"
        element={
          <RequireWorld>
            <HexMapMakerPage />
          </RequireWorld>
        }
      />
      <Route
        path="/notes-vault"
        element={
          <RequireWorld>
            <NotesVaultPage />
          </RequireWorld>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
