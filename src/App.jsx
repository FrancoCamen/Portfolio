import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'
import { projects } from './data/projects'
import { profile } from './data/profile'

const featuredProjects = projects.filter((project) => project.featured)

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setIsOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        FC<span>.</span>
      </a>
      <button
        className="menu-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="main-navigation"
        className={`navigation ${isOpen ? 'is-open' : ''}`}
        aria-label="Navegación principal"
      >
        <a href="#sobre-mi" onClick={() => setIsOpen(false)}>Sobre mí</a>
        <a href="#experiencia" onClick={() => setIsOpen(false)}>Experiencia</a>
        <a href="#destacados" onClick={() => setIsOpen(false)}>Destacados</a>
        <a href="#proyectos" onClick={() => setIsOpen(false)}>Proyectos</a>
        <a className="nav-cta" href={profile.github.url} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}

function ProjectLinks({ links, compact = false }) {
  if (!links.length) return <span className="no-link">Proyecto académico</span>

  return (
    <div className={`project-links ${compact ? 'compact' : ''}`}>
      {links.map((link) => (
        <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
          {link.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

function FeaturedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProject = featuredProjects[activeIndex]

  const changeSlide = (direction) => {
    setActiveIndex((current) => (
      (current + direction + featuredProjects.length) % featuredProjects.length
    ))
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Proyectos destacados"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') changeSlide(-1)
        if (event.key === 'ArrowRight') changeSlide(1)
      }}
    >
      <div className="carousel-visual">
        <img src={activeProject.image} alt={activeProject.alt} width="920" height="640" />
        <span className="slide-count" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
        </span>
      </div>
      <div className="carousel-copy" aria-live="polite">
        <span className="eyebrow">{activeProject.eyebrow}</span>
        <h3>{activeProject.title}</h3>
        <p>{activeProject.description}</p>
        <div className="tag-list" aria-label="Tecnologías utilizadas">
          {activeProject.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <ProjectLinks links={activeProject.links} />
        <div className="carousel-controls">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Proyecto anterior">
            <ArrowLeft aria-hidden="true" />
          </button>
          <div className="carousel-dots" aria-label="Seleccionar proyecto">
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                aria-label={`Ver ${project.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Proyecto siguiente">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className={`card-image ${project.image ? '' : 'image-fallback'}`}>
        {project.image ? (
          <img src={project.image} alt={project.alt} width="720" height="460" loading="lazy" />
        ) : (
          <div aria-hidden="true"><Github size={52} /><span>OAuth 2.0</span></div>
        )}
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="card-body">
        <span className="eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list compact-tags" aria-label="Tecnologías utilizadas">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <ProjectLinks links={project.links} compact />
      </div>
    </article>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="hero section-shell" id="inicio">
          <div className="hero-copy">
            <span className="kicker">{profile.title} · Portfolio</span>
            <h1>Franco<br /><em>Camen</em></h1>
            <p>
              {profile.education} Formación orientada al desarrollo de software,
              análisis funcional, bases de datos, datos y soporte técnico.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#proyectos">
                Ver proyectos <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href={profile.github.url} target="_blank" rel="noreferrer">
                <Github size={18} aria-hidden="true" /> github.com/FrancoCamen
              </a>
            </div>
          </div>
          <div className="hero-aside" aria-label="Áreas de experiencia">
            <div className="orb"><span>11</span> proyectos</div>
            <ul>
              <li><span>01</span> Backend y APIs REST</li>
              <li><span>02</span> Frontend y mobile</li>
              <li><span>03</span> Datos e inteligencia artificial</li>
            </ul>
          </div>
        </section>

        <section className="about section-shell" id="sobre-mi">
          <div>
            <span className="section-number">01 — Perfil</span>
            <h2>Desarrollo, datos y resolución de problemas.</h2>
          </div>
          <div className="about-copy">
            {profile.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="experience-strip">
              <GraduationCap aria-hidden="true" />
              <div>
                <strong>{profile.title}</strong>
                <span>Licenciatura en Sistemas de Información · Quinto año</span>
              </div>
            </div>
          </div>
        </section>

        <section className="experience section-shell" id="experiencia">
          <div className="section-heading">
            <div>
              <span className="section-number">02 — Experiencia</span>
              <h2>Experiencia laboral</h2>
            </div>
            <p>Experiencia profesional comprobable.</p>
          </div>
          <article className="experience-card">
            <div className="experience-meta">
              <BriefcaseBusiness aria-hidden="true" />
              <span>{profile.experience.period}</span>
            </div>
            <div className="experience-content">
              <span className="eyebrow">{profile.experience.organization}</span>
              <h3>{profile.experience.role}</h3>
              <p>{profile.experience.description}</p>
              <h4>Principales responsabilidades</h4>
              <ul>
                {profile.experience.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
              <p className="experience-outcome">{profile.experience.outcome}</p>
            </div>
          </article>
          <p className="experience-note">{profile.clarification}</p>
        </section>

        <section className="contact-band" aria-labelledby="contact-title">
          <div className="section-shell contact-inner">
            <div>
              <span className="section-number">03 — Contacto</span>
              <h2 id="contact-title">Hablemos.</h2>
            </div>
            <address className="contact-list">
              <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone aria-hidden="true" />{profile.phone}</a>
              <span><MapPin aria-hidden="true" />{profile.location}</span>
              <a href={profile.linkedin.url} target="_blank" rel="noreferrer">
                <Linkedin aria-hidden="true" />LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </address>
          </div>
        </section>

        <section className="featured section-shell" id="destacados">
          <div className="section-heading">
            <div>
              <span className="section-number">04 — Selección</span>
              <h2>Proyectos destacados</h2>
            </div>
            <p>Una mirada rápida a algunos de los trabajos más representativos.</p>
          </div>
          <FeaturedCarousel />
        </section>

        <section className="projects-section section-shell" id="proyectos">
          <div className="section-heading">
            <div>
              <span className="section-number">05 — Archivo</span>
              <h2>Todos los proyectos</h2>
            </div>
            <p>{projects.length} proyectos académicos y personales.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
      <footer className="footer section-shell">
        <div>
          <span className="kicker">{profile.location}</span>
          <h2>Conectemos.</h2>
        </div>
        <a href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" /> {profile.email} <ArrowUpRight aria-hidden="true" />
        </a>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </>
  )
}
