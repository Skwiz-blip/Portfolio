import { useEffect, useRef, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import './App.css'

type Profile = {
  name: string
  title: string
  phone: string
  email: string
}

type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
}

type SkillGroup = {
  category: string
  skills: { name: string; level: number }[]
}

type Service = {
  icon: string
  title: string
  description: string
}

const profile: Profile = {
  name: 'OKOUMASSOU Kodjo Katchékpèlè',
  title: 'Étudiant Licence 3 — IA & Big Data | Développement mobile',
  phone: '+228 79 46 19 31',
  email: 'okoumassoukodjo@gmail.com',
}

const projects: Project[] = [
  {
    title: 'Cliver',
    description: 'Application Flutter client–livreur — authentification, géolocalisation, messagerie.',
    tags: ['Flutter', 'Realtime', 'Supabase'],
    link: 'https://yocliver.com',
  },
  {
    title: 'ERP/CRM Live Y Dream',
    description: 'Mise en place d\'un système ERP/CRM durant le stage — React et Node.js.',
    tags: ['React', 'Node.js', 'ERP/CRM'],
  },
  {
    title: 'Analyse & prédiction prix véhicules',
    description: 'Exploration, feature engineering et modèle de régression sur 426k enregistrements.',
    tags: ['Regression', 'Pandas', 'Scikit-learn'],
  },
]

const skillGroups: SkillGroup[] = [
  {
    category: 'Langages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Dart', level: 85 },
      { name: 'Java', level: 70 },
      { name: 'HTML/CSS', level: 80 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    category: 'Outils & Frameworks',
    skills: [
      { name: 'Flutter', level: 85 },
      { name: 'Git', level: 85 },
      { name: 'TensorFlow', level: 75 },
      { name: 'Scikit-learn', level: 80 },
      { name: 'VS Code', level: 88 },
    ],
  },
  {
    category: 'Big Data',
    skills: [
      { name: 'Hadoop', level: 65 },
      { name: 'Spark', level: 70 },
      { name: 'Kafka', level: 60 },
    ],
  },
  {
    category: 'Bases de données',
    skills: [
      { name: 'PostgreSQL', level: 78 },
      { name: 'Firebase', level: 76 },
      { name: 'Supabase', level: 80 },
    ],
  },
]

const services: Service[] = [
  {
    icon: '',
    title: 'Intelligence Artificielle',
    description: 'Développement de modèles ML, analyse de données et solutions d\'IA pour vos projets.',
  },
  {
    icon: '',
    title: 'Développement Mobile',
    description: 'Applications Flutter natives performantes avec backend temps réel.',
  },
  {
    icon: '',
    title: 'Data Science',
    description: 'Exploration, visualisation et analyse de données complexes.',
  },
  {
    icon: '',
    title: 'Backend & APIs',
    description: 'Architecture backend robuste avec Supabase et bases de données modernes.',
  },
]

function App() {
  return (
    <div className="app-shell">
      <nav>
        <a href="#hero" className="nav-logo">Hello word</a>
        <ul className="nav-links">
          <li><a href="#about">À propos</a></li>
          <li><a href="#work">Projets</a></li>
          <li><a href="#skills">Compétences</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className="app-main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Services />
        <Contact />
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">Skwiz.</div>
          <p className="footer-text">© 2026 — IA & Big Data · Développement mobile</p>
        </div>
      </footer>
    </div>
  )
}

function Hero() {
  return (
    <section id="hero">
      <p className="hero-eyebrow">Portfolio 2026</p>
      <h1 className="hero-name">
        <span className="hero-name-line">OKOUMASSOU</span>
        <span className="hero-name-line">Kodjo K.</span>
      </h1>
      <div className="hero-number">01</div>
      <div className="hero-sub">
        <p className="hero-sub-text">
          Étudiant en L3 Intelligence Artificielle & Big Data, CEO de Cliver. Passionné par le développement mobile,
          les modèles de prédiction et les pipelines de données.
        </p>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <div className="about-content">
        <div className="about-text-content">
          <p className="about-label">À propos</p>
          <h2 className="about-headline">
            Développeur<em>.</em><br />
            Étudiant IA<em>.</em>
          </h2>
          <p className="about-text">
            Développeur en début de carrière, actuellement en L3 Intelligence Artificielle.
            Motivé et rigoureux, j'aime concevoir des applications utiles, explorer de nouvelles
            technologies et renforcer continuellement mes compétences. À l'aise en équipe comme
            en autonomie, je recherche un environnement où progresser tout en apportant une
            réelle valeur.
          </p>
          <div className="about-stats">
            <div>
              <div className="stat-number">6+</div>
              <div className="stat-label">Projets réalisés</div>
            </div>
            <div>
              <div className="stat-number">L3</div>
              <div className="stat-label">Niveau d'études</div>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img
            src="https://github.com/Skwiz-blip.png"
            alt="OKOUMASSOU Kodjo K."
            className="profile-photo"
          />
        </div>
      </div>
      <div className="github-calendar-section">
        <h3 className="github-calendar-title">Activité GitHub</h3>
        <GitHubCalendar username="skwiz-blip" />
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work">
      <div className="section-header">
        <h2 className="section-title">Projets</h2>
        <span className="section-count">03</span>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <a key={project.title} href={project.link || '#'} className="project-item" target={project.link ? '_blank' : undefined} rel={project.link ? 'noreferrer' : undefined}>
            <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
            <div className="project-info">
              <h3 className="project-name">{project.title}</h3>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            <span className="project-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className={visible ? 'is-visible' : ''}>
      <div className="skills-container">
        {skillGroups.map((group) => (
          <div key={group.category} className="skill-group">
            <h3>{group.category}</h3>
            {group.skills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-fill"
                    style={{ width: visible ? `${skill.level}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services">
      <div className="inner">
        <p className="section-label">04 — Services</p>
        <h2 className="services-title">Ce que je peux faire pour vous.</h2>
        <div className="services-list">
          {services.map((service, index) => (
            <div key={service.title} className="service">
              <div className="service-num">{String(index + 1).padStart(2, '0')}</div>
              <div className="service-name">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    const subject = `Contact depuis portfolio - ${name}`
    const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact">
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Travaillons ensemble</h2>
          <p className="contact-text">
            Vous avez un projet en IA, une idée d'application mobile ou des données à analyser ?
            N'hésitez pas à me contacter pour en discuter.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-item-icon"></span>
              <span>{profile.email}</span>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon"></span>
              <span>{profile.phone}</span>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon"></span>
              <a href="https://github.com/Skwiz-blip" target="_blank" rel="noreferrer">github.com/Skwiz-blip</a>
            </div>
            <div className="contact-item">
              <span className="contact-item-icon"></span>
              <a href="https://www.linkedin.com/in/louis-okoumassou-33a751367" target="_blank" rel="noreferrer">linkedin.com/in/louis-okoumassou-33a751367</a>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input name="name" type="text" className="form-input" placeholder="Votre nom" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input name="email" type="email" className="form-input" placeholder="vous@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea name="message" className="form-textarea" placeholder="Parlez-moi de votre projet..." required />
          </div>
          <button type="submit" className="form-submit">Envoyer</button>
        </form>
      </div>
    </section>
  )
}

export default App
