import { useEffect, useRef, useState } from "react";
import "./App.css";

const EMAIL = "mahhchowdhury@gmail.com";
const GITHUB = "https://github.com/mahruschow";
const LINKEDIN = "https://www.linkedin.com/in/mahrus-chowdhury-866884301/";
const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`;

function Icon({ name = "arrow", size = 18, ...props }) {
  const paths = {
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    code: (
      <>
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
      </>
    ),
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
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 8h16M4 16h16" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M15 8V4H4v11h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
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

const projects = [
  {
    id: "jarvissort",
    number: "01",
    name: "JarvisSort",
    category: "Robotics",
    year: "2025",
    description: "Computer vision meets a machine that can act on it.",
    image: "jarvissort.png",
    alt: "Four photos of the JarvisSort robotic gantry, electronics, and project display",
    tags: ["OpenAI CLIP", "Raspberry Pi", "MQTT"],
    overview:
      "An autonomous retrieval and categorization platform that identifies objects with computer vision and sorts them using embedded hardware. A web dashboard connects the pieces.",
    role: "Software and hardware integration",
    contribution:
      "I co-led a team of five and connected the host vision pipeline to TMC2209 motor controllers over TCP/IP and MQTT. My work included the CLIP categorization pipeline, motion control, and recovery logic for the physical system.",
    learning:
      "A model is one part of a much larger system. Keeping the hardware, communication layer, and vision pipeline in sync mattered just as much as the classification itself.",
    results: [
      "96.4% classification accuracy",
      "72% faster pick-and-place cycles",
      "Presented to Maryland’s Lt. Governor and approximately 300 attendees",
    ],
  },
  {
    id: "air-hockey",
    number: "02",
    name: "Autonomous Air Hockey",
    category: "Robotics",
    year: "2024–2025",
    description: "A robot with a quick reaction time and a competitive streak.",
    image: "air-hockey.png",
    alt: "The illuminated robotic air hockey table with its overhead motion gantry",
    tags: ["OpenCV", "Rust", "Control theory"],
    overview:
      "A robotic air hockey opponent that detects the puck, predicts its trajectory, and moves a CoreXY gantry to defend and return shots.",
    role: "Hardware integration, tracking, and motor control",
    contribution:
      "I paired an OpenCV tracking pipeline in Python with closed-loop stepper control in Rust. I worked on edge-rebound prediction, defensive positioning, motor tuning, and the interface between software and hardware.",
    learning:
      "Timing is a system-wide problem. The camera, prediction algorithm, and motors all need to agree on where the puck will be, not just where it was.",
    results: [
      "Approximately 25% improvement in paddle positioning accuracy",
      "Featured in a UMD ECE article and documentary",
    ],
    gallery: "air-hockey-vision.png",
  },
  {
    id: "adapt",
    number: "03",
    name: "Adapt",
    category: "Software",
    year: "Open source",
    description: "Real-time community chat with privacy at its core.",
    image: "adapt.png",
    alt: "The Adapt chat interface showing channels, active users, and conversations",
    tags: ["Rust", "WebSocket", "PWA"],
    overview:
      "An open-source community chat platform built around privacy, with Rust services and clients for the web and desktop.",
    role: "Core implementation and security hardening",
    contribution:
      "My work spanned core implementation, security hardening, and promotion. The project uses Rust microservices, WebSocket communication, cross-platform clients, and a public REST API.",
    learning:
      "Privacy decisions shape the architecture from the beginning. Reliable real-time communication and a fast interface have to work within those decisions.",
    results: [
      "Open-source project under the AGPL",
      "Web PWA and desktop clients",
    ],
  },
  {
    id: "surgisim",
    number: "04",
    name: "SurgiSim AI",
    category: "Software",
    year: "2026",
    description: "Interactive surgical training with live AI coaching.",
    tags: ["React", "FastAPI", "WebGL"],
    overview:
      "A surgical training simulator with procedure-specific WebGL scenes, instrument sets, and AI guidance during a practice session.",
    role: "Frontend and backend development",
    contribution:
      "I built a React interface and FastAPI backend for session state, scoring, and live coaching. The simulator includes laparoscopic cholecystectomy and appendectomy scenes, with coaching streamed over server-sent events.",
    learning:
      "Feedback becomes more useful when it arrives while someone is practicing. The interface connects the simulation, live guidance, and performance metrics in one place.",
    results: [
      "Sub-200ms first-token latency for streamed coaching",
      "Tracks tissue handling, idle time, and sequencing errors",
    ],
  },
];

function SimulationGraphic() {
  return (
    <div
      className="simulation-graphic"
      aria-label="SurgiSim system overview illustration"
    >
      <div className="sim-caption">
        <span className="status-dot" /> SURGISIM / SYSTEM OVERVIEW
      </div>
      <div className="sim-orbit">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />
        <Icon name="layers" size={45} />
      </div>
      <div className="sim-flow">
        <span>Simulation</span>
        <i />
        <span>AI coaching</span>
        <i />
        <span>Feedback</span>
      </div>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
          if (e.key === "Escape") setMenuOpen(false);
        }}
      >
        <a href="#work" onClick={() => setMenuOpen(false)}>
          Work
        </a>
        <span>/</span>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
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

function ProjectCard({ project, onSelect }) {
  return (
    <article className={`project-card project-${project.id}`}>
      <button
        className="project-open"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.name} project details`}
      >
        <div className="project-visual">
          {project.image ? (
            <img src={asset(project.image)} alt={project.alt} loading="lazy" />
          ) : (
            <SimulationGraphic />
          )}
          <span className="project-view">
            <Icon size={22} />
          </span>
        </div>
        <div className="project-meta">
          <span>
            {project.category} / {project.year}
          </span>
          <span>{project.number}</span>
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
            {project.image ? (
              <img src={asset(project.image)} alt={project.alt} />
            ) : (
              <SimulationGraphic />
            )}
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
          <h3>What I worked on</h3>
          <p>{project.contribution}</p>
          <h3>What I learned</h3>
          <p>{project.learning}</p>
          <h3>Project highlights</h3>
          <ul>
            {project.results.map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
          {project.gallery && (
            <img
              className="detail-photo"
              src={asset(project.gallery)}
              alt="Computer vision view of the air hockey puck tracking system"
              loading="lazy"
            />
          )}
          <button className="button" onClick={onClose}>
            Back to projects <Icon name="close" size={15} />
          </button>
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
  return (
    <section id="work" className="work-section container section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2>Ideas, made real.</h2>
        </div>
        <p>
          A few things I’ve built across
          <br className="desktop-break" /> software, AI, and the physical world.
        </p>
      </div>
      <div className="filter-row">
        <div className="filters" aria-label="Filter projects">
          {["All", "Robotics", "Software"].map((name) => (
            <button
              key={name}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
              {name === "All" && <span>04</span>}
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {String(shown.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="project-grid">
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

const skills = [
  {
    icon: "eye",
    title: "AI & computer vision",
    body: "Turning images and data into signals that software and machines can use.",
    tools: "PyTorch · OpenCV · CLIP",
  },
  {
    icon: "chip",
    title: "Robotics & systems",
    body: "Connecting perception, embedded hardware, and real-time control.",
    tools: "Rust · Raspberry Pi · MQTT",
  },
  {
    icon: "code",
    title: "Full-stack development",
    body: "Building interfaces and the services that keep them running.",
    tools: "React · Python · FastAPI",
  },
  {
    icon: "layers",
    title: "Research & data",
    body: "Testing assumptions, comparing models, and making results reproducible.",
    tools: "PySpark · SQL · MMSegmentation",
  },
];

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
              Maryland and a member of the ACES Honors College.
            </p>
            <p>
              I like working where software meets the physical world: making a
              robot see, helping a system react, or building an interface that
              makes something complicated feel simple.
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
        <div className="experience">
          <div className="experience-label">
            <p className="eyebrow">Along the way</p>
            <h3>
              Learning by{" "}
              <br />
              building.
            </h3>
          </div>
          <div className="experience-list">
            <article>
              <div>
                <h4>Scope Infotech</h4>
                <p>AI Software Engineering Intern</p>
                <span>
                  Data pipelines, semantic search, and security tooling.
                </span>
              </div>
              <time>Jul 2026 — Present</time>
            </article>
            <article>
              <div>
                <h4>UMD · I3P Lab</h4>
                <p>Undergraduate Researcher</p>
                <span>
                  Medical image segmentation and reproducible model evaluation.
                </span>
              </div>
              <time>Jun 2026 — Present</time>
            </article>
            <article>
              <div>
                <h4>UMD · Clark School of Engineering</h4>
                <p>Engineering Intern</p>
                <span>
                  Autonomous robotics, vision, and embedded motor control.
                </span>
              </div>
              <time>Jul — Aug 2025</time>
            </article>
          </div>
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
      if (res.ok) {
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
      <p className="eyebrow">03 / Let’s connect</p>
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
              from pixels
              <br />
              to the physical world.
            </span>
          </h1>
          <p className="hero-description">
            Computer engineering at UMD.
            <br className="mobile-break" /> Curious about what comes next.
          </p>
          <a className="button hero-cta" href="#work">
            Explore my work <Icon size={16} />
          </a>
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
        <Contact />
      </main>
      <footer className="site-footer container">
        <a href="#main" className="footer-signature">
          Mahrus Chowdhury<span>© {new Date().getFullYear()}</span>
        </a>
        <div>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <Icon size={12} />
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            LinkedIn <Icon size={12} />
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
