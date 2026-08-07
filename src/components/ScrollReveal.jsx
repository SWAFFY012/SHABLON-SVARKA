import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

export function ScrollReveal({ children, className = '', delay = 0, amount = .2, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount, once })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 28 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ delay, duration: reduced ? 0 : .55, ease: [.22, 1, .36, 1] }}
    >
      {children}
    </motion.div>
  )
}
