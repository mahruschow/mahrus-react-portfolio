// All site content lives here so it can be edited without touching components.

export const EMAIL = "mahhchowdhury@gmail.com";
export const GITHUB = "https://github.com/mahruschow";
export const LINKEDIN = "https://www.linkedin.com/in/mahrus-chowdhury-866884301/";
export const RESUME_FILE = "Mahrus_Chowdhury_Resume.pdf";

export const CATEGORIES = ["All", "Robotics & Hardware", "Software & AI", "Research"];

/**
 * Projects. Each entry supports:
 *  - image / alt (optional; falls back to a labeled system graphic)
 *  - graphic: { caption, flow: [..] } for the fallback illustration
 *  - details: bullet list of what was built
 *  - results: bullet list of outcomes
 *  - links: [{ label, href }]
 */
export const projects = [
  {
    id: "jarvissort",
    name: "Jarvis Sort",
    category: "Robotics & Hardware",
    year: "Summer 2025",
    description: "An autonomous gantry that sees an object, decides what it is, and puts it where it belongs.",
    image: "jarvissort.png",
    alt: "Four photos of the Jarvis Sort robotic gantry, electronics, and project display",
    tags: ["CLIP", "ESP32", "TMC2209", "MQTT", "Python"],
    overview:
      "Built during an engineering internship with UMD's Cyber-Physical Systems Engineering program, Jarvis Sort is a 3-axis sorting gantry that classifies objects in real time with a CLIP-based vision pipeline and physically sorts them. A web dashboard ties the vision host and the embedded controllers together.",
    role: "Co-lead of a five-person team; owned motion-control hardware and the vision-to-hardware bridge",
    details: [
      "Drove NEMA 17 steppers with TMC2209 drivers configured over UART for 1/16 microstepping and current limits, and replaced mechanical limit switches with StallGuard sensorless homing.",
      "Wired 24 V power distribution with fused driver rails and an isolated logic supply after noise-induced resets kept crashing the ESP32 motion controller.",
      "Bridged the host vision pipeline to the embedded controllers over TCP/IP and MQTT so classification results became motion commands with minimal latency.",
      "Added recovery logic so a missed pick or a stalled axis re-homed and retried instead of halting the run.",
    ],
    learning:
      "A model is one part of a much larger system. The hardware, the communication layer, and the vision pipeline all had to stay in sync, and most of the hard bugs lived in the seams between them.",
    results: [
      "96.4% classification accuracy",
      "Pick-and-place cycle cut 72%, from 2.4 s to 0.68 s",
      "99.1% completion across 1,200 test cycles",
      "Demoed live to Maryland's Lt. Governor and ~300 attendees",
    ],
  },
  {
    id: "air-hockey",
    name: "Autonomous Air Hockey",
    category: "Robotics & Hardware",
    year: "Sep 2024 – May 2025",
    description: "A robot opponent that tracks the puck, predicts the bounce, and gets there first.",
    image: "air-hockey.png",
    alt: "The illuminated robotic air hockey table with its overhead motion gantry",
    tags: ["Rust", "OpenCV", "ATmega328P", "Control theory"],
    overview:
      "A robotic air hockey opponent that detects the puck with an overhead camera, predicts where it is going, and moves a belt-driven gantry to defend and return shots.",
    role: "Hardware integration, puck tracking, and motor control",
    details: [
      "Built a 2-axis belt-driven gantry on NEMA 17 steppers and A4988 drivers, controlled by an ATmega328P running bare-metal Rust (arduino-hal) with timer-interrupt step-pulse generation and acceleration ramping.",
      "Wrote a real-time OpenCV puck tracker in Python and streamed target coordinates to the microcontroller over a framed UART protocol.",
      "Modeled edge-rebound trajectory prediction and defensive positioning, then tuned the controller near the mechanical limits of the gantry.",
    ],
    learning:
      "Timing is a system-wide problem. The camera, the prediction, and the motors all have to agree on where the puck will be, not where it was.",
    results: [
      "~25% improvement in paddle positioning accuracy",
      "Featured in a UMD ECE article and documentary",
      "Presented to Montgomery County officials",
    ],
    gallery: "air-hockey-vision.png",
    galleryAlt: "Computer vision view of the air hockey puck tracking system",
  },
  {
    id: "pterodactyl",
    name: "PTERODACTYL Sensor Board",
    category: "Robotics & Hardware",
    year: "2026 – Present",
    description: "Redesigning the avionics for a UMD near-space balloon payload in KiCad.",
    image: "pterodactyl-board.png",
    alt: "Rendered top view of the PTERODACTYL v4 sensor board",
    tags: ["KiCad", "Teensy 4.1", "Power design", "Firmware"],
    overview:
      "Team PTERODACTYL flies a high-altitude balloon payload that logs orientation, acceleration, GPS, pressure, humidity, temperature, and derived altitude for analysis after recovery. Our electronics team is redesigning the legacy sensor board, originally an Autodesk Fusion/Eagle design, as a native KiCad project with a reviewed power architecture and new firmware.",
    role: "Electronics lead",
    details: [
      "Migrated the four-layer v3.8 board into native KiCad and audited it: 11 DRC errors, 33 ERC errors, and 52 schematic/PCB parity warnings triaged with documented fixes.",
      "Reviewed the legacy power path and found real faults: two regulator outputs joined through switches with no OR-ing, USB and battery power able to back-feed each other, LEDs with no series resistors, and a battery monitor measuring the wrong rail.",
      "Drafted the v4 architecture around a Teensy 4.1 logger with BNO055, MS8607, and PA1616D GPS breakouts: PTC fuse, reverse-polarity MOSFET, buck-boost regulator, filtered sensor rail, and a battery-sense divider. The v4 schematic passes ERC with zero violations and matches an independent net list.",
      "Released a first prototype for fabrication in October 2026 with audited Gerbers, drill files, a SHA-256 manifest, and purchase BOMs; drafted Teensy firmware for the logger.",
    ],
    learning:
      "Most of the risk in a board is in what the previous design left undocumented. Tracing every net and writing down every open decision mattered more than any single schematic change.",
    results: [
      "v4 schematic: 0 ERC violations",
      "First prototype released for fabrication, Oct 2026",
      "Full design history and validation evidence kept in the repo",
    ],
    links: [{ label: "Design repo", href: "https://github.com/mahruschow/team-pterodactyl" }],
  },
  {
    id: "ftc",
    name: "FTC 19818 Jade Innovations",
    category: "Robotics & Hardware",
    year: "2021 – 2025",
    description: "Four seasons of competition robotics, two trips to the World Championship.",
    image: "ftc-robot.jpg",
    alt: "The Jade Innovations robot extending its arm across the competition field",
    tags: ["Kotlin", "PID", "Odometry", "Inverse kinematics"],
    overview:
      "Jade Innovations is a small FIRST Tech Challenge team from Potomac, Maryland. Every member worked across mechanical, software, and outreach, which is how I first learned to build a whole system rather than one part of it.",
    role: "Co-captain; software and outreach",
    details: [
      "Wrote robot control software in Kotlin: custom PID loops per mechanism, with feedforward and gain scheduling so a 5-degree-of-freedom arm stayed accurate as its load changed with pitch angle.",
      "Implemented a heading-lock controller mapped to the D-pad, a finite-state-machine subsystem manager, and inverse kinematics that kept the intake level as the slides extended and the arm pitched.",
      "Integrated three-wheel odometry for localization and a color/proximity sensor that rejected opponent-colored samples and told the robot when a piece was secured.",
      "Researched Active Disturbance Rejection Control as an alternative when plain PID oscillated under heavy load.",
    ],
    learning:
      "Consistency beats cleverness in competition. The features that scored were the ones that made the robot behave the same way every match.",
    results: [
      "FTC World Championship 2024, Innovate Award (Edison Division); a second World Championship appearance",
      "Sponsorships secured from Bambu Lab, Fabworks, GenScript, UnitedHealthcare, Hughes, and UMD CPS Engineering",
      "900+ outreach hours: a four-week Python course at Germantown Library, mentoring three rookie FLL teams and an FTC team, and STEM-funding advocacy with Maryland legislators",
    ],
  },
  {
    id: "lakehouse",
    name: "Governed Lakehouse + RAG",
    category: "Software & AI",
    year: "2026",
    description: "A governed data platform that non-technical staff can query in plain English.",
    tags: ["PySpark", "Delta Lake", "FAISS", "sentence-transformers"],
    graphic: { caption: "SCOPE INFOTECH / DATA PLATFORM", flow: ["Ingest", "Govern", "Ask"] },
    overview:
      "At Scope Infotech I built a Delta Lake medallion lakehouse as a capability demonstration for federal contract pursuits, then put a retrieval layer on top so people who do not write SQL could still get answers from governed data.",
    role: "AI software engineering intern; designed and built the platform end to end",
    details: [
      "Engineered bronze, silver, and gold zones in PySpark and Spark SQL governing 52 tables across three ingestion paths, with table-ownership access control.",
      "Built a semantic search and RAG layer using catalog-level embeddings (sentence-transformers) indexed in FAISS, so a plain-English question resolves to the right governed tables.",
      "Built a Medicare-claims fraud pipeline with K-Means and PCA anomaly detection that flagged 12 of 12 planted fraud providers.",
      "Consolidated four static analyzers into a CI-gated vulnerability dashboard mapped to CWE, OWASP 2025, and NIST 800-53, cutting triage volume 44% (1,583 to 880 findings); demoed to the CISO.",
    ],
    learning:
      "Governance is a feature, not a tax. Once data had owners and zones, both the AI layer and the security tooling got simpler.",
    results: [
      "52 governed tables, three ingestion paths",
      "12/12 fraud providers flagged (100% recall)",
      "Security triage volume cut 44%",
    ],
  },
  {
    id: "thinkex",
    name: "ThinkEx",
    category: "Software & AI",
    year: "Aug 2026 – Present",
    description: "An open-source workspace for source-grounded study, backed by UMD's Mokhtarzada Hatchery.",
    image: "thinkex.png",
    alt: "The ThinkEx workspace showing documents, folders, and an AI assistant side by side",
    tags: ["TypeScript", "PostgreSQL", "Yjs", "LLM prompting"],
    overview:
      "ThinkEx keeps PDFs, documents, and AI chat side by side so research stays grounded in real sources. I joined as a software engineering intern after the founding team won $10,000 from UMD's Mokhtarzada Hatchery, and I ship across the frontend, backend, and developer tooling.",
    role: "Software engineering intern",
    details: [
      "Shipped the Claude Sonnet 5.5 model upgrade and built short-answer quizzes with AI grading and saved feedback.",
      "Rewrote the multiple-choice generation prompts so distractors reflect common student misconceptions instead of random wrong answers.",
      "Load-tested concurrent quiz submissions against PostgreSQL and fixed a race where an in-progress grade could overwrite a quiz reset.",
      "Used Yjs CRDTs to preserve widget inputs across refreshes and sync edits between collaborators; adapted workspace toolbars for narrow panes when chat is open.",
      "Fixed a math-parser bug that treated prices as equations; every PR merged through code review and the project's automated checks.",
    ],
    learning:
      "Shipping into a live open-source product means every change has to survive review, CI, and real users at once.",
    results: ["55+ GitHub stars", "Funded by UMD's Mokhtarzada Hatchery"],
    links: [{ label: "GitHub", href: "https://github.com/ThinkEx-OSS/thinkex" }],
  },
  {
    id: "adapt",
    name: "Adapt",
    category: "Software & AI",
    year: "2022 – 2024",
    description: "An open-source, privacy-focused alternative to Discord that reached ~1,000 users.",
    image: "adapt.png",
    alt: "The Adapt chat interface showing channels, active users, and conversations",
    tags: ["Rust", "PostgreSQL", "SolidJS", "WebSocket"],
    overview:
      "Adapt is a privacy-focused community chat platform released under the AGPL, with a Rust microservice backend (REST API, WebSocket gateway, file CDN, shared models), PostgreSQL, Redis, RabbitMQ, and a SolidJS web client that also runs as a PWA and a Tauri desktop app. I co-founded it in high school with Jaysen, who wrote most of the code.",
    role: "Co-founder; product, architecture decisions, and growth",
    details: [
      "Started from user research: gamers at school kept describing what frustrated them about existing platforms, and those complaints became the product's priorities around privacy, speed, and customization.",
      "Made the product and architecture calls with my co-founder: a microservice split, a public REST API with OpenAPI docs, and clients for web and desktop.",
      "Ran growth: a bridge Discord server, an alternate messaging path for people who could not switch all at once, and community outreach.",
    ],
    learning:
      "Privacy decisions shape the architecture from day one, and a platform only matters if people actually show up. Both halves were my job.",
    results: ["~1,000 users at peak", "Open source under the AGPL", "Web PWA and desktop clients"],
    links: [{ label: "GitHub", href: "https://github.com/AdaptChat" }],
  },
  {
    id: "surgisim",
    name: "SurgiSim AI",
    category: "Software & AI",
    year: "2026",
    description: "Interactive surgical training with live AI coaching.",
    tags: ["React", "FastAPI", "WebGL", "LLaMA 3.3-70B"],
    graphic: { caption: "SURGISIM / SYSTEM OVERVIEW", flow: ["Simulation", "AI coaching", "Feedback"] },
    overview:
      "A solo project: a surgical training simulator with procedure-specific WebGL scenes and instrument sets for laparoscopic cholecystectomy and appendectomy, with coaching streamed while you practice.",
    role: "Solo: frontend, backend, and prompt design",
    details: [
      "Streamed live coaching over server-sent events using LLaMA 3.3-70B on Groq, surfacing skill metrics mid-procedure rather than after the fact.",
      "Built a FastAPI backend for session state, scoring rubrics, and a dashboard tracking tissue-handling accuracy, idle time, and sequencing errors.",
    ],
    learning:
      "Feedback is more useful while someone is practicing than after. The whole design followed from that.",
    results: ["Sub-200 ms first-token latency for streamed coaching"],
  },
  {
    id: "i3p",
    name: "Reproducible Medical Segmentation",
    category: "Research",
    year: "Jun 2026 – Present",
    description: "Reproducing published segmentation results and finding out why the numbers did not match.",
    tags: ["PyTorch", "MMSegmentation", "Multi-GPU", "Dice / IoU"],
    graphic: { caption: "I3P LAB / MODEL EVALUATION", flow: ["Reproduce", "Measure", "Resolve"] },
    overview:
      "In Dr. Yu Gan's Intelligent Imaging and Image Processing Lab at UMD, I work on making medical image segmentation results reproducible across architectures and codebases.",
    role: "Undergraduate researcher",
    details: [
      "Reproduced nine benchmark experiments across three published segmentation architectures on ~5,500 medical images, verifying Dice and IoU with PyTorch and MMSegmentation on a 3× NVIDIA A6000 server.",
      "Found that two research codebases aggregate Dice and IoU differently, which explained discrepancies in published results and shaped the evaluation protocol for a paper in preparation for IEEE submission.",
      "Quantified a 2.50 Dice / 3.05 IoU sensitivity to the AdamW learning rate alone through controlled configuration ablations.",
      "Cut preprocessing for 450+ scans from 18 hours to 4 with parallelized pipelines, unblocking two models stalled by multi-GPU conflicts.",
    ],
    learning:
      "A reported metric is only as trustworthy as the code that computed it. Reading the evaluation code turned out to be the research.",
    results: ["Preprocessing time cut ~78%", "Evaluation protocol adopted for an IEEE paper in preparation"],
  },
  {
    id: "umsom",
    name: "Can Local LLMs Read Spatial Transcriptomics?",
    category: "Research",
    year: "Nov 2026 – Present",
    description: "Benchmarking open-weight language models on osteosarcoma reports, on a laptop.",
    tags: ["Gemma 4", "MedGemma", "LLM-as-judge", "Benchmarking"],
    graphic: { caption: "UMSOM / LLM EVALUATION", flow: ["Report", "Interpret", "Judge"] },
    overview:
      "At the University of Maryland School of Medicine, in Dr. Elana Fertig's lab, I am evaluating how reliably locally deployed, open-weight LLMs interpret spatial transcriptomics data without inventing claims the data does not support.",
    role: "Researcher",
    details: [
      "Running Gemma 4 and MedGemma locally via llmize on STAPLE-generated osteosarcoma reports, and testing whether their interpretations preserve quantitative evidence across cell-type composition, spatial autocorrelation, and differential gene expression.",
      "Benchmarking under controlled inference conditions, recording model version, context window, decoding parameters, runtime, and memory to characterize the quality-versus-cost trade-off on MacBook-class hardware.",
      "Using GPT-5 and Claude Sonnet as independent judges and comparing their scores with expert assessments on five dimensions: factual accuracy, completeness, evidence grounding, unsupported claims, and scientific value.",
    ],
    learning:
      "The central test is whether a model can identify a biological association, trace it to the measurements that support it, and recognize when the study design limits causal inference.",
    results: ["In progress"],
  },
];

