import { useEffect, useId, useRef } from 'react'

/* ══════════════════════════════════════════════════════════════
   BlobBackground
   Calque décoratif : cinq masses orange fusionnées par un filtre
   gooey, qui suivent le curseur avec une inertie propre à chacune
   et se repoussent au clic.

   Autonome : aucune prop, aucun style externe, aucune dépendance.
   Ne capte aucun événement (pointer-events: none) — les écoutes se
   font sur window et les coordonnées sont ramenées dans le repère
   du conteneur.
   ══════════════════════════════════════════════════════════════ */

/* Mode de fusion des masses entre elles.
   Le filtre gooey posé sur le groupe en fait un groupe isolé : ce
   « screen » agit donc sur le recouvrement des blobs (ils
   s'éclaircissent là où ils se croisent), pas sur le fond de la
   section, sur lequel le groupe se compose normalement. */
const BLEND_MODE = 'screen'

/* Opacité du groupe. Sur un fond clair, au-delà de ~0.6 les masses
   mangent le texte du hero. */
const GROUP_OPACITY = 0.55

/* Chaque masse a sa propre inertie (lerp) et sa propre orbite, pour
   qu'elles ne se superposent jamais exactement et restent vivantes
   même curseur immobile. */
const BLOBS = [
  { size: 420, color: '#ff4500', lerp: 0.030, radius: 90, speed: 0.00021, phase: 0.0 },
  { size: 340, color: '#ff6a00', lerp: 0.042, radius: 130, speed: -0.00017, phase: 1.3 },
  { size: 300, color: '#cc3000', lerp: 0.055, radius: 70, speed: 0.00025, phase: 2.6 },
  { size: 260, color: '#ff6a00', lerp: 0.068, radius: 150, speed: -0.00013, phase: 3.9 },
  { size: 220, color: '#ff4500', lerp: 0.080, radius: 110, speed: 0.00019, phase: 5.2 },
]

/* Souffle du clic : amortissement par image et puissance de poussée. */
const FRICTION = 0.92
const BURST = 9000

/* Dérive autonome : sans souris, la cible parcourt d'elle-même la
   section. Le curseur ne fait que reprendre la main, et la rend
   après AUTO_IDLE_MS d'immobilité. HANDOVER règle la douceur de la
   bascule — trop haut, le passage curseur ↔ auto se voit. */
const AUTO_IDLE_MS = 2200
const HANDOVER = 0.02

export default function BlobBackground() {
  const hostRef = useRef(null)
  const nodesRef = useRef([])
  const rafRef = useRef(0)

  /* useId peut contenir des « : », illégaux dans une référence CSS url(). */
  const filterId = `blob-goo-${useId().replace(/:/g, '')}`

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    /* Respect du réglage système : on laisse les masses en place. */
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    /* Repère du conteneur, relu seulement au redimensionnement et au
       défilement — pas à chaque image. */
    let rect = host.getBoundingClientRect()
    const measure = () => { rect = host.getBoundingClientRect() }

    /* Cible de départ : le centre, pour que ça vive avant tout
       mouvement de souris. */
    const pointer = { x: rect.width / 2, y: rect.height / 2 }

    /* 0 = dérive autonome, 1 = suivi du curseur. Démarre à 0 pour que
       ça bouge dès le chargement, sans attendre un mouvement. */
    let influence = 0
    let lastMove = -Infinity
    let visible = true

    const state = BLOBS.map(() => ({
      x: pointer.x,
      y: pointer.y,
      vx: 0,
      vy: 0,
    }))

    const onPointerMove = (event) => {
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      lastMove = performance.now()
    }

    /* Clic : chaque masse reçoit une impulsion qui l'écarte du point
       cliqué, d'autant plus forte qu'elle en était proche. Le lerp la
       ramène ensuite vers le curseur — d'où le retour en dérive. */
    const onClick = (event) => {
      const cx = event.clientX - rect.left
      const cy = event.clientY - rect.top

      state.forEach((blob) => {
        const dx = blob.x - cx
        const dy = blob.y - cy
        const distance = Math.hypot(dx, dy) || 1
        const push = BURST / Math.max(distance, 80) / distance
        blob.vx += dx * push
        blob.vy += dy * push
      })
    }

    const frame = (now) => {
      /* Cible autonome : deux fréquences par axe, pour que le trajet
         ne se lise pas comme un aller-retour régulier. */
      const w = rect.width || 1
      const h = rect.height || 1
      const autoX = w * 0.5
        + Math.sin(now * 0.00013) * w * 0.30
        + Math.sin(now * 0.00021 + 1.7) * w * 0.10
      const autoY = h * 0.5
        + Math.cos(now * 0.00017) * h * 0.26
        + Math.cos(now * 0.00029 + 0.9) * h * 0.09

      influence += ((now - lastMove < AUTO_IDLE_MS ? 1 : 0) - influence) * HANDOVER
      const baseX = autoX + (pointer.x - autoX) * influence
      const baseY = autoY + (pointer.y - autoY) * influence

      for (let i = 0; i < state.length; i += 1) {
        const config = BLOBS[i]
        const blob = state[i]
        const node = nodesRef.current[i]
        if (!node) continue

        /* Orbite lente autour de la cible : les masses ne s'empilent
           jamais au même point. */
        const targetX = baseX + Math.cos(now * config.speed + config.phase) * config.radius
        const targetY = baseY + Math.sin(now * config.speed + config.phase) * config.radius

        blob.vx *= FRICTION
        blob.vy *= FRICTION
        blob.x += (targetX - blob.x) * config.lerp + blob.vx
        blob.y += (targetY - blob.y) * config.lerp + blob.vy

        node.style.transform =
          `translate3d(${blob.x - config.size / 2}px, ${blob.y - config.size / 2}px, 0)`
      }

      rafRef.current = window.requestAnimationFrame(frame)
    }

    /* Position initiale posée une fois, même sans animation. */
    state.forEach((blob, i) => {
      const node = nodesRef.current[i]
      if (node) {
        node.style.transform =
          `translate3d(${blob.x - BLOBS[i].size / 2}px, ${blob.y - BLOBS[i].size / 2}px, 0)`
      }
    })

    if (motionQuery.matches) return undefined

    /* L'animation tournant en continu, on la suspend dès que la
       section sort de l'écran : inutile de brûler des images pour un
       calque invisible. */
    const start = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(frame)
    }
    const stop = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { threshold: 0 })
    viewObserver.observe(host)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('click', onClick)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    start()

    return () => {
      stop()
      viewObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Filtre gooey : le flou étale les masses, la matrice raidit
          le canal alpha et recolle les bords — c'est ce seuil qui
          produit la fusion liquide. */}
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        focusable="false"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          filter: `url(#${filterId})`,
          opacity: GROUP_OPACITY,
        }}
      >
        {BLOBS.map((config, i) => (
          <span
            key={config.color + i}
            ref={(node) => { nodesRef.current[i] = node }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: config.size,
              height: config.size,
              borderRadius: '50%',
              background: config.color,
              mixBlendMode: BLEND_MODE,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  )
}
