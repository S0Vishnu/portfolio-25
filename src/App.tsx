import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Works from './pages/Works'
import Project from './pages/Works/Project'
import ChapterPage from './pages/Works/Chapter'
import './styles/App.css'
import Cursor from './components/Cursor'

function App() {
  return (
    <>
    <Cursor />
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/works">Works</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:project" element={<Project />} />
        <Route path="/works/:project/:chapter" element={<ChapterPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
