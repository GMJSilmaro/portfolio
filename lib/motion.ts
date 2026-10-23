import type { Transition, Variants } from 'framer-motion'

/** Shared easing — calm dossier polish, not flashy marketing bounce */
export const dossierEase = [0.22, 1, 0.36, 1] as const

export const dossierTransition: Transition = {
  duration: 0.55,
  ease: dossierEase,
}

export const coverContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
}

export const coverItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: dossierTransition,
  },
}

export const coverImageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: dossierEase },
  },
}

export const chapterVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: dossierEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: dossierEase },
  },
}
