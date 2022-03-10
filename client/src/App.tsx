import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import NotesPage from './pages/Notes'
import QuizzesPage from './pages/Quizzes'

function App () {
  return (
    <Routes>
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
    </Routes>
  )
}

export default Layout(App)
