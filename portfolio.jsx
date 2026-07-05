import { useEffect, useRef, useState } from "react";

const TERMINAL_LINES = [
  { text: "$ jenkins run regression-suite --project lexis-nexis", cls: "" },
  { text: "Collecting 1,000+ automation scripts...", cls: "" },
  { text: "Executing 1,500 tests across Lexis Advance & Lexis+ AI...", cls: "" },
  { text: "8 Search Re-platforming cycles verified · stability 97%", cls: "" },
  { text: "Defects logged: 150 project · 60 ad-hoc", cls: "" },
  { text: "PASS RATE: 95%+ ✓", cls: "pass" },
  { text: "$ status: ready for next release_", cls: "" },
];

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: "opacity .5s ease, transform .5s ease",
      }}
    >
      {children}
    </div>
  );
}

function Terminal() {
  const [displayLines, setDisplayLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let li = 0;
    let ci = 0;
    let cancelled = false;

    function step() {
      if (cancelled) return;
      if (li >= TERMINAL_LINES.length) {
        setDone(true);
        return;
      }
      const line = TERMINAL_LINES[li];
      ci++;
      setDisplayLines((prev) => {
        const next = prev.slice(0, li);
        next[li] = { text: line.text.slice(0, ci), cls: line.cls };
        return next;
      });
      if (ci >= line.text.length) {
        li++;
        ci = 0;
        setTimeout(step, 260);
      } else {
        setTimeout(step, li === 0 ? 22 : 14);
      }
    }
    step();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="terminal">
      <div className="term-bar">
        <span className="term-dot r" />
        <span className="term-dot y" />
        <span className="term-dot g" />
        <span className="term-title">regression-suite — jenkins</span>
      </div>
      <div className="term-body">
        {displayLines.map((l, i) => (
          <div key={i} className={`term-line ${l.cls === "pass" ? "term-pass" : ""}`}>
            {l.text}
          </div>
        ))}
        {done && <span className="cursor" />}
      </div>
    </div>
  );
}

const STATS = [
  { num: "1,000+", label: "automation scripts maintained" },
  { num: "97%", label: "stability rate across 8 SRP cycles" },
  { num: "95%+", label: "daily pass rate, 1,500+ tests" },
  { num: "210+", label: "defects identified & logged" },
];

