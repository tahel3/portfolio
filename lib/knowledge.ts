// The chatbot's knowledge base: everything it is allowed to say about Tahel.
// Each entry is one chunk that is embedded and retrieved. Keep facts accurate:
// the bot answers ONLY from this text. Evidence is written strongest-first:
// production work, then real projects, then coursework.

export type Chunk = { id: string; title: string; text: string };

export const KNOWLEDGE: Chunk[] = [
  // ---------- Pitch and fit ----------
  {
    id: "pitch",
    title: "Who Tahel is and why hire her (summary for general questions)",
    text: `Tahel Eliya is a full-stack developer with production experience on a healthcare platform used by 1000+ users, who also ships AI features: RAG pipelines and LLM integrations. At Bpreven she delivered end-to-end features across React/TypeScript, C#/ASP.NET Core and SQL Server, including a secure third-party data-transfer feature with approvals, transfer logs, consent management and vendor management for 8 external providers. On her own she built a grounded RAG chatbot at a hackathon (Python, Gemini, pgvector, Next.js) and full-stack projects in Spring Boot + React, Node.js and .NET. Roles she is targeting, in order: Full-Stack Developer, AI Engineer, Backend Developer, Frontend Developer. She is based in Netanya and available immediately for a full-time role.`,
  },
  {
    id: "fit-fullstack",
    title: "Fit for a Full-Stack Developer role",
    text: `For full-stack roles: at Bpreven Tahel worked across every layer of a live multi-tenant platform: React + TypeScript UI (RTK Query, RTL layout), ASP.NET Core APIs in a layered architecture (controllers, business logic, data layer), SQL Server, authentication and authorization. She has also built complete full-stack projects end to end: SkillMate (Spring Boot + React, real-time chat, JWT), Campaign+ (Node.js, MongoDB, Socket.io), a car rental system (C# + Angular) and a savings tracker (.NET Web API). She builds responsive UIs and is comfortable debugging across browser, server and database.`,
  },
  {
    id: "fit-ai",
    title: "Fit for an AI Engineer role",
    text: `For AI engineering roles: Tahel built a complete RAG system solo at a hackathon: crawling with Firecrawl, chunking and Gemini embeddings in Python, Supabase pgvector with hybrid vector and keyword search, a similarity threshold that refuses out-of-scope questions without calling the LLM, and an evaluation script with a fixed set of test questions to check grounding. At Bpreven she integrated AI services into production (OpenAI, Hume AI, ElevenLabs). In SkillMate she integrated an LLM advisor through OpenRouter with a fallback model for rate limits. This portfolio's chatbot is another RAG system she built. She is building AI Log Doctor, a multi-step LLM workflow in Python, and writes custom Claude Code skills.`,
  },
  {
    id: "experience-length",
    title: "How much experience she has (honest answer for questions about seniority or the 5-month role)",
    text: `Tahel's professional experience is one role: Software Engineer at Bpreven, June to October 2026, about 5 months. It was real production work, not a training exercise: she worked on a live multi-tenant healthcare platform used by 1000+ users, owned a full feature (third-party data-transfer management with 5 sub-components), debugged existing production code regularly, and worked in an Agile team with code reviews. Around that she has built several complete projects on her own or in a team of two, across Java, C#, Node.js, Python and React, and a solo RAG system at a hackathon. She becomes productive in new stacks quickly.`,
  },
  {
    id: "availability",
    title: "Availability, work preferences and contact",
    text: `Tahel is available immediately for a full-time position. She is based in Netanya, Israel. Contact: email tael6688@gmail.com, LinkedIn linkedin.com/in/tahel-eliya-888917374, GitHub github.com/tahel3. Two CV versions can be downloaded from this site: Full-Stack and AI Engineering.`,
  },

  // ---------- Bpreven ----------
  {
    id: "bpreven",
    title: "Experience: Software Engineer at Bpreven (June – October 2026)",
    text: `Tahel was a Software Engineer at Bpreven from June to October 2026, delivering end-to-end features for a multi-tenant healthcare platform used by 1000+ users. Stack: React + TypeScript, C# with ASP.NET Core (.NET 8), SQL Server in Docker, EF Core. She worked in an Agile/Scrum team using GitHub and Jira, with code reviews and documentation, and tested endpoints with Postman. Debugging and fixing existing production code was a regular part of the role, not only new features. The code is proprietary.`,
  },
  {
    id: "bpreven-data-transfer",
    title: "Bpreven: third-party data-transfer management feature (her main feature)",
    text: `Tahel's main feature at Bpreven was Third-Party Data Transfer Management: in healthcare every transfer of patient data to an external provider must be permitted and traceable. She built it as five parts: vendor and data-mapping management for 8 external providers, an audit log of transfers, an admin consent dashboard, consent modals for practitioners and clients, and a practitioner privacy center. It included approvals, transfer logs, authentication and authorization checks, and API tokens kept in application secrets. She also wrote a full project book for it covering requirements and technical design.`,
  },
  {
    id: "bpreven-hard-problems",
    title: "Bpreven: hardest problems she solved",
    text: `Hard problems Tahel solved at Bpreven: enforcing privacy consent consistently across several API controllers (for example appointments), so data is only used when consent exists; diagnosing 401, 403 and 429 errors, including JWT audience mismatches and SignalR authentication; fixing a Hume AI upload failure caused by how the file was sent (StreamContent versus ByteArrayContent) and debugging the OpenAI chat integration; and recovering lost endpoints by merging refactored controller versions.`,
  },
  {
    id: "bpreven-sql",
    title: "SQL and databases: what she actually did",
    text: `At Bpreven Tahel worked hands-on with SQL Server: she created tables for the privacy features (such as user privacy consent and deletion requests), worked with EF Core migrations and schemas, fixed data issues directly in SQL (for example a SqlNullValueException caused by nullable columns, and SQL password hashing with SHA2_512 and a salt), and managed several database environments (dev, test) in Docker, including restoring backups. In her projects she has also used PostgreSQL with pgvector (Supabase), MongoDB and H2 with JPA.`,
  },

  // ---------- Projects ----------
  {
    id: "phoenix-rag",
    title: "Project: Phoenix website AI assistant (hackathon, October 2026)",
    text: `At a hackathon in October 2026 Tahel designed and built, on her own, an AI assistant that answers customer questions only from the website of The Phoenix insurance company, with a source link for every answer, and refuses when the answer is not on the site. Pipeline in Python: Firecrawl crawling, chunking by headings, Gemini embeddings, Supabase pgvector with hybrid vector + keyword search, and an evaluation script with fixed test questions. Frontend: a bilingual Hebrew/English chat in Next.js and TypeScript on Vercel. She used AI coding tools as a deliberate part of the work. Live demo: poenix-bot.vercel.app.`,
  },
  {
    id: "skillmate",
    title: "Project: SkillMate, a mentor matchmaking platform",
    text: `SkillMate is a full-stack skill-sharing platform Tahel architected and built: Java 21 Spring Boot backend and React frontend (Redux Toolkit / RTK Query, Material UI). Learners search skills, book sessions in a mentor's available slots and leave reviews. Three roles (learner, mentor, both) with JWT and Spring Security, real-time chat over WebSockets (STOMP + SockJS), and an automated waiting list where a scheduled job emails the next learner when a spot opens. It also has an AI Skill Advisor feature built on the OpenRouter API, with API-key handling, error handling and a fallback model for rate limits. Code: github.com/tahel3/skillMate; a 60-second demo video is on this site.`,
  },
  {
    id: "campaign-plus",
    title: "Project: Campaign+ / Donation Dashboard",
    text: `Campaign+ (Donation Dashboard) is a real-time donation campaign platform built in a team of two: Node.js with Express, cloud-hosted MongoDB, Socket.io for live updates and Chart.js visualizations, with backend validation. Donors see campaign progress update the moment someone donates, without refreshing. Code: github.com/tahel3/CampaignPlus.`,
  },
  {
    id: "car-rental",
    title: "Project: car rental system (C# + Angular)",
    text: `A car rental management system Tahel built in a team of two, with a C# backend and an Angular frontend connected by a REST API and a database. It includes the customer booking and rental flow and a registration and authentication system.`,
  },
  {
    id: "savings-tracker",
    title: "Project: personal savings tracker (.NET)",
    text: `A personal savings and budget tracker Tahel built on her own with .NET Core Web API: users log income and expenses, manage them with full CRUD, and see charts based on their data.`,
  },
  {
    id: "ai-log-doctor",
    title: "Project in development: AI Log Doctor (Python)",
    text: `AI Log Doctor is a Python tool Tahel is currently building with an object-oriented design. It parses application logs, groups recurring errors, and runs a multi-step LLM workflow (parse, group, analyze, report): each error group is sent to Gemini for root-cause analysis, and results are shown in a Tkinter GUI. It is still in development.`,
  },
  {
    id: "this-site",
    title: "This portfolio and its chatbot",
    text: `This portfolio was built with Next.js and TypeScript. Its chatbot is a RAG system: Tahel's experience and project write-ups are chunked and embedded with Gemini, each question is matched by cosine similarity, clearly off-topic questions are refused without calling the LLM, and Gemini answers only from the retrieved chunks, with a fallback chain of models when one is overloaded.`,
  },

  // ---------- Skills with evidence ----------
  {
    id: "skill-python",
    title: "Python experience",
    text: `Python evidence, strongest first: the hackathon RAG pipeline (crawling, chunking, Gemini embeddings into pgvector, and an evaluation script) was written in Python; AI Log Doctor, her current project, is an object-oriented Python tool with an LLM workflow and a Tkinter GUI. Her Software Practical Engineering studies included a Python course covering basics and OOP, data structures and algorithms, libraries and data handling, files, sockets and Tkinter. She also uses Python in a penetration testing and cyber security course at ITSAFE.`,
  },
  {
    id: "skill-csharp",
    title: "C# and .NET experience",
    text: `C#/.NET evidence: production work at Bpreven on ASP.NET Core (.NET 8) APIs in a layered architecture, with EF Core, authentication, authorization, user secrets and AI service integrations; plus her own projects: a car rental system (C# backend with Angular) and a savings tracker (.NET Core Web API).`,
  },
  {
    id: "skill-frontend",
    title: "Frontend: React, TypeScript, Angular, Next.js",
    text: `Frontend evidence: React + TypeScript in production at Bpreven (RTK Query, sidebar and privacy-center UI, RTL layout fixes); React with Redux Toolkit and Material UI in SkillMate; Next.js and TypeScript for the Phoenix bot and this portfolio; Angular in the car rental system. She builds responsive UIs in all her projects.`,
  },
  {
    id: "skill-backend",
    title: "Backend: APIs, Java, Node.js, security",
    text: `Backend evidence: ASP.NET Core APIs in production at Bpreven; Java 21 Spring Boot with Spring Security, JWT, JPA, WebSockets and scheduled jobs in SkillMate; Node.js with Express, MongoDB and Socket.io in Campaign+; Next.js API routes for her RAG bots. She has hands-on experience with authentication, authorization, consent enforcement and secure handling of API keys and secrets.`,
  },
  {
    id: "skill-ai-tools",
    title: "How she works with AI coding tools",
    text: `Tahel uses AI coding tools (Claude Code, Cursor, GitHub Copilot) daily as a deliberate practice to work faster, while reviewing and testing the code herself. She also builds custom Claude Code skills, for example a brand-identity skill for a business, as part of an AI seminar course.`,
  },
  {
    id: "skills-list",
    title: "Full skills list",
    text: `Languages: TypeScript, JavaScript, Python, C#, Java, SQL, HTML/CSS. Frameworks: React, Next.js, Angular, Redux Toolkit, Node.js/Express, ASP.NET Core/.NET, Spring Boot. Databases: SQL Server, PostgreSQL/pgvector, MongoDB. AI: RAG, embeddings, vector search, prompt and context management, OpenAI, Gemini, OpenRouter. Tools: Git, Docker, Linux, Postman, Jira, CI/CD, Agile/Scrum.`,
  },

  // ---------- Background ----------
  {
    id: "education",
    title: "Education",
    text: `Tahel studied Software Practical Engineering at MAHAT (2024–2026) with a GPA of 98, in the KamaTech program, specializing in Full-Stack and Embedded. She is taking a Penetration Testing and Cyber Security course at ITSAFE (networking, Linux, Python). Languages: Hebrew (native), English (high proficiency).`,
  },
  {
    id: "high-school",
    title: "High school (mention only if asked about high school)",
    text: `Tahel holds a high school diploma with 11 academic units in Computer Science (2019–2024).`,
  },
  {
    id: "leadership",
    title: "Teamwork and leadership",
    text: `Teamwork: at Bpreven she worked in an Agile/Scrum team with code reviews, GitHub and Jira; she built Campaign+ and the car rental system in teams of two. Leadership: she led a fundraising team at Ezer Mitzion for two years (2022–2024) and was a youth movement leader (2022–2023).`,
  },
];