export const experience = [
  {
    org: "Northrop Grumman",
    role: "Incoming Embedded Software Engineering Intern",
    when: "Summer 2027",
    where: "Baltimore, MD",
    summary: "Embedded software for defense systems. Starting June 2027.",
  },
  {
    org: "Scope Infotech",
    role: "AI Software Engineering Intern",
    when: "Jul 2026 — Present",
    where: "Remote",
    summary: "Governed data platform, RAG, fraud analytics, and security tooling for federal pursuits.",
    bullets: [
      "Delta Lake medallion lakehouse governing 52 tables with access control; semantic search and RAG over it.",
      "Medicare-claims fraud detection: 12 of 12 planted providers flagged.",
      "Vulnerability dashboard consolidating four static analyzers; triage volume cut 44%; demoed to the CISO.",
    ],
    project: "lakehouse",
  },
  {
    org: "University of Maryland School of Medicine · Fertig Lab",
    role: "Researcher",
    when: "Nov 2026 — Present",
    where: "Baltimore, MD",
    summary: "Benchmarking open-weight LLMs on spatial transcriptomics reports.",
    bullets: [
      "Gemma 4 and MedGemma run locally; evaluated with LLM judges against expert ratings on five dimensions.",
      "Quality-versus-compute trade-offs profiled on laptop-class hardware.",
    ],
    project: "umsom",
  },
  {
    org: "ThinkEx",
    role: "Software Engineering Intern",
    when: "Aug 2026 — Present",
    where: "College Park, MD",
    summary: "Open-source AI study workspace funded by UMD's Mokhtarzada Hatchery.",
    bullets: [
      "Model upgrade, AI-graded quizzes, misconception-driven distractors.",
      "PostgreSQL concurrency fixes; Yjs collaborative state; all work merged through review and CI.",
    ],
    project: "thinkex",
  },
  {
    org: "UMD · Intelligent Imaging and Image Processing (I3P) Lab",
    role: "Undergraduate Researcher, Dr. Yu Gan",
    when: "Jun 2026 — Present",
    where: "College Park, MD",
    summary: "Reproducible evaluation of medical image segmentation models.",
    bullets: [
      "Nine benchmarks reproduced across three architectures on ~5,500 images.",
      "Found inconsistent Dice/IoU aggregation across codebases; shaped the protocol for an IEEE paper in preparation.",
      "Preprocessing for 450+ scans cut from 18 h to 4 h.",
    ],
    project: "i3p",
  },
  {
    org: "Team PTERODACTYL · UMD near-space balloon payload",
    role: "Electronics Lead",
    when: "2026 — Present",
    where: "College Park, MD",
    summary: "Redesigning the payload sensor board in KiCad with a reviewed power architecture.",
    bullets: [
      "Legacy Eagle/Fusion board migrated to native KiCad and audited (DRC, ERC, schematic/PCB parity).",
      "v4 schematic with protected power path passes ERC with zero violations; first prototype released for fabrication.",
    ],
    project: "pterodactyl",
  },
  {
    org: "Claude Builder Club at UMD",
    role: "Events & Programming Coordinator",
    when: "2026 — Present",
    where: "College Park, MD",
    summary: "Bridging Anthropic and UMD students through workshops and hackathon programming.",
    bullets: [
      "Lead technical workshops for hackathon participants, such as exploratory data analysis with Claude.",
      "Most recent workshop drew about 200 attendees.",
    ],
  },
  {
    org: "A. James Clark School of Engineering · Cyber-Physical Systems Engineering",
    role: "Engineering Intern",
    when: "Jul — Aug 2025",
    where: "Shady Grove, MD",
    summary: "Co-led Jarvis Sort, an autonomous vision-guided sorting gantry.",
    bullets: [
      "Motion-control hardware, power distribution, and the vision-to-embedded bridge over MQTT.",
      "96.4% classification accuracy; 72% faster cycles; demoed to Maryland's Lt. Governor.",
    ],
    project: "jarvissort",
  },
  {
    org: "FTC Team 19818 Jade Innovations",
    role: "Co-captain · Software & Outreach",
    when: "2021 — 2025",
    where: "Potomac, MD",
    summary: "Four seasons of FIRST Tech Challenge; two World Championship appearances.",
    bullets: [
      "Kotlin control software: PID with feedforward and gain scheduling, FSM subsystem manager, inverse kinematics, odometry.",
      "Sponsorships from Bambu Lab, Fabworks, GenScript, UnitedHealthcare, Hughes, and UMD CPS Engineering; 900+ outreach hours.",
    ],
    project: "ftc",
  },
];

export const skills = [
  {
    icon: "chip",
    title: "Embedded & hardware",
    body: "Schematic capture, multi-layer PCB layout, power design, and bring-up with a scope and logic analyzer.",
    tools: "KiCad · STM32 · ESP32 · Teensy · I²C / SPI / UART · LoRa · SMD reflow",
  },
  {
    icon: "eye",
    title: "AI & computer vision",
    body: "From OpenCV trackers and CLIP classifiers to RAG pipelines and LLM evaluation.",
    tools: "PyTorch · OpenCV · CLIP · MMSegmentation · FAISS · sentence-transformers",
  },
  {
    icon: "layers",
    title: "Data platforms",
    body: "Governed lakehouses, anomaly detection, and reproducible multi-GPU experiments.",
    tools: "PySpark · Delta Lake · Databricks · PostgreSQL · SQL",
  },
  {
    icon: "code",
    title: "Software engineering",
    body: "Services, interfaces, and real-time systems that ship through review and CI.",
    tools: "Rust · Python · TypeScript · Kotlin · C/C++ · FastAPI · React · Docker",
  },
];
