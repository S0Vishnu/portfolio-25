import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Works from './pages/Works'
import Project from './pages/Works/Project'
import ChapterPage from './pages/Works/Chapter'
import './styles/App.css'
import Cursor from './components/Cursor'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import FixedContents from './components/FixedContents'

const AnimatedRouter = () => {
  const location = useLocation()

  // Reset scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <FixedContents />
      <nav>
        <Link to="/">Home</Link> | <Link to="/works">Works</Link>
      </nav>
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/works/:project" element={<Project />} />
            <Route path="/works/:project/:chapter" element={<ChapterPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <>
      <Cursor />
      <BrowserRouter>
        <AnimatedRouter />
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
