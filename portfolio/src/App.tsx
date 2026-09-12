import { useEffect, useRef, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import profilePhoto from './IMG-20240605-WA0051.jpg'
import './App.css'

/* ── Données ──────────────────────────────────────────────── */

type Case = {
  title: string
  description: string
  meta: { key: string; value: string }[]
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
    description:
      'Application Flutter reliant clients et livreurs : authentification, géolocalisation temps réel et messagerie intégrée.',
    meta: [
      { key: 'Rôle', value: 'Fondateur & CEO' },
      { key: 'Stack', value: 'Flutter · Supabase' },
      { key: 'Temps réel', value: 'Géoloc · Chat' },
      { key: 'Statut', value: 'En ligne' },
    ],
    link: 'https://yocliver.com',
  },
  {
    title: 'ERP / CRM',
    description:
      "Système de gestion interne mis en place durant mon stage : suivi des flux, gestion client et tableaux de bord.",
    meta: [
      { key: 'Rôle', value: 'Développeur' },
      { key: 'Stack', value: 'React · Node.js' },
      { key: 'Contexte', value: 'Stage' },
      { key: 'Statut', value: 'Livré' },
    ],
  },
  {
    title: 'Kira Assistances',
    description:
      "Assistant personnel propulsé par l'IA : compréhension du langage naturel et automatisation des tâches du quotidien.",
    meta: [
      { key: 'Rôle', value: 'Conception & dev' },
      { key: 'Stack', value: 'Python · NLP' },
      { key: 'Domaine', value: 'Assistant IA' },
      { key: 'Statut', value: 'En cours' },
    ],
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
      <div className="atmos" aria-hidden="true">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
        <div className="blob blob-d" />
      </div>
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

/** La nav s'assombrit en quittant la bande claire d'ouverture. */
function Nav() {
  const [onLight, setOnLight] = useState(true)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const open = document.getElementById('open')
      const limit = open ? open.offsetHeight - 70 : window.innerHeight
      setOnLight(window.scrollY < limit)
      setStuck(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav className={`nav${onLight ? ' on-light' : ''}${stuck && !onLight ? ' is-stuck' : ''}`}>
      <a href="#open" className="nav-logo">
        <span className="dot" />
        <span>Skwiz</span>
      </a>
      <ul className="nav-links">
        <li><a href="#work">projets</a></li>
        <li><a href="#stack">stack</a></li>
        <li><a href="#services">services</a></li>
        <li><a href="#contact">contact</a></li>
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
    <nav className={`pager${active === 'open' ? ' on-light' : ''}`} aria-label="Sections">
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

/* ── 01 · Ouverture ───────────────────────────────────────── */

function Open() {
  return (
    <section className="open" id="open">
      <span className="ghost open-ghost" aria-hidden="true">portfolio</span>

      <div className="open-photo">
        <img src={profilePhoto} alt="Portrait d'OKOUMASSOU Kodjo K." />
      </div>

      <div className="open-inner">
        <p className="open-eyebrow">Kodjo Katchékpèlè</p>
        <h1 className="open-name">
          <span>Okoumassou<em className="dot">.</em></span>
        </h1>

        <div className="open-foot">
          <div className="open-social">
            <a href={profile.github} target="_blank" rel="noreferrer">↳ GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">↳ LinkedIn</a>
            <a href={`mailto:${profile.email}`}>↳ Email</a>
          </div>
          <p className="open-role">
            <span>Étudiant IA &amp; Big Data</span>
            <span>Développeur Flutter</span>
          </p>
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
    <section className="band band-pad" id="intro">
      <div className={cls} ref={ref}>
        <Marker n="01" label="intro" />
        <div className="tagged">
          <p className="tagged-label">Ce que je cherche à faire</p>
          <h2 className="intro-statement">
            Je construis des <em>modèles qui prédisent</em> et des{' '}
            <em>applications qu'on utilise vraiment</em>.
          </h2>
        </div>
        <span className="rule" aria-hidden="true" />

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
  return (
    <section className="band" id="work">
      <div className="band-pad" style={{ paddingBottom: 0 }}>
        <Marker n="02" label="projets" />
      </div>
      {cases.map((item, i) => (
        <CaseRow key={item.title} item={item} index={i} />
      ))}
    </section>
  )
}

function CaseRow({ item, index }: { item: Case; index: number }) {
  const { ref, cls } = useReveal<HTMLDivElement>()
  const Tag = item.link ? 'a' : 'div'

  return (
    <Tag
      className={`case ${cls}`}
      ref={ref as never}
      {...(item.link ? { href: item.link, target: '_blank', rel: 'noreferrer' } : {})}
    >
      <div className="case-num" aria-hidden="true">{pad2(index + 1)}</div>

      <div>
        <h3 className="case-name">
          {item.title}<span className="dot">.</span>
        </h3>
        <p className="case-desc">{item.description}</p>
        <span className={`case-go${item.link ? '' : ' is-idle'}`}>
          {item.link ? 'Visiter le site' : 'Étude de cas à venir'}
          <span aria-hidden="true">{item.link ? '↗' : '···'}</span>
        </span>
      </div>

      <ul className="case-meta">
        {item.meta.map((row, i) => (
          <li key={row.key}>
            <span className="case-meta-idx">{pad2(i + 1)}</span>
            <span className="case-meta-key">{row.key}</span>
            <span className="case-meta-val">{row.value}</span>
          </li>
        ))}
      </ul>
    </Tag>
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
    <section className="band" id="services">
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
      <div className="foot-word">okoumassou<span className="dot">.</span></div>
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
