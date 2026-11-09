import { useEffect, useRef, useState } from "react";
import Inbox from "./Inbox.jsx";
import {
  CATEGORIES,
  EMAIL,
  GITHUB,
  LINKEDIN,
  RESUME_FILE,
  experience,
  projects,
  skills,
} from "./content.js";
import "./App.css";

const COPYRIGHT_YEAR = new Date().getFullYear();
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const resumeHref = `${import.meta.env.BASE_URL}${RESUME_FILE}`;

function Icon({ name = "arrow", size = 18, ...props }) {
  const paths = {
    arrow: <path d="M7 17 17 7M7 7h10v10" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />,
    chip: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3" />
        <rect x="10" y="10" width="4" height="4" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    layers: <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 8h16M4 16h16" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M15 8V4H4v11h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    download: <path d="M12 4v12m-5-5 5 5 5-5M5 20h14" />,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

function SystemGraphic({ caption, flow }) {
  return (
    <div className="simulation-graphic" aria-label={`${caption} illustration`}>
      <div className="sim-caption">
        <span className="status-dot" /> {caption}
      </div>
      <div className="sim-orbit">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <Icon name="layers" size={45} />
      </div>
      <div className="sim-flow">
        {flow.map((step, i) => (
          <span key={step} className="sim-step">
            {i > 0 && <i />}
            <span>{step}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectVisual({ project }) {
  if (project.image) {
    return <img src={asset(project.image)} alt={project.alt} loading="lazy" />;
  }
  return <SystemGraphic {...project.graphic} />;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  return (
    <header className="site-header container">
      <a className="email-link" href={`mailto:${EMAIL}`}>
        <span className="email-icon">
          <Icon name="mail" size={16} />
        </span>
        <span>{EMAIL}</span>
      </a>
      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Icon name={menuOpen ? "close" : "menu"} />
      </button>
      <nav
        id="main-nav"
        className={menuOpen ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
      >
        <a href="#work" onClick={close}>
          Work
        </a>
        <span>/</span>
        <a href="#about" onClick={close}>
          About
        </a>
        <span>/</span>
        <a href="#experience" onClick={close}>
          Experience
        </a>
        <span>/</span>
        <a href={resumeHref} target="_blank" rel="noreferrer">
          Resume <Icon name="download" size={12} />
        </a>
        <span>/</span>
        <a href={LINKEDIN} target="_blank" rel="noreferrer">
          LinkedIn <Icon size={12} />
        </a>
        <span>/</span>
        <a href={GITHUB} target="_blank" rel="noreferrer">
          GitHub <Icon size={12} />
        </a>
      </nav>
    </header>
  );
}

function ProjectCard({ project, index, onSelect }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <button
        className="project-open"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.name} project details`}
      >
        <div className="project-visual">
          <ProjectVisual project={project} />
          <span className="project-view">
            <Icon size={22} />
          </span>
        </div>
        <div className="project-meta">
          <span>
            {project.category} / {project.year}
          </span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </button>
    </article>
  );
}

function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const current = dialog.current;
    current.showModal();
    current.scrollTop = 0;
    document.body.style.overflow = "hidden";
    return () => {
      current.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-content">
          <div className="dialog-top">
            <span className="eyebrow">
              {project.category} / {project.year}
            </span>
            <button
              className="icon-button"
              onClick={onClose}
              aria-label="Close project details"
              autoFocus
            >
              <Icon name="close" />
            </button>
          </div>
          <h2 id="project-title">{project.name}</h2>
          <p className="dialog-intro">{project.overview}</p>
          <div className={`dialog-visual project-${project.id}`}>
            <ProjectVisual project={project} />
          </div>
          <div className="detail-grid">
            <div>
              <span className="eyebrow">My role</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span className="eyebrow">Built with</span>
              <p>{project.tags.join(" · ")}</p>
            </div>
          </div>
          {project.details && (
            <>
              <h3>What I built</h3>
              <ul>
                {project.details.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          <h3>What I learned</h3>
          <p>{project.learning}</p>
          <h3>Outcomes</h3>
          <ul>
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
          {project.gallery && (
            <img
              className="detail-photo"
              src={asset(project.gallery)}
              alt={project.galleryAlt || ""}
              loading="lazy"
            />
          )}
          <div className="dialog-actions">
            {project.links?.map((link) => (
              <a
                key={link.href}
                className="button"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} <Icon size={15} />
              </a>
            ))}
            <button className="button" onClick={onClose}>
              Back to projects <Icon name="close" size={15} />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Work({ onSelect }) {
  const [filter, setFilter] = useState("All");
  const shown = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const count = (name) =>
    name === "All"
      ? projects.length
      : projects.filter((p) => p.category === name).length;
  return (
    <section id="work" className="work-section container section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2>Ideas, made real.</h2>
        </div>
        <p>
          Things I’ve built across hardware,
          <br className="desktop-break" /> software, AI, and research.
        </p>
      </div>
      <div className="filter-row">
        <div className="filters" aria-label="Filter projects">
          {CATEGORIES.map((name) => (
            <button
              key={name}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
              <span>{String(count(name)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {String(shown.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="project-grid">
        {shown.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="about-intro">
          <div>
            <p className="eyebrow">02 / A bit about me</p>
            <h2>
              Curious by nature.
              <br />
              <span>Engineer in progress.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              I’m Mahrus, a computer engineering student at the University of
              Maryland and a member of the ACES Honors College in
              cybersecurity. I’ll be joining Northrop Grumman as an embedded
              software engineering intern in summer 2027.
            </p>
            <p>
              I like working where software meets the physical world. That has
              meant laying out a sensor board for a balloon payload, teaching a
              gantry to sort what a vision model sees, building a governed data
              platform people can query in plain English, and testing whether
              a language model can read a biology report without making
              things up.
            </p>
            <p>
              The thread through all of it: I’ve built every layer of the
              stack, from the board that produces the data to the model that
              acts on it, and I care most about the seams in between.
            </p>
          </div>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <Icon name={skill.icon} size={27} />
              <h3>{skill.title}</h3>
              <p>{skill.body}</p>
              <span>{skill.tools}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ item, onSelect }) {
  const [open, setOpen] = useState(false);
  const expandable = Boolean(item.bullets?.length);
  const project = item.project
    ? projects.find((p) => p.id === item.project)
    : null;
  return (
    <article className={open ? "experience-item is-open" : "experience-item"}>
      <div className="experience-row">
        <div>
          <h4>{item.org}</h4>
          <p>{item.role}</p>
          <span>{item.summary}</span>
        </div>
        <div className="experience-when">
          <time>{item.when}</time>
          <small>{item.where}</small>
        </div>
      </div>
      {expandable && (
        <>
          <button
            className="experience-toggle"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "plus"} size={13} />
            {open ? "Less" : "More"}
          </button>
          {open && (
            <div className="experience-detail">
              <ul>
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {project && (
                <button
                  className="text-link"
                  onClick={() => onSelect(project)}
                >
                  Open the {project.name} project <Icon size={12} />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </article>
  );
}

function Experience({ onSelect }) {
  return (
    <section id="experience" className="experience-section container section">
      <div className="experience">
        <div className="experience-label">
          <p className="eyebrow">03 / Experience</p>
          <h3>
            Learning by{" "}
            <br />
            building.
          </h3>
          <p className="experience-note">
            Industry, research, and team roles, newest first. Expand any entry
            for detail, or open the related project.
          </p>
          <a className="button" href={resumeHref} target="_blank" rel="noreferrer">
            Download resume <Icon name="download" size={15} />
          </a>
        </div>
        <div className="experience-list">
          {experience.map((item) => (
            <ExperienceItem key={item.org + item.role} item={item} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

const EMPTY_FORM = { name: "", email: "", subject: "", message: "", website: "" };

function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [notice, setNotice] = useState("");

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  async function submit(e) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setNotice("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setForm(EMPTY_FORM);
        setErrors({});
        setStatus("sent");
        setNotice("Thanks! Your message was sent. I’ll get back to you soon.");
        return;
      }
      if (res.status === 400 && body.errors) setErrors(body.errors);
      setStatus("error");
      setNotice(
        res.status === 400
          ? "Please fix the highlighted fields."
          : body.error || "Something went wrong. Please try again.",
      );
    } catch {
      setStatus("error");
      setNotice(`Couldn’t reach the server. You can also email ${EMAIL}.`);
    }
  }

  const field = (name, label, props = {}) => (
    <div className={errors[name] ? "form-field has-error" : "form-field"}>
      <label htmlFor={`contact-${name}`}>{label}</label>
      {props.as === "textarea" ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          rows={5}
          value={form[name]}
          onChange={update(name)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          maxLength={2000}
          required={props.required}
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={props.type || "text"}
          value={form[name]}
          onChange={update(name)}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
          autoComplete={props.autoComplete}
          maxLength={name === "subject" ? 150 : 254}
          required={props.required}
        />
      )}
      {errors[name] && (
        <span id={`contact-${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        {field("name", "Name", { autoComplete: "name", required: true })}
        {field("email", "Email", {
          type: "email",
          autoComplete: "email",
          required: true,
        })}
      </div>
      {field("subject", "Subject (optional)")}
      {field("message", "Message", { as: "textarea", required: true })}
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>
      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <Icon name="mail" size={15} />
      </button>
      <span
        className={status === "error" ? "form-status is-error" : "form-status"}
        role="status"
      >
        {notice}
      </span>
    </form>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setCopyError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contact" className="contact-section container">
      <div className="contact-symbol">
        <Icon name="mail" size={26} />
      </div>
      <p className="eyebrow">04 / Let’s connect</p>
      <h2>
        Good things start
        <br />
        with a <span>conversation.</span>
      </h2>
      <p>Have an idea, a question, or something interesting to build?</p>
      <div className="contact-actions">
        <a className="button" href={`mailto:${EMAIL}`}>
          Get in touch <Icon name="mail" size={15} />
        </a>
        <button className="copy-button" onClick={copyEmail}>
          <Icon name={copied ? "check" : "copy"} size={15} />
          <span>{copied ? "Copied!" : "Copy email"}</span>
        </button>
      </div>
      <span className="copy-status" role="status">
        {copyError ? EMAIL : copied ? "Email address copied to clipboard." : ""}
      </span>
      <ContactForm />
      <Inbox />
    </section>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <section className="hero container">
          <img
            className="portrait"
            src={asset("mahrus.jpeg")}
            width="108"
            height="108"
            alt="Mahrus Chowdhury"
            fetchPriority="high"
          />
          <p className="hero-intro">
            Hi, I’m Mahrus <span aria-hidden="true">✳</span>
          </p>
          <h1>
            Building intelligent
            <br />
            systems,{" "}
            <span>
              from the circuit board
              <br />
              to the model on top.
            </span>
          </h1>
          <p className="hero-description">
            Computer engineering at UMD. Embedded hardware, AI systems, and
            research.
            <br className="mobile-break" /> Incoming at Northrop Grumman, summer
            2027.
          </p>
          <div className="hero-actions">
            <a className="button hero-cta" href="#work">
              Explore my work <Icon size={16} />
            </a>
            <a
              className="button hero-cta hero-cta-secondary"
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
            >
              Resume <Icon name="download" size={15} />
            </a>
          </div>
          <a
            href="#work"
            className="scroll-cue"
            aria-label="Scroll to selected work"
          >
            <span /> SCROLL TO EXPLORE
          </a>
        </section>
        <div className="affiliations">
          <div className="container affiliation-inner">
            <div>
              <span className="affiliation-mark">M</span>
              <span>
                UNIVERSITY OF
                <br />
                <strong>MARYLAND</strong>
              </span>
            </div>
            <div className="aces">
              ACES <span>HONORS COLLEGE</span>
            </div>
            <div className="northrop">
              NORTHROP <span>GRUMMAN</span>
            </div>
            <div className="scope">
              Scope <span>INFOTECH</span>
            </div>
            <div className="lab">
              I³P{" "}
              <span>
                IMAGING & IMAGE
                <br />
                PROCESSING LAB
              </span>
            </div>
          </div>
        </div>
        <Work onSelect={setSelectedProject} />
        <About />
        <Experience onSelect={setSelectedProject} />
        <Contact />
      </main>
      <footer className="site-footer container">
        <a href="#main" className="footer-signature">
          Mahrus Chowdhury<span>© {COPYRIGHT_YEAR}</span>
        </a>
        <div>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <Icon size={12} />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn <Icon size={12} />
          </a>
          <a href={resumeHref} target="_blank" rel="noreferrer">
            Resume <Icon name="download" size={12} />
          </a>
          <a href={`mailto:${EMAIL}`}>
            Email <Icon size={12} />
          </a>
        </div>
      </footer>
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
