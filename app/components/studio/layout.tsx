import React from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function assetSrc(src: string) {
  return src.startsWith('./') ? src.slice(2) : src
}

interface ChapterProps {
  children: React.ReactNode
  className?: string
}

export function Chapter({ children, className }: ChapterProps) {
  return <div className={cn('dossier-pad', className)}>{children}</div>
}

interface ChapterHeaderProps {
  kicker: string
  title: string
  lede?: string
  action?: React.ReactNode
}

export function ChapterHeader({ kicker, title, lede, action }: ChapterHeaderProps) {
  return (
    <header className="mb-8 grid gap-4 sm:mb-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-6">
      <div className="min-w-0">
        <p className="dossier-kicker">{kicker}</p>
        <h2 className="max-w-4xl text-balance font-display text-[clamp(2rem,3.2vw,3.15rem)] font-medium leading-[1.08] tracking-tight text-ink">
          {title}
        </h2>
        {lede ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">{lede}</p>
        ) : null}
      </div>
      {action ? <div className="min-w-0">{action}</div> : null}
    </header>
  )
}

interface ProjectPreviewProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

export function ProjectPreview({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 40vw',
  priority = false,
  className,
  imageClassName,
}: ProjectPreviewProps) {
  return (
    <div className={cn('relative aspect-[2/1] w-full overflow-hidden bg-[#e8eef2]', className)}>
      <Image
        src={assetSrc(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn('object-contain object-center', imageClassName)}
      />
    </div>
  )
}

interface TechTileProps {
  name: string
  color: string
  icon: IconType
  favorite?: boolean
}

export function TechTile({ name, color, icon: Icon, favorite = false }: TechTileProps) {
  return (
    <div className="group relative flex min-h-[92px] flex-col items-center justify-center gap-2 border border-[color:var(--rule)] bg-white px-2 py-3 text-center transition-[border-color,box-shadow] duration-200 hover:border-signal/40 hover:shadow-[0_10px_28px_-18px_rgba(13,110,86,0.45)]">
      {favorite ? (
        <Heart
          className="absolute right-2 top-2 h-3.5 w-3.5 fill-rose-500 text-rose-500"
          aria-hidden
        />
      ) : null}
      <Icon
        className="h-7 w-7 shrink-0 transition-transform duration-300 motion-safe:group-hover:scale-110"
        style={{ color }}
        aria-hidden
      />
      <span className="line-clamp-2 w-full text-[11px] font-medium leading-tight text-ink-soft">
        {name}
      </span>
      {favorite ? <span className="sr-only">Favourite</span> : null}
    </div>
  )
}
