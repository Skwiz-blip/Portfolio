import { useEffect, useRef, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import profilePhoto from './IMG-20240605-WA0051.jpg'
import './App.css'
import BlobBackground from './BlobBackground'

/* ── Données ──────────────────────────────────────────────── */

type Case = {
  title: string
  role: string
  status: string
  description: string
  points?: string[]
  tags: string[]
  tone: 'dark' | 'light'
  link?: string
}

type IndexColumn = {
  category: string
  items: { name: string; level: number }[]
}

type Service = {
  icon: string
  title: string
  description: string
}

const profile = {
  name: 'OKOUMASSOU Kodjo Katchékpèlè',
  title: 'Étudiant Licence 3 — IA & Big Data | Développement mobile',
  phone: '+228 79 46 19 31',
  email: 'okoumassoukodjo@gmail.com',
  github: 'https://github.com/Skwiz-blip',
  githubUser: 'Skwiz-blip',
  linkedin: 'https://www.linkedin.com/in/louis-okoumassou-33a751367',
  cv: '/CV-OKOUMASSOU-Kodjo.pdf',
}

const specs = [
  { key: 'Niveau', value: 'Licence 3' },
  { key: 'Spécialité', value: 'IA & Big Data' },
  { key: 'Mobile', value: 'Flutter · Dart' },
  { key: 'Fondateur', value: 'Cliver' },
]

const figures = [
  { num: '6', sup: '+', label: 'Projets réalisés' },
  { num: 'L3', sup: '', label: "Niveau d'études" },
  { num: '01', sup: '', label: 'Startup fondée' },
  { num: '510', sup: '', label: 'Contributions 2025' },
]

const cases: Case[] = [
  {
    title: 'Cliver',
    role: 'Fondateur & CEO',
    status: 'En ligne',
    description:
      "Plateforme de livraison qui met en relation directe clients et livreurs. J'ai porté le produit de l'idée à la mise en ligne : conception, développement de l'application et suivi technique.",
    points: [
      'Authentification et gestion des comptes',
      'Géolocalisation des livreurs en temps réel',
      'Messagerie intégrée client ↔ livreur',
    ],
    tags: ['Flutter', 'Dart', 'Supabase'],
    tone: 'dark',
    link: 'https://yocliver.com',
  },
  {
    title: 'ERP / CRM',
    role: 'Développeur — stage',
    status: 'Livré',
    description:
      "Système de gestion interne mis en place durant mon stage. L'outil centralise le suivi des flux et la relation client, jusque-là éclatés dans plusieurs fichiers.",
    points: [
      'Suivi des flux internes et des stocks',
      'Fiches client et historique des échanges',
      'Tableaux de bord de synthèse',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    tone: 'light',
  },
  {
    title: 'Kira Assistances',
    role: 'Conception & développement',
    status: 'En cours',
    description:
      "Assistant personnel propulsé par l'IA. Le projet explore la compréhension du langage naturel appliquée à l'automatisation des tâches quotidiennes.",
    points: [
      'Compréhension des demandes en langage naturel',
      'Automatisation de tâches récurrentes',
      'Modèles entraînés sur données personnelles',
    ],
    tags: ['Python', 'NLP', 'Machine Learning'],
    tone: 'dark',
  },
  {
    title: 'Nayjel',
    role: 'Site client — vidéaste',
    status: 'En ligne',
    description:
      "Portfolio d'un vidéaste basé à Lomé : clips, publicité, documentaire, mariage et prises de vue par drone. Galerie de réalisations, présentation du processus et prise de contact.",
    tags: ['Portfolio', 'Vidéo', 'Vercel'],
    tone: 'light',
    link: 'https://nayjel.vercel.app',
  },
  {
    title: 'Carverse',
    role: 'Site client — automobile',
    status: 'En ligne',
    description:
      "Concessionnaire automobile avec showroom 3D interactif : les véhicules se font pivoter et explorer directement dans la page. Services après-vente, financement et livraison.",
    tags: ['3D interactif', 'Showroom', 'Vercel'],
    tone: 'dark',
    link: 'https://carverse-zeta.vercel.app',
  },
  {
    title: 'Mia Darling',
    role: 'Site client — communauté',
    status: 'En ligne',
    description:
      "Plateforme de témoignages anonymes et d'entraide. Publication sans identité, fil de confessions et compteurs d'activité de la communauté.",
    tags: ['Communauté', 'Publication anonyme'],
    tone: 'light',
    link: 'https://miadarlingsp.com',
  },
  {
    title: 'Coolskin',
    role: 'Site client',
    status: 'En ligne',
    description:
      "Site vitrine réalisé et mis en ligne pour un client : conception de l'interface, intégration responsive et déploiement.",
    tags: ['Vitrine', 'Responsive', 'Vercel'],
    tone: 'dark',
    link: 'https://coolskin.vercel.app',
  },
  {
    title: 'Aprocom',
    role: 'Site client — APROCOM-Togo',
    status: 'En ligne',
    description:
      "Site institutionnel réalisé pour APROCOM-Togo : conception de l'interface, intégration responsive et mise en ligne.",
    tags: ['Institutionnel', 'Responsive', 'Vercel'],
    tone: 'light',
    link: 'https://aprocom.vercel.app',
  },
]

const indexColumns: IndexColumn[] = [
  {
    category: 'Langages',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Dart', level: 80 },
      { name: 'SQL', level: 80 },
      { name: 'HTML / CSS', level: 80 },
      { name: 'React', level: 50 },
    ],
  },
  {
    category: 'Outils & Frameworks',
    items: [
      { name: 'VS Code', level: 100 },
      { name: 'Flutter', level: 85 },
      { name: 'Git', level: 85 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'TensorFlow', level: 75 },
    ],
  },
  {
    category: 'Big Data',
    items: [
      { name: 'Hadoop', level: 50 },
      { name: 'Spark', level: 50 },
      { name: 'Kafka', level: 50 },
    ],
  },
  {
    category: 'Bases de données',
    items: [
      { name: 'PostgreSQL', level: 50 },
      { name: 'Firebase', level: 50 },
      { name: 'Supabase', level: 50 },
    ],
  },
]

const services: Service[] = [
  {
    icon: 'neurology',
    title: 'Intelligence Artificielle',
    description: "Modèles de prédiction, analyse de données et solutions d'IA appliquées à vos projets.",
  },
  {
    icon: 'smartphone',
    title: 'Développement Mobile',
    description: 'Applications Flutter natives et performantes, avec backend temps réel.',
  },
  {
    icon: 'monitoring',
    title: 'Data Science',
    description: 'Exploration, visualisation et analyse de jeux de données complexes.',
  },
  {
    icon: 'database',
    title: 'Backend & APIs',
    description: 'Architecture backend robuste avec Supabase et bases de données modernes.',
  },
]

/* ── Outils ───────────────────────────────────────────────── */

/** Révèle un bloc à son entrée dans le viewport, une seule fois. */
function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, cls: `reveal${shown ? ' is-in' : ''}` }
}

