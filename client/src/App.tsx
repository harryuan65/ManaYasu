import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import NotesPage from './pages/NotesPage'
import QuizzesPage from './pages/QuizzesPage'
import HomePage from './pages/HomePage'

function App () {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
    </Routes>
  )
}

export default Layout(App)
