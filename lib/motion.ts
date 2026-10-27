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
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: dossierEase },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.28, ease: dossierEase },
  },
}

export const listContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: dossierEase },
  },
}

export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}

export const modalPanelVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: dossierEase },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.99,
    transition: { duration: 0.2, ease: dossierEase },
  },
}