/** Bandes sur fond clair : la pagination doit s'y inverser. */
const lightSections = new Set(['open', 'intro', 'services'])

const sections = [
  { id: 'open', label: 'ouverture' },
  { id: 'intro', label: 'intro' },
  { id: 'work', label: 'projets' },
  { id: 'stack', label: 'stack' },
  { id: 'services', label: 'services' },
  { id: 'contact', label: 'contact' },
]

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Marqueur de section : pastille pleine + libellé. */
function Marker({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <p className="marker">
      <span className={`marker-chip${accent ? ' is-accent' : ''}`}>{n}</span>
      / {label}
    </p>
  )
}

/* ── Application ──────────────────────────────────────────── */

function App() {
  return (
    <div className="shell">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Pager />

      <main className="main">
        <Open />
        <SpecBar />
        <Statement />
        <Figures />
        <Work />
        <Index />
        <Services />
        <Contact />
      </main>

      <Foot />
    </div>
  )
}

/** Au sommet : texte sombre sur la bande claire, barre transparente.
 *  Dès qu'on défile : barre floutée sombre et texte clair — lisible
 *  aussi bien sur la photo du header que sur les bandes claires. */
function Nav() {
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${atTop ? ' on-light' : ' is-stuck'}`}>
      <a href="#open" className="nav-logo">
        <span className="dot" />
        <span>Skwiz</span>
      </a>
      <ul className="nav-links">
        {sections.slice(2).map((section, i) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>
              <i aria-hidden="true">{pad2(i + 1)}</i>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Points de progression : suit la section visible. */
function Pager() {
  const [active, setActive] = useState('open')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`pager${lightSections.has(active) ? ' on-light' : ''}`}
      aria-label="Sections"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={active === section.id ? 'is-active' : undefined}
          aria-current={active === section.id ? 'true' : undefined}
        >
          <span>{section.label}</span>
          <i aria-hidden="true" />
        </a>
      ))}
    </nav>
  )
}

/** Champ dépoli : réservé à une seule bande, pas au site entier. */
function Atmos() {
  return (
    <div className="atmos" aria-hidden="true">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="blob blob-d" />
      <div className="blob blob-e" />
    </div>
  )
}

/* ── 01 · Ouverture ───────────────────────────────────────── */

function Open() {
  return (
    <section className="open" id="open">
      <BlobBackground />
      {/* bande grise du bas, sur laquelle la photo se poursuit */}
      <span className="open-band" aria-hidden="true" />

      <div className="open-media">
        <img src={profilePhoto} alt="Portrait d'OKOUMASSOU Kodjo K." />
      </div>

      {/* légende technique en deux colonnes serrées */}
      <div className="open-caption">
        <span className="open-caption-label">Skwiz</span>
        <p>
          Étudiant en Licence 3 Intelligence Artificielle &amp; Big Data.
          Fondateur et CEO de Cliver.
        </p>
        <p>
          Modèles de prédiction, pipelines de données et applications
          mobiles menées jusqu'à la mise en ligne.
        </p>
      </div>

      {/* texte vertical, dans la bande claire à droite de la photo */}
      <span className="open-edge" aria-hidden="true">
        Okoumassou Kodjo K.
        <i>IA &amp; Big Data</i>
        <i>Portfolio 2026</i>
      </span>

      <h1 className="open-word">
        <span>skwiz<em>.</em></span>
      </h1>

      <div className="open-foot">
        <span className="open-index" aria-hidden="true">001</span>
        <a className="open-next" href="#intro" aria-label="Descendre">
          <span aria-hidden="true">→</span>
        </a>
        <div className="open-social">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  )
}

/* ── 02 · Barre de specs ──────────────────────────────────── */

function SpecBar() {
  return (
    <div className="specs">
      {specs.map((spec) => (
        <div className="spec" key={spec.key}>
          <span className="spec-key">{spec.key}</span>
          <span className="spec-val">{spec.value}</span>
        </div>
      ))}
      <a className="spec-cta" href={profile.cv} download>
        Télécharger le CV <span aria-hidden="true">↓</span>
      </a>
    </div>
  )
}

/* ── 03 · Déclaration ─────────────────────────────────────── */

function Statement() {
  const { ref, cls } = useReveal<HTMLDivElement>()

  return (
    <section className="band band-pad band-light" id="intro">
      <div className={cls} ref={ref}>
        <Marker n="01" label="intro" />
        <div className="tagged">
          <p className="tagged-label">Ce que je cherche à faire</p>
          <h2 className="intro-statement">
            <span className="star" aria-hidden="true">✳</span> Je construis des{' '}
            <span className="inline-pill" aria-hidden="true" /> modèles qui prédisent{' '}
            <span className="said-soft">et des applications que l'on utilise</span>{' '}
            <span className="inline-pill" aria-hidden="true" /> vraiment.
          </h2>
        </div>

        <div className="intro-foot">
          <p className="intro-note">
            Développeur en début de carrière, en Licence 3 Intelligence Artificielle &amp;
            Big Data. Motivé et rigoureux, j'aime concevoir des applications utiles, explorer
            de nouvelles technologies et renforcer continuellement mes compétences. À l'aise
            en équipe comme en autonomie.
          </p>
          <a href="#work" className="btn btn-line">
            Voir les projets <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── 04 · Chiffres ────────────────────────────────────────── */

function Figures() {
  return (
    <div className="figures">
      {figures.map((figure) => (
        <div className="figure" key={figure.label}>
          <div className="figure-num">
            {figure.num}
            {figure.sup && <sup>{figure.sup}</sup>}
          </div>
          <div className="figure-label">{figure.label}</div>
        </div>
      ))}
    </div>
  )
}

/* ── 05 · Projets ─────────────────────────────────────────── */

function Work() {
  const { ref, cls } = useReveal<HTMLDivElement>(0.08)

  return (
    <section className="band has-atmos" id="work">
      <Atmos />
      <div className="band-pad">
        <div className="work-head">
          <div>
            <Marker n="02" label="projets" />
            <h2 className="work-title">
              Ce que j'ai <span className="glyph" aria-hidden="true">⊗</span> construit
            </h2>
          </div>
          <div className="work-aside">
            <p>Trois projets menés de bout en bout, du prototype à la mise en ligne.</p>
            <a className="btn btn-line" href={profile.github} target="_blank" rel="noreferrer">
              Tout le code <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className={`cards ${cls}`} ref={ref}>
          {cases.map((item, i) => (
            <CaseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ item, index }: { item: Case; index: number }) {
  return (
    <article className="card-wrap">
      <div className={`card is-${item.tone}`}>
        <div className="card-top">
          <span className="pill">{item.status}</span>
          <span className="card-num">{pad2(index + 1)}</span>
        </div>

        <h3 className="card-name">{item.title}</h3>
        <p className="card-role">{item.role}</p>
        <p className="card-desc">{item.description}</p>

        {item.points && (
          <ul className="card-points">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        <div className="card-tags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      {item.link ? (
        <a
          className="card-go"
          href={item.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ouvrir ${item.title}`}
        >
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="card-go is-idle" aria-hidden="true">···</span>
      )}
    </article>
  )
}