const STAGES = [
  {
    tag: "Build",
    status: "✓ stable",
    title: "Cognizant — Quality Engineering & Assurance",
    meta: "Project: Lexis Nexis (RELX) · Coimbatore · Oct 2022 – Present",
    bullets: [
      "Engineered and maintained 1,000+ automation test scripts for Lexis Advance and Lexis+ AI, cutting error-detection latency.",
      "Spearheaded 8 Search Re-platforming (SRP) cycles, building ~600 smoke and regression test cases from scratch at a 97% stability rate.",
    ],
  },
  {
    tag: "Test",
    status: "✓ 95%+ pass",
    title: "CI/CD Ownership & Defect Discovery",
    meta: "Jenkins Pipelines · Daily Analysis",
    bullets: [
      "Managed daily analysis of 1,500+ automation tests via Jenkins, keeping pass rates above 95% through proactive script maintenance and stakeholder reporting.",
      "Identified and logged 150+ project-specific defects and 60+ ad-hoc defects in high-complexity modules, preventing critical escapes to production.",
    ],
  },
  {
    tag: "Document",
    status: "✓ shipped",
    title: "Framework Documentation & Lifecycle Management",
    meta: "Confluence · Test Plans · M&R Testing",
    bullets: [
      "Authored technical documentation and KT video libraries in Confluence, reducing ramp-up time for new joiners.",
      "Owned end-to-end test management — test plans, scenarios, and execution for Maintenance and Release testing.",
    ],
  },
  {
    tag: "Deploy",
    status: "✓ AI-augmented",
    title: "AI-Driven Development",
    meta: "GitHub Copilot · Claude · Claude Code",
    bullets: [
      "Used GitHub Copilot and Claude in day-to-day engineering, and Claude Code for repository changes and pull requests at a mid-level engineering standard.",
      "Built an AI-powered Test Analysis Agent that turns raw testing reports into a readable dashboard, improving test-health visibility for stakeholders.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    title: "Automation & Testing",
    chips: ["Selenium WebDriver", "Cucumber BDD", "TestNG", "Page Object Model", "Selenium (C# & Java)", "SpecFlow"],
  },
  {
    title: "Languages & Tools",
    chips: ["Core Java", "SQL", "Maven", "Apache POI", "Postman"],
  },
  {
    title: "DevOps & Cloud",
    chips: ["Jenkins Pipelines", "Azure (AZ-900)", "Git", "Azure TFS"],
  },
  {
    title: "Monitoring, Collaboration & AI",
    chips: ["Confluence", "Splunk", "Agile/Scrum", "Playwright (TS) — upskilling", "GitHub Copilot", "Claude & Claude Code"],
  },
];

const PROJECTS = [
  {
    status: "In production",
    title: "Test Analysis Agent",
    desc: "A lightweight AI-assisted workflow that ingests Jenkins execution data, classifies failures, summarizes regressions, and converts raw test results into stakeholder-ready insights for faster triage and decision-making.",
    stack: ["LLM Workflow", "Jenkins Data", "Failure Analytics", "Dashboards"],
  },
  {
    status: "Side project",
    title: "BugDigger",
    desc: "A bug-tracking and triage tool built with React and the Claude API, designed to speed up how defects get captured and categorized.",
    stack: ["React", "Claude API"],
  },
  {
    status: "Framework",
    title: "Java-Selenium Automation Framework",
    desc: "This framework is a reusable test automation foundation built for the Lexis Nexis platform to streamline web UI validation across critical business flows. It combines Java, Selenium WebDriver, Cucumber BDD, and the Page Object Model to make test cases maintainable, readable, and scalable. The framework enables consistent execution of smoke and regression suites, supports structured test data handling, and helps reduce manual effort while improving reliability across releases.",
    stack: ["Java", "Selenium", "Cucumber", "POM", "Test Data"],
  },
];

const CONTACT_EMAIL = "naddunurisaikumar@gmail.com";

function openContactMail(event) {
  event.preventDefault();
  const subject = encodeURIComponent("Portfolio inquiry");
  const body = encodeURIComponent("Hi Saikumar,\n\nI came across your portfolio and would love to connect.\n");
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

const HERO_TAGS = [
  "Selenium WebDriver",
  "Cucumber BDD",
  "Jenkins CI/CD",
  "Java · C#",
  "Playwright",
  "Azure Fundamentals",
];

const CONTACT_LINKS = [
  { label: CONTACT_EMAIL, small: "Email", href: `mailto:${CONTACT_EMAIL}`, onClick: openContactMail },
  { label: "+91-8106853031", small: "Mobile", href: "tel:+918106853031" },
];

const STYLES = `
  .portfolio-root{
    --bg:#0D1117; --bg-raised:#141B24; --surface:#1A222C; --line:#29323D;
    --text:#E8EDF2; --text-muted:#8B98A9; --accent:#5EEAD4; --accent-dim:#2C6E64;
    --amber:#F5A623; --rose:#FB7185;
    --mono:'JetBrains Mono', ui-monospace, monospace;
    --sans:'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    background:var(--bg); color:var(--text); font-family:var(--sans); line-height:1.6;
  }
  .portfolio-root *{ box-sizing:border-box; }
  .portfolio-root a{ color:inherit; text-decoration:none; }
  .wrap{ max-width:1040px; margin:0 auto; padding:0 28px; }
  .section{ padding:96px 0; border-bottom:1px solid var(--line); }
  .section:last-of-type{ border-bottom:none; }
  .eyebrow{ font-family:var(--mono); font-size:12.5px; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:10px; margin-bottom:18px; }
  .eyebrow::before{ content:""; width:7px; height:7px; background:var(--accent); border-radius:50%; box-shadow:0 0 0 3px rgba(94,234,212,.15); }
  .h2{ font-family:var(--mono); font-weight:700; font-size:clamp(24px,3vw,32px); letter-spacing:-.01em; margin-bottom:44px; }
  .h2 .idx{ color:var(--text-muted); font-weight:500; }
  header.nav{ position:sticky; top:0; z-index:50; background:rgba(13,17,23,.85); backdrop-filter:blur(10px); border-bottom:1px solid var(--line); }
  .nav-inner{ max-width:1040px; margin:0 auto; padding:16px 28px; display:flex; align-items:center; justify-content:space-between; }
  .nav-brand{ font-family:var(--mono); font-weight:700; font-size:14px; }
  .nav-links{ display:flex; gap:26px; font-family:var(--mono); font-size:12.5px; color:var(--text-muted); }
  .nav-links a:hover{ color:var(--accent); }
  .nav-cta-wrap{ position:relative; }
  .nav-cta{ font-family:var(--mono); font-size:12px; padding:8px 14px; border:1px solid var(--accent-dim); border-radius:6px; color:var(--accent); background:transparent; cursor:pointer; }
  .nav-cta:hover{ background:var(--accent); color:#04201C; }
  .nav-dropdown{ position:absolute; right:0; top:calc(100% + 8px); min-width:220px; background:var(--bg-raised); border:1px solid var(--line); border-radius:8px; padding:8px; box-shadow:0 16px 40px rgba(0,0,0,.3); display:none; z-index:60; }
  .nav-cta-wrap:hover .nav-dropdown, .nav-cta-wrap:focus-within .nav-dropdown{ display:block; }
  .nav-dropdown a{ display:flex; flex-direction:column; gap:2px; padding:10px 12px; border-radius:6px; font-family:var(--mono); font-size:11.5px; color:var(--text); }
  .nav-dropdown a:hover{ background:var(--surface); color:var(--accent); }
  .nav-dropdown small{ color:var(--text-muted); font-size:10px; }
  @media (max-width:720px){ .nav-links{ display:none; } }
  .hero{ padding:88px 0 72px; border-bottom:1px solid var(--line); }
  .hero-grid{ display:grid; grid-template-columns:1.1fr 1fr; gap:56px; align-items:center; }
  @media (max-width:860px){ .hero-grid{ grid-template-columns:1fr; } }
  .hero h1{ font-family:var(--mono); font-size:clamp(30px,4.4vw,44px); line-height:1.18; font-weight:800; letter-spacing:-.01em; margin-bottom:18px; }
  .hero-role{ font-size:16px; color:var(--text-muted); margin-bottom:26px; max-width:46ch; }
  .hero-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
  .tag{ font-family:var(--mono); font-size:11.5px; letter-spacing:.03em; padding:6px 10px; border:1px solid var(--line); border-radius:5px; color:var(--text-muted); background:var(--bg-raised); }
  .hero-actions{ display:flex; gap:12px; flex-wrap:wrap; }
  .btn{ font-family:var(--mono); font-size:13px; font-weight:600; padding:12px 20px; border-radius:7px; display:inline-flex; align-items:center; gap:8px; }
  .btn-primary{ background:var(--accent); color:#04201C; }
  .btn-primary:hover{ box-shadow:0 0 0 4px rgba(94,234,212,.18); }
  .btn-ghost{ border:1px solid var(--line); color:var(--text); }
  .btn-ghost:hover{ border-color:var(--accent); color:var(--accent); }
  .terminal{ background:var(--bg-raised); border:1px solid var(--line); border-radius:12px; overflow:hidden; box-shadow:0 30px 60px -30px rgba(0,0,0,.6); }
  .term-bar{ display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--line); background:var(--surface); }
  .term-dot{ width:10px; height:10px; border-radius:50%; }
  .term-dot.r{ background:#FB7185; } .term-dot.y{ background:#F5A623; } .term-dot.g{ background:#5EEAD4; }
  .term-title{ margin-left:8px; font-family:var(--mono); font-size:11.5px; color:var(--text-muted); }
  .term-body{ font-family:var(--mono); font-size:13px; padding:22px 20px; min-height:230px; color:#CBD5E1; }
  .term-line{ white-space:pre-wrap; margin-bottom:4px; }
  .term-pass{ color:var(--accent); font-weight:700; }
  .cursor{ display:inline-block; width:7px; height:14px; background:var(--accent); vertical-align:middle; animation:blink 1s step-end infinite; }
  @keyframes blink{ 50%{ opacity:0; } }
  .stats{ padding:52px 0; border-bottom:1px solid var(--line); }
  .stats-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
  @media (max-width:720px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
  .stat-num{ font-family:var(--mono); font-size:clamp(26px,3vw,34px); font-weight:800; color:var(--accent); }
  .stat-label{ font-size:12.5px; color:var(--text-muted); margin-top:6px; }
  .stage{ display:grid; grid-template-columns:150px 1fr; gap:28px; padding:26px 0; border-top:1px solid var(--line); }
  .stage:first-child{ border-top:none; }
  .stage-tag{ font-family:var(--mono); font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--amber); padding-top:3px; }
  .stage-status{ display:block; margin-top:8px; font-size:10.5px; color:var(--accent); }
  .stage h3{ font-size:18px; font-weight:700; margin-bottom:6px; }
  .stage .meta{ font-family:var(--mono); font-size:12px; color:var(--text-muted); margin-bottom:14px; }
  .stage ul{ list-style:none; padding:0; margin:0; }
  .stage li{ position:relative; padding-left:20px; margin-bottom:10px; font-size:14.5px; color:#C7D0DA; }
  .stage li::before{ content:"›"; position:absolute; left:0; color:var(--accent); font-weight:700; }
  @media (max-width:640px){ .stage{ grid-template-columns:1fr; gap:8px; } }
  .skill-groups{ display:grid; grid-template-columns:repeat(2,1fr); gap:28px 40px; }
  @media (max-width:720px){ .skill-groups{ grid-template-columns:1fr; } }
  .skill-group-title{ font-family:var(--mono); font-size:12px; color:var(--text-muted); text-transform:uppercase; letter-spacing:.08em; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--line); }
  .chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
  .chip{ font-family:var(--mono); font-size:12.5px; padding:7px 12px; background:var(--bg-raised); border:1px solid var(--line); border-radius:6px; color:var(--text); }
  .chip:hover{ border-color:var(--accent); color:var(--accent); }
  .proj-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  @media (max-width:860px){ .proj-grid{ grid-template-columns:1fr; } }
  .proj-card{ background:var(--bg-raised); border:1px solid var(--line); border-radius:10px; padding:24px; display:flex; flex-direction:column; gap:12px; transition:transform .18s ease, border-color .18s ease; }
  .proj-card:hover{ transform:translateY(-4px); border-color:var(--accent-dim); }
  .proj-status{ font-family:var(--mono); font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent); display:inline-flex; align-items:center; gap:6px; width:fit-content; padding:3px 8px; border:1px solid var(--accent-dim); border-radius:20px; }
  .proj-status::before{ content:"●"; font-size:8px; }
  .proj-card h3{ font-size:16.5px; font-weight:700; margin:0; }
  .proj-card p{ font-size:13.5px; color:var(--text-muted); flex-grow:1; margin:0; }
  .proj-stack{ display:flex; flex-wrap:wrap; gap:6px; }
  .proj-stack span{ font-family:var(--mono); font-size:10.5px; color:var(--text-muted); }
  .two-col{ display:grid; grid-template-columns:1fr 1fr; gap:40px; }
  @media (max-width:720px){ .two-col{ grid-template-columns:1fr; } }
  .cred{ display:flex; gap:14px; padding:16px 0; border-top:1px solid var(--line); }
  .cred:first-child{ border-top:none; }
  .cred-icon{ font-family:var(--mono); font-size:11px; color:var(--accent); width:34px; height:34px; flex-shrink:0; border:1px solid var(--accent-dim); border-radius:8px; display:flex; align-items:center; justify-content:center; }
  .cred h4{ font-size:14.5px; font-weight:700; margin:0 0 2px; }
  .cred p{ font-size:13px; color:var(--text-muted); margin:0; }
  .contact{ text-align:center; padding:100px 0 60px; }
  .contact p{ color:var(--text-muted); max-width:46ch; margin:0 auto 34px; }
  .contact-actions{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .footer{ text-align:center; padding:28px 0 40px; font-family:var(--mono); font-size:11.5px; color:var(--text-muted); }
`;

export default function Portfolio() {
  return (
    <div className="portfolio-root">
      <style>{STYLES}</style>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      <header className="nav">
        <div className="nav-inner">
          <div className="nav-brand">
            Saikumar
          </div>
          <nav className="nav-links">
            <a href="#experience">experience</a>
            <a href="#skills">skills</a>
            <a href="#projects">projects</a>
            <a href="#credentials">credentials</a>
          </nav>
          <div className="nav-cta-wrap">
            <button className="nav-cta" type="button">
              Contact ▾
            </button>
            <div className="nav-dropdown">
              {CONTACT_LINKS.map((item) => (
                <a key={item.small} href={item.href} onClick={item.onClick}>
                  <span>{item.label}</span>
                  <small>{item.small}</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">Automation Test Engineer</div>
            <h1>
              Saikumar Naddunuri
            </h1>
            <p className="hero-role">
              QA Automation Engineer with 3+ years of experience building reliable test frameworks, improving release quality, and delivering high-confidence automation for complex software products.
            </p>
            <div className="hero-tags">
              {HERO_TAGS.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <a
                className="btn btn-ghost"
                href="https://www.linkedin.com/in/saikumar-naddunuri-4162a5226/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a className="btn btn-primary" href="/Saikumar_Naddunuri_01072026.pdf" download>
                Download Resume
              </a>
            </div>
          </div>
          <Terminal />
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap">
          <h2 className="h2">
            <span className="idx">01 /</span> About Me
          </h2>
          <div className="two-col">
            <Reveal>
              <p style={{ fontSize: '16px', color: '#C7D0DA', margin: 0 }}>
                I am a QA Automation Engineer with hands-on experience in designing and maintaining robust test automation frameworks for complex enterprise applications. My work focuses on improving release quality, accelerating validation cycles, and strengthening confidence in software delivery through scalable automation, strong defect analysis, and CI/CD-driven testing practices.
              </p>
            </Reveal>
            <Reveal>
              <div className="proj-card" style={{ gap: '8px' }}>
                <span className="proj-status">Career Focus</span>
                <h3>Building quality engineering impact at scale</h3>
                <p>I’m focused on contributing to high-performing QA teams where automation strategy, release readiness, and product reliability are critical to business success.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="wrap">
          <h2 className="h2">
            <span className="idx">02 /</span> Experience
          </h2>
          <div>
            {STAGES.map((s) => (
              <Reveal key={s.title} className="stage">
                <div className="stage-tag">
                  {s.tag}
                  <span className="stage-status">{s.status}</span>
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <div className="meta">{s.meta}</div>
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="wrap">
          <h2 className="h2">
            <span className="idx">03 /</span> Skills
          </h2>
          <div className="skill-groups">
            {SKILL_GROUPS.map((g) => (
              <Reveal key={g.title}>
                <div className="skill-group-title">{g.title}</div>
                <div className="chip-row">
                  {g.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="wrap">
          <h2 className="h2">
            <span className="idx">04 /</span> Projects
          </h2>
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <Reveal key={p.title} className="proj-card">
                <span className="proj-status">{p.status}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="proj-stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="credentials">
        <div className="wrap">
          <h2 className="h2">
            <span className="idx">05 /</span> Credentials
          </h2>
          <div className="two-col">
            <div>
              <div className="skill-group-title">Certifications</div>
              <Reveal className="cred">
                <div className="cred-icon">AZ</div>
                <div>
                  <h4>Microsoft Certified: Azure Fundamentals (AZ-900)</h4>
                  <p>Microsoft</p>
                </div>
              </Reveal>
            </div>
            <div>
              <div className="skill-group-title">Education</div>
              <Reveal className="cred">
                <div className="cred-icon">MS</div>
                <div>
                  <h4>Master of Computer Applications</h4>
                  <p>St. John's Institute of Science and Technologies · 2024</p>
                </div>
              </Reveal>
              <Reveal className="cred">
                <div className="cred-icon">BS</div>
                <div>
                  <h4>B.Sc. Computer Science</h4>
                  <p>Chanda Kanthaiah Memorial Arts and Science College · 2021</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="wrap">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Get in touch
          </div>
          <h2 className="h2">Let’s build quality into your next release.</h2>
          <p>Open to SDET, QA Automation, and Software Testing opportunities. I’m interested in roles where I can contribute to reliable delivery and continuous quality improvement.</p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${CONTACT_EMAIL}`} onClick={openContactMail}>
              naddunurisaikumar@gmail.com
            </a>
            <a className="btn btn-ghost" href="tel:+918106853031">
              +91-8106853031
            </a>
            <a
              className="btn btn-ghost"
              href="https://www.linkedin.com/in/saikumar-naddunuri-4162a5226/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">Coimbatore, India · Built with care, tested with discipline.</footer>
    </div>
  );
}
