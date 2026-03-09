import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import profilePhoto from '../IMG-20240605-WA0051.jpg'

type Profile = {
  name: string
  title: string
  phone: string
  email: string
}

type Kpi = {
  label: string
  value: string
}

type Project = {
  title: string
  description: string
  tags: string[]
  progress: number
  details: string
  highlights: string[]
}

type Skills = {
  languages: string[]
  tools: string[]
}

const profile: Profile = {
  name: 'OKOUMASSOU Kodjo Katchékpèlè',
  title: 'Étudiant Licence 3 — IA & Big Data | Développement mobile',
  phone: '+228 79 46 19 31',
  email: 'okoumassoukodjo@gmail.com',
}

const kpis: Kpi[] = [ 
  { label: 'Lignes de données analysées', value: '426k+' },
  { label: 'Flutter • Python • TensorFlow', value: '' },
]

const projects: Project[] = [
  {
    title: 'Analyse & prédiction prix véhicules',
    description:
      'Exploration, feature engineering et modèle de régression sur 426k enregistrements.',
    tags: ['Regression', 'Pandas', 'Scikit-learn'],
    progress: 95,
    details:
      "Projet de data science complet : exploration, nettoyage, feature engineering et entraînement de modèles de régression pour estimer le prix de véhicules sur un dataset volumineux.",
    highlights: [
      'Préparation et analyse exploratoire sur un dataset à grande échelle',
      'Feature engineering et comparaison de modèles de régression',
      'Métriques, validation et itérations pour améliorer la performance',
    ],
  },
  {
    title: 'Cliver (en cours)',
    description:
      'Application Flutter client–livreur — authentification, géolocalisation, messagerie.',
    tags: ['Flutter', 'Realtime', 'Supabase'],
    progress: 70,
    details:
      "Application mobile en cours de développement orientée logistique : comptes utilisateurs, suivi en temps réel et échanges client–livreur. Conçue avec une architecture modulable pour évoluer vers une app production.",
    highlights: [
      'Authentification et gestion de profils',
      'Géolocalisation et suivi temps réel',
      'Messagerie et notifications (prévu)',
    ],
  },
  {
    title: "Détection d'anomalies",
    description: 'Pipeline de détection d’outliers sur données de transactions.',
    tags: ['Anomaly Detection', 'IsolationForest'],
    progress: 60,
    details:
      "Mise en place d'un pipeline de détection d'anomalies afin d’identifier des transactions atypiques. Travail centré sur la préparation des données, la modélisation et l’interprétation des résultats.",
    highlights: [
      'Pré-traitements et normalisation des données',
      'Modèles d’outlier detection (Isolation Forest)',
      'Analyse et interprétation des anomalies détectées',
    ],
  },
]

const skills: Skills & { databases: string[] } = {
  languages: ['Python', 'Dart', 'Java', 'HTML', 'CSS', 'SQL'],
  tools: ['Git', 'Supabase', 'Firebase', 'PostgreSQL', 'VS Code'],
  databases: ['PostgreSQL', 'Firebase', 'Supabase'],
}

const aboutTags = ['Intelligence Artificielle', 'Mobile', 'Big Data', 'Backend']

const navSections = [
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
]