/* ── 06 · Index technique ─────────────────────────────────── */

function Index() {
  const { ref, cls } = useReveal<HTMLDivElement>()

  return (
    <section className="band" id="stack">
      <div className="band-pad" style={{ paddingBottom: 0 }}>
        <span className="ghost stack-ghost" aria-hidden="true">stack</span>
        <Marker n="03" label="stack" />
      </div>

      <div className={`index ${cls}`} ref={ref}>
        {indexColumns.map((column) => (
          <div className="index-col" key={column.category}>
            <h3>{column.category}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item.name}>
                  {item.name}
                  <Dots level={item.level} name={item.name} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="stack-note">
        <p className="microtext">
          Niveaux évalués sur cinq paliers — usage courant, projets personnels et
          travaux académiques. Le détail par projet figure dans la section précédente.
        </p>
      </div>

      <GitHubActivity />
    </section>
  )
}

/** Niveau rendu en 5 points plutôt qu'en barre de progression. */
function Dots({ level, name }: { level: number; name: string }) {
  const filled = Math.round(level / 20)
  return (
    <span className="dots" role="img" aria-label={`${name} : ${level} %`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={i < filled ? 'on' : undefined} />
      ))}
    </span>
  )
}

function GitHubActivity() {
  return (
    <div className="gh">
      <div className="gh-head">
        <Marker n="03b" label="activité github" />
        <a className="gh-link" href={profile.github} target="_blank" rel="noreferrer">
          @{profile.githubUser} ↗
        </a>
      </div>
      <GitHubCalendar
        username={profile.githubUser}
        colorScheme="dark"
        theme={{
          light: ['#ececea', '#ffd0b3', '#ff9a5c', '#ff5a00', '#b83d00'],
          dark: ['#1a1a1a', '#4a1c00', '#8a3200', '#d94a00', '#ff7a2e'],
        }}
        blockSize={16}
        blockMargin={5}
        fontSize={12}
        labels={{
          totalCount: '{{count}} contributions en {{year}}',
          legend: { less: 'Moins', more: 'Plus' },
          months: [
            'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
            'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
          ],
          weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        }}
      />
    </div>
  )
}

