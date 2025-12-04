import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [copied, setCopied] = useState(false)

  // Reset scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleContactClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    const email = 'vishnus.connect@gmail.com'
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <>
      <FixedContents />
      <nav>
        <Link to="/">Home</Link> | <Link to="/works">Works</Link> |{' '}
        <button 
          className="contact-me-btn" 
          onClick={handleContactClick}
          aria-label="Copy email to clipboard"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'copied' : 'contact'}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? 'Email Copied!' : 'Contact Me'}
            </motion.span>
          </AnimatePresence>
        </button>
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
