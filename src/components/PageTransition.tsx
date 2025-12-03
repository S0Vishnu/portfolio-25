import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import '../styles/PageTransition.css'

type PageTransitionProps = {
  children: ReactNode
}

const bendExitEase: [number, number, number, number] = [0.8, 0, 0.2, 1]
const contentEnterEase: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contentExitEase: [number, number, number, number] = [0.65, 0, 0.35, 1]

const overlayVariants = {
  initial: {
    y: '110%',
    skewY: -8,
    scaleY: 1.08,
    borderTopLeftRadius: '55% 20%',
    borderTopRightRadius: '55% 20%',
  },
  animate: {
    y: '110%',
    skewY: -6,
    transition: {
      duration: 0.01,
    },
  },
  exit: {
    y: '-130%',
    skewY: 6,
    scaleY: 0.92,
    borderBottomLeftRadius: '55% 22%',
    borderBottomRightRadius: '55% 22%',
    transition: {
      duration: 1.05,
      ease: bendExitEase,
    },
  },
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 42,
    filter: 'blur(18px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: contentEnterEase,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -36,
    filter: 'blur(12px)',
    transition: {
      duration: 0.45,
      ease: contentExitEase,
    },
  },
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <section className="page-transition">
      <motion.div
        className="page-transition-overlay"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-hidden="true"
      />
      <motion.main
        className="page-transition-content"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </section>
  )
}

export default PageTransition

