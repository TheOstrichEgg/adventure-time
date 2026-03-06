import { HashRouter, Routes, Route } from 'react-router-dom'
import TripPage from './pages/TripPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:id" element={<TripPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
