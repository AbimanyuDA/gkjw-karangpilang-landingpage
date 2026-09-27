import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import type { GalleryItem } from '../../types/content'
import { SectionHeading } from '../ui/SectionHeading'
import './gallery.css'

interface GalleryProps {
  items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [current, setCurrent] = useState<number | null>(null)

  const open = (index: number) => {
    setCurrent(index)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  const step = useCallback(
    (delta: number) => setCurrent((index) => (index === null ? null : (index + delta + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    const onClose = () => setCurrent(null)
    dialog.addEventListener('keydown', onKey)
    dialog.addEventListener('close', onClose)
    return () => {
      dialog.removeEventListener('keydown', onKey)
      dialog.removeEventListener('close', onClose)
    }
  }, [step])

  const active = current === null ? null : items[current]

  return (
    <section id="galeri" className="section section--tight-top" aria-labelledby="galeri-title">
      <div className="container">
        <SectionHeading
          id="galeri-title"
          eyebrow="Galeri Foto"
          title="Potret Kebersamaan Jemaat"
          lead="Momen-momen sukacita, kekhidmatan ibadah, dan pelayanan kasih di tengah warga jemaat."
        />
      </div>

      <ul role="list" className="gallery-strip">
        {items.map((item, index) => (
          <li key={item.id} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
            <button type="button" className="gallery-thumb" onClick={() => open(index)}>
              <img src={item.image} alt={item.caption} width="720" height="540" loading="lazy" />
              <span className="gallery-thumb__caption">{item.caption}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Foto galeri"
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        {active ? (
          <figure className="lightbox__figure">
            <img src={active.image} alt={active.caption} width="720" height="540" />
            <figcaption>
              {active.caption}
              <span>
                {(current ?? 0) + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        ) : null}
        <button type="button" className="lightbox__btn lightbox__close" onClick={close}>
          <X size={22} aria-hidden="true" />
          <span className="visually-hidden">Tutup</span>
        </button>
        <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)}>
          <ChevronLeft size={26} aria-hidden="true" />
          <span className="visually-hidden">Foto sebelumnya</span>
        </button>
        <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)}>
          <ChevronRight size={26} aria-hidden="true" />
          <span className="visually-hidden">Foto berikutnya</span>
        </button>
      </dialog>
    </section>
  )
}