const cvDownloadHref = '/cv.pdf'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, ...options },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return { ref, inView }
}

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash
      if (!hash.startsWith('#project/')) return
      const slug = hash.replace('#project/', '')
      const match = projects.find((p) => slugify(p.title) === slug)
      if (match) setActiveProject(match)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  useEffect(() => {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const stored = window.localStorage.getItem('theme')
    if (stored === 'dark') setIsDark(true)
    else if (stored === 'light') setIsDark(false)
    else setIsDark(prefersDark)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')

    window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleNav = (id: string) => {
    if (activeProject) {
      setActiveProject(null)
      window.location.hash = ''
      setTimeout(() => scrollToSection(id), 0)
      setDrawerOpen(false)
      return
    }
    scrollToSection(id)
    setDrawerOpen(false)
  }

  const openProject = (project: Project) => {
    setActiveProject(project)
    window.location.hash = `project/${slugify(project.title)}`
    setDrawerOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProject = () => {
    setActiveProject(null)
    window.location.hash = ''
  }

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return (
    <div className="app-shell">
      <header className={`app-bar app-bar-elevation ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="app-bar-surface">
          <div className="app-logo">
            <span className="app-logo-primary">OKOUMASSOU Kodjo K.</span>
            <span className="app-logo-secondary">IA & Big Data · Dev mobile</span>
          </div>

          <nav className="app-nav" aria-label="Navigation principale">
            <div className="app-nav-links">
              {navSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="app-nav-link"
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="app-nav-cta app-nav-cta-desktop">
              <button
                type="button"
                className="icon-button theme-toggle"
                onClick={toggleTheme}
                aria-label={isDark ? 'Passer en thème clair' : 'Passer en thème sombre'}
              >
                <span className="material-symbols-outlined">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <a
                href={cvDownloadHref}
                className="btn btn-outlined btn-icon-leading"
                download
              >
                <span className="material-symbols-outlined">download</span>
                <span>Télécharger CV</span>
              </a>
            </div>

            <button
              type="button"
              className="app-nav-menu-toggle"
              aria-label="Ouvrir le menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </nav>
        </div>
      </header>

      {drawerOpen && (
        <div
          className="nav-drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="nav-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-drawer-header">
              <span className="nav-drawer-title">Navigation</span>
              <button
                type="button"
                className="nav-drawer-close"
                aria-label="Fermer le menu"
                onClick={() => setDrawerOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="nav-drawer-links">
              {navSections.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="nav-drawer-link"
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="nav-drawer-footer">
              <button
                type="button"
                className="btn btn-outlined btn-icon-leading nav-theme-toggle"
                onClick={toggleTheme}
              >
                <span className="material-symbols-outlined">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
                <span>{isDark ? 'Thème clair' : 'Thème sombre'}</span>
              </button>
              <a
                href={cvDownloadHref}
                className="btn btn-outlined btn-icon-leading"
                download
              >
                <span className="material-symbols-outlined">download</span>
                <span>Télécharger CV</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <main className="app-main">
        {activeProject ? (
          <ProjectDetails project={activeProject} onBack={closeProject} />
        ) : (
          <>
            <Hero />
            <About />
            <Projects onOpenProject={openProject} />
            <SkillsSection />
            <Contact />
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="app-footer-inner">
          <div className="app-footer-meta">
            <div>  OKOUMASSOU Kodjo Katchékpèlè</div>
            <div>Portfolio IA & Big Data · Développement mobile</div>
          </div>
          <div className="app-footer-links">
            <span className="material-symbols-outlined">gavel</span>
            <span className="material-symbols-outlined">shield_lock</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      id="hero"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero">
        <div>
          <h1 id="hero-title" className="hero-heading">
            Développeur / Étudiant{' '}
            <span className="hero-title-highlight">IA &amp; Big Data</span>
          </h1>
          <p className="hero-subtitle">
            {profile.title}. Passionné par les modèles de prédiction, les pipelines
            de données et les applications mobiles Flutter connectées à des
            backends temps réel.
          </p>

          <div className="hero-kpis">
            {kpis.map((item) => (
              <div
                key={item.label}
                className={`chip ${item.value ? 'chip-primary' : 'chip-soft'}`}
              >
                <span className="chip-label-strong">{item.label}</span>
                {item.value && <span>{item.value}</span>}
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-icon-leading"
              onClick={() => scrollToSection('projects')}
            >
              <span className="material-symbols-outlined">visibility</span>
              <span>Voir mes projets</span>
            </button>
            <button
              type="button"
              className="btn btn-outlined btn-icon-leading"
              onClick={() => scrollToSection('contact')}
            >
              <span className="material-symbols-outlined">mail</span>
              <span>Me contacter</span>
            </button>
          </div>
        </div>

        <div className="hero-avatar-wrapper">
          <figure className="hero-avatar-card hero-photo-card">
            <div className="hero-photo">
              <img src={profilePhoto} alt={profile.name} />
            </div>
            <figcaption className="hero-photo-caption">
              <div className="hero-photo-name">{profile.name}</div>
              <div className="hero-avatar-caption">IA · Mobile · Données</div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function About() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      id="about"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="about-title"
    >
      <div className="app-section-header">
        <h2 id="about-title" className="app-section-title">
          À propos
        </h2>
      </div>
      <div className="about-content">
        <p> 
          Développeur en début de carrière, actuellement en L3 Intelligence
          Artificielle. Motivé et rigoureux, j’aime concevoir des applications
          utiles, explorer de nouvelles technologies et renforcer continuellement
          mes compétences. À l’aise en équipe comme en autonomie, je recherche un
          environnement où progresser tout en apportant une réelle valeur.
        </p>
        <div className="about-chips">
          {aboutTags.map((tag) => (
            <span key={tag} className="chip chip-soft">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({
  onOpenProject,
}: {
  onOpenProject: (project: Project) => void
}) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      id="projects"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="projects-title"
    >
      <div className="app-section-header">
        <div>
          <h2 id="projects-title" className="app-section-title">
            Projets
          </h2>
          <p className="app-section-subtitle">
            IA appliquée, applications mobiles et pipelines de données.
          </p>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-thumb" aria-hidden="true">
              <div className="project-thumb-inner">
                <div className="project-thumb-chart">
                  <div className="project-thumb-chart-bar" />
                  <div className="project-thumb-chart-bar" />
                  <div className="project-thumb-chart-bar" />
                  <div className="project-thumb-chart-bar" />
                  <div className="project-thumb-chart-bar" />
                </div>
                <div className="project-thumb-ui">
                  <div className="project-thumb-pill" />
                  <div className="project-thumb-pill" />
                  <div className="project-thumb-pill" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="chip chip-soft">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-meta">
              <div className="project-progress-track" aria-hidden="true">
                <div
                  className="project-progress-fill"
                  style={{ width: inView ? `${project.progress}%` : 0 }}
                />
              </div>
              <div className="project-progress-label">
                {project.progress}%
              </div>
            </div>
            <div className="project-footer">
              <button
                type="button"
                className="btn btn-outlined btn-icon-leading"
                onClick={() => onOpenProject(project)}
              >
                <span className="material-symbols-outlined">open_in_new</span>
                <span>Détails</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectDetails({
  project,
  onBack,
}: {
  project: Project
  onBack: () => void
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 })

  return (
    <section
      id="project-details"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="project-details-title"
    >
      <div className="project-details-header">
        <button
          type="button"
          className="btn btn-outlined btn-icon-leading"
          onClick={onBack}
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Retour</span>
        </button>
      </div>

      <div className="project-details-hero">
        <div className="project-details-titleblock">
          <h2 id="project-details-title" className="project-details-title">
            {project.title}
          </h2>
          <p className="project-details-description">{project.details}</p>
          <div className="project-details-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="chip chip-soft">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="project-details-aside">
          <div className="project-details-progress">
            <div className="project-details-progress-label">
              Avancement
              <span>{project.progress}%</span>
            </div>
            <div className="project-progress-track" aria-hidden="true">
              <div className="project-progress-fill" style={{ width: `${project.progress}%` }} />
            </div>
          </div>

          <div className="project-details-card">
            <h3 className="project-details-card-title">Points clés</h3>
            <ul className="project-details-list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

function SkillsSection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  const languageLevels: Record<string, number> = {
    Python: 90,
    Dart: 85,
    Java: 70,
    HTML: 80,
    CSS: 78,
    SQL: 82,
  }

  const toolLevels: Record<string, number> = {
    Git: 85,
    Supabase: 80,
    Firebase: 78,
    PostgreSQL: 75,
    'VS Code': 88,
  }

  const dbLevels: Record<string, number> = {
    PostgreSQL: 78,
    Firebase: 76,
    Supabase: 80,
  }

  const skillBarWidth = (name: string, map: Record<string, number>) =>
    inView ? `${map[name] ?? 70}%` : '0%'

  return (
    <section
      id="skills"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="skills-title"
    >
      <div className="app-section-header">
        <div>
          <h2 id="skills-title" className="app-section-title">
            Compétences techniques
          </h2>
          <p className="app-section-subtitle">
            Langages, outils et bases de données utilisés au quotidien.
          </p>
        </div>
      </div>
      <div className="skills-grid">
        <div className="skill-column">
          <div className="skill-column-header">
            <span className="material-symbols-outlined">code</span>
            <span className="skill-column-title">Langages</span>
          </div>
          {skills.languages.map((lang) => (
            <div key={lang} className="skill-row">
              <span className="skill-row-label">{lang}</span>
              <div className="skill-progress-track" aria-hidden="true">
                <div
                  className="skill-progress-fill"
                  style={{ width: skillBarWidth(lang, languageLevels) }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skill-column">
          <div className="skill-column-header">
            <span className="material-symbols-outlined">build</span>
            <span className="skill-column-title">Outils</span>
          </div>
          {skills.tools.map((tool) => (
            <div key={tool} className="skill-row">
              <span className="skill-row-label">{tool}</span>
              <div className="skill-progress-track" aria-hidden="true">
                <div
                  className="skill-progress-fill"
                  style={{ width: skillBarWidth(tool, toolLevels) }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skill-column">
          <div className="skill-column-header">
            <span className="material-symbols-outlined">database</span>
            <span className="skill-column-title">Bases de données</span>
          </div>
          {skills.databases.map((db) => (
            <div key={db} className="skill-row">
              <span className="skill-row-label">{db}</span>
              <div className="skill-progress-track" aria-hidden="true">
                <div
                  className="skill-progress-fill"
                  style={{ width: skillBarWidth(db, dbLevels) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const subject = `Nouveau message depuis le portfolio${name ? ` - ${name}` : ''}`
    const body = [
      name ? `Nom: ${name}` : null,
      email ? `Email: ${email}` : null,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n')

    const mailto = `mailto:${encodeURIComponent(profile.email)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <section
      id="contact"
      ref={ref}
      className={`app-section fade-in-up ${inView ? 'is-visible' : ''}`}
      aria-labelledby="contact-title"
    >
      <div className="app-section-header">
        <div>
          <h2 id="contact-title" className="app-section-title">
            Contact
          </h2>
          <p className="app-section-subtitle">
            Discutons de vos besoins en IA, données ou applications mobiles.
          </p>
        </div>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-line">
            <strong>Email :</strong> {profile.email}
          </div>
          <div className="contact-line">
            <strong>Téléphone :</strong> {profile.phone}
          </div>
          <div className="contact-links">
            <a
              href="https://github.com/Skwiz-blip"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outlined btn-icon-leading"
            >
              <span className="material-symbols-outlined">code</span>
              <span>GitHub</span>
            </a>  
          </div>
        </div>

        <div className="contact-form-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Votre nom"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="vous@example.com"
                />
              </div>
              <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Parlez-moi de votre projet, de vos données ou de votre besoin en IA."
                />
              </div>
            </div>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary btn-icon-leading"
              >
                <span className="material-symbols-outlined">send</span>
                <span>Envoyer un message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default App
