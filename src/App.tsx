import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import HexMapMakerPage from './pages/HexMapMakerPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hex-map-maker" element={<HexMapMakerPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
