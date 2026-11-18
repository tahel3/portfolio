import Chat from "@/components/Chat";

const GITHUB = "https://github.com/tahel3";
const LINKEDIN = "https://www.linkedin.com/in/tahel-eliya-888917374/";
const EMAIL = "tael6688@gmail.com";
const BOT = "https://poenix-bot.vercel.app/?lang=en";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {diagonal ? <path d="M7 17L17 7M9 7h8v8" /> : <path d="M5 12h14M13 6l6 6-6 6" />}
    </svg>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- DARK: hero + chat ---------- */}
      <div className="dark">
        <header className="nav container">
          <a href="#top" className="brand">
            <span className="mark">TE</span>
            <span>Tahel Eliya</span>
          </a>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#how">How the bot works</a>
            <a href="#contact">Contact</a>
            <a href="/cv/Tahel_Eliya_CV_FullStack.pdf" className="pill-outline" download>
              CV
            </a>
          </nav>
        </header>

        <section id="top" className="hero container">
          <div className="hero-text">
            <p className="status">
              <span className="dot" /> Full-Stack Developer · AI · Available now
            </p>
            <h1>
              Don&apos;t read my CV.
              <br />
              <span className="accent">Ask it.</span>
            </h1>
            <p className="lead">
              I&apos;m Tahel, a full-stack developer from Netanya. This chatbot knows my projects and my work at Bpreven, and it answers only from this site. It uses the same grounded-RAG approach I built at the Phoenix hackathon.
            </p>
            <div className="actions">
              <a href="#work" className="btn btn-light">
                Just show me the projects
              </a>
              <a href={GITHUB} className="btn btn-ghost">
                GitHub
              </a>
            </div>
          </div>
          <Chat />
        </section>

        <section id="how" className="container how">
          <div className="steps">
            <div className="step">
              <span className="kicker">01 · INDEX</span>
              <p>My CV and project write-ups are split into chunks and embedded with Gemini.</p>
            </div>
            <div className="step">
              <span className="kicker">02 · RETRIEVE</span>
              <p>Your question is embedded and matched to the closest chunks by cosine similarity.</p>
            </div>
            <div className="step">
              <span className="kicker">03 · ANSWER, WITH SOURCES</span>
              <p>If nothing is close enough, it says so without calling the LLM. Otherwise Gemini answers only from those chunks.</p>
            </div>
          </div>
          <p className="note">
            The chatbot is a portfolio project in its own right. <a href={`${GITHUB}/portfolio`}>Read its code</a>.
          </p>
        </section>
      </div>

      {/* ---------- LIGHT: case studies ---------- */}
      <main className="light">
        <section id="work" className="container work">
          <div className="section-head">
            <h2>Selected work</h2>
            <p>Each project: the problem, what I built, the hard part.</p>
          </div>

          {/* 01 Phoenix */}
          <article className="case">
            <div className="case-text">
              <span className="kicker blue">01 · AI · HACKATHON · OCT 2026</span>
              <h3>Grounded RAG chatbot for an insurance website</h3>
              <p>
                Insurance customers need answers they can trust. I built, alone, a chatbot that answers only from the Phoenix website, with a source link for every answer, and refuses when the answer isn&apos;t there. Hebrew and English.
              </p>
              <dl>
                <div>
                  <dt>Pipeline</dt>
                  <dd>Crawled the site with Firecrawl, embedded it with Gemini, and stored it in Supabase (pgvector) with hybrid vector and keyword search. Gemini Flash answers only from the retrieved passages.</dd>
                </div>
                <div>
                  <dt>Hard part</dt>
                  <dd>Not making things up. A similarity threshold refuses out-of-scope questions before the LLM is even called, and I evaluated the bot on a fixed set of test questions to check every answer was grounded in the source.</dd>
                </div>
              </dl>
              <Tags items={["Next.js", "TypeScript", "Python", "Gemini", "pgvector", "Vercel"]} />
              <div className="actions">
                <a href={BOT} className="btn btn-blue">
                  Live demo <Arrow diagonal />
                </a>
                <a href={`${GITHUB}/Poenix-Bot`} className="btn btn-dark-outline">
                  Code
                </a>
              </div>
            </div>
            <div className="case-visual chat-preview" aria-hidden="true">
              <div className="pv user">I have a water leak at home. How do I file a claim?</div>
              <div className="pv bot">
                The answer comes straight from the site&apos;s claims pages, with the link underneath.
                <span className="pv-src">source: claims</span>
              </div>
              <div className="pv user">What&apos;s the weather tomorrow?</div>
              <div className="pv bot">Sorry, this information does not appear on the Phoenix website.</div>
            </div>
          </article>

          {/* 02 Bpreven */}
          <article className="case" id="experience">
            <div className="case-text">
              <span className="kicker blue">02 · INDUSTRY · BPREVEN · JUN–OCT 2026</span>
              <h3>Secure data transfers for a healthcare platform</h3>
              <p>
                Software Engineer at Bpreven, a multi-tenant healthcare platform used by 1000+ users. In healthcare, every access to patient data has to be permitted and traceable. I built a secure data-transfer workflow for external providers, with approvals, transfer logs and vendor management for 8 providers. I also added authentication and authorization checks, kept API tokens in application secrets, and integrated AI services (OpenAI, Hume AI, ElevenLabs).
              </p>
              <p className="muted">The code is proprietary, so this is a case study, not a repo.</p>
              <Tags items={["ASP.NET Core (.NET 8)", "React + TypeScript", "SQL Server", "Docker"]} />
            </div>
            <div className="case-visual arch" aria-label="Simplified architecture: React client, ASP.NET Core API, SQL Server">
              <span className="arch-label">ARCHITECTURE (SIMPLIFIED)</span>
              <div className="box">React + TypeScript client</div>
              <span className="arch-link">REST · auth</span>
              <div className="box box-dark">ASP.NET Core API · multi-tenant</div>
              <div className="box-row">
                <div className="box box-accent">Approvals + transfer logs</div>
                <div className="box box-accent">Vendor management (8)</div>
              </div>
              <div className="box">SQL Server (Docker)</div>
              <p className="arch-foot">
                AI integrations: <b>OpenAI</b> · <b>Hume AI</b> · <b>ElevenLabs</b>
              </p>
            </div>
          </article>

          {/* 03 + 04 */}
          <div className="pair">
            <article className="card">
              <video className="demo" controls preload="none" poster="/skillmate-poster.jpg">
                <source src="/skillmate-demo.mp4" type="video/mp4" />
              </video>
              <span className="kicker blue">03 · FULL-STACK · 60-SEC DEMO</span>
              <h3>SkillMate: peer-to-peer skill exchange</h3>
              <p>
                Learners book sessions with mentors, chat in real time and get suggestions from an AI advisor. A scheduled job runs the waitlist and emails the next person when a spot opens.
              </p>
              <Tags items={["Spring Boot", "React + Redux", "WebSockets / STOMP", "JWT"]} />
              <a href={`${GITHUB}/skillMate`} className="text-link">
                View code on GitHub <Arrow />
              </a>
            </article>

            <article className="card">
              <div className="progress-visual" aria-hidden="true">
                <span className="pv-title">Live campaign</span>
                <div className="bar">
                  <div className="fill" />
                </div>
                <div className="bar-meta">
                  <span>Updates on every donation</span>
                  <span className="live">
                    <span className="dot green" /> live
                  </span>
                </div>
              </div>
              <span className="kicker blue">04 · REAL-TIME · TEAM OF 2</span>
              <h3>Campaign+: live donation campaigns</h3>
              <p>Admins run fundraising campaigns, and donors watch progress update the moment someone donates, with no page refresh.</p>
              <Tags items={["Node.js + Express", "MongoDB", "Socket.io", "Chart.js"]} />
              <a href={`${GITHUB}/CampaignPlus`} className="text-link">
                View code on GitHub <Arrow />
              </a>
            </article>
          </div>

          <div className="lab">
            <div>
              <span className="kicker amber">IN THE LAB · PYTHON · LLM</span>
              <h3>AI Log Doctor</h3>
              <p>A Python tool with an object-oriented design: parse → group recurring errors → LLM root-cause analysis → report, in a Tkinter GUI.</p>
            </div>
            <span className="badge-amber">In development</span>
          </div>
        </section>

        <section id="stack" className="container stack">
          <h2>Stack</h2>
          <div className="stack-grid">
            <div>
              <span className="kicker">FRONTEND</span>
              <p>React, TypeScript, Next.js, Angular, Redux Toolkit, MUI</p>
            </div>
            <div>
              <span className="kicker">BACKEND</span>
              <p>C# / ASP.NET Core, Java / Spring Boot, Node.js / Express, Python</p>
            </div>
            <div>
              <span className="kicker">DATA</span>
              <p>SQL Server, PostgreSQL / pgvector, MongoDB</p>
            </div>
            <div>
              <span className="kicker">AI + TOOLS</span>
              <p>RAG, Gemini, OpenAI, OpenRouter, Docker, Git, Claude Code, Cursor</p>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- CONTACT ---------- */}
      <footer id="contact" className="footer">
        <div className="container">
          <h2>
            Let&apos;s build
            <br />
            something.
          </h2>
          <div className="actions">
            <a href={`mailto:${EMAIL}`} className="btn btn-lime">
              {EMAIL}
            </a>
            <a href={LINKEDIN} className="btn btn-white-outline">
              LinkedIn
            </a>
            <a href={GITHUB} className="btn btn-white-outline">
              GitHub
            </a>
          </div>
          <div className="cv-row">
            <span>Download CV:</span>
            <a href="/cv/Tahel_Eliya_CV_FullStack.pdf" download>
              Full-Stack
            </a>
            <a href="/cv/Tahel_Eliya_CV_AI_Engineer.pdf" download>
              AI Engineering
            </a>
          </div>
          <p className="copy">© 2026 Tahel Eliya · Netanya, Israel</p>
        </div>
      </footer>
    </>
  );
}
