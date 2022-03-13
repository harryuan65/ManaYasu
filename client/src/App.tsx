import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import QuizzesPage from './pages/QuizzesPage';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<NotePage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
    </Routes>
  );
}

export default Layout(App);
