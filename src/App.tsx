import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TripPage from './pages/TripPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter basename="/adventure-time">
      <Routes>
        <Route path="/:id" element={<TripPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