/* ── 07 · Services ────────────────────────────────────────── */

function Services() {
  return (
    <section className="band band-light" id="services">
      <div className="band-pad" style={{ paddingBottom: 0 }}>
        <Marker n="04" label="services" />
      </div>
      {services.map((service, i) => (
        <article className="svc-row" key={service.title}>
          <span className="svc-num">{pad2(i + 1)}</span>
          <h3 className="svc-name">{service.title}</h3>
          <p className="svc-desc">{service.description}</p>
          <span className="material-symbols-outlined svc-icon" aria-hidden="true">
            {service.icon}
          </span>
        </article>
      ))}
    </section>
  )
}

/* ── 08 · Contact ─────────────────────────────────────────── */

function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    const subject = `Contact depuis le portfolio — ${name}`
    const body = `Nom : ${name}\nEmail : ${email}\n\n${message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-left">
        <Marker n="05" label="contact" />
        <h2 className="contact-title">
          Travaillons<br />ensemble<span className="dot">.</span>
        </h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" type="text" placeholder="Votre nom" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="vous@exemple.com" required />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Parlez-moi de votre projet…" required />
          </div>
          <button type="submit" className="btn btn-solid">
            Envoyer <span className="arrow" aria-hidden="true">↗</span>
          </button>
        </form>
      </div>

      <div className="contact-right">
        <div>
          <Marker n="→" label="disponible" accent />
          <p className="contact-claim">
            Un projet en IA, une application mobile ou des données à analyser ?
          </p>
        </div>

        <div className="contact-list">
          <a className="contact-row" href={`mailto:${profile.email}`}>
            <span className="material-symbols-outlined" aria-hidden="true">mail</span>
            {profile.email}
          </a>
          <a className="contact-row" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
            <span className="material-symbols-outlined" aria-hidden="true">call</span>
            {profile.phone}
          </a>
          <a className="contact-row" href={profile.github} target="_blank" rel="noreferrer">
            <span className="material-symbols-outlined" aria-hidden="true">code</span>
            github.com/{profile.githubUser}
          </a>
          <a className="contact-row" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="material-symbols-outlined" aria-hidden="true">link</span>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Pied de page ─────────────────────────────────────────── */

function Foot() {
  return (
    <footer className="foot">
      <div className="foot-word">skwiz<span className="dot">.</span></div>
      <div className="foot-bar">
        <span>© 2026 {profile.name}</span>
        <ul className="foot-links">
          <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
          <li><a href={`mailto:${profile.email}`}>Email</a></li>
        </ul>
        <span>{profile.title}</span>
      </div>
    </footer>
  )
}

export default App
