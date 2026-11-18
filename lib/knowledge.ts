// The chatbot's knowledge base: everything it is allowed to say about Tahel.
// Each entry becomes one chunk that is embedded and retrieved. Keep facts accurate:
// the bot answers ONLY from this text.

export type Chunk = { id: string; title: string; text: string };

export const KNOWLEDGE: Chunk[] = [
  {
    id: "profile",
    title: "About Tahel",
    text: `Tahel Eliya is a software engineer based in Netanya, Israel. She works across full-stack development (React, TypeScript, C#/.NET, Node.js, Java Spring Boot) and AI/LLM applications (RAG, embeddings, vector search, LLM API integrations). She delivered end-to-end features on a multi-tenant healthcare platform used by 1000+ users, and has solid fundamentals in OOP, REST APIs, SQL, authentication, authorization and secure data handling. She is a fast learner of new tools and frameworks.`,
  },
  {
    id: "availability",
    title: "Availability and contact",
    text: `Tahel is available immediately for a new role. She is open to full-stack, frontend, backend and AI engineering positions. She is based in Netanya, Israel. The best way to reach her is by email at tael6688@gmail.com or on LinkedIn (linkedin.com/in/tahel-eliya-888917374). Her code is on GitHub at github.com/tahel3. Two versions of her CV can be downloaded from this site: Full-Stack and AI Engineering.`,
  },
  {
    id: "bpreven",
    title: "Experience: Software Engineer at Bpreven (06/2026 – 10/2026)",
    text: `From June to October 2026 Tahel was a Software Engineer at Bpreven, where she delivered end-to-end features for a multi-tenant healthcare platform used by 1000+ users. The stack was React, TypeScript, C# with ASP.NET Core (.NET 8), SQL Server and Docker. She implemented a secure data-transfer workflow for external providers, with approvals, transfer logs and vendor management for 8 providers. She implemented authentication and authorization checks and managed API tokens via application secrets.`,
  },
  {
    id: "bpreven-backend",
    title: "Bpreven: backend, integrations and teamwork",
    text: `At Bpreven Tahel built backend functionality and REST APIs over SQL databases, including integrations with third-party and AI services: OpenAI, Hume AI and ElevenLabs, within a Docker-based environment, and tested endpoints with Postman. She worked in an Agile/Scrum team using GitHub and Jira, contributing to code reviews, documentation, and debugging across browser, server and database. The Bpreven code is proprietary, so it is not on her GitHub.`,
  },
  {
    id: "phoenix-rag",
    title: "Project: Phoenix website AI assistant (hackathon, October 2026)",
    text: `At a hackathon in October 2026 Tahel built, on her own, an AI assistant that answers customer questions only from the website of The Phoenix insurance company, with a source link for every answer. It has a bilingual Hebrew/English chat interface built with Next.js and TypeScript and deployed on Vercel. A live demo is at poenix-bot.vercel.app.`,
  },
  {
    id: "phoenix-rag-pipeline",
    title: "Phoenix assistant: how the RAG pipeline works",
    text: `The Phoenix assistant is a Retrieval-Augmented Generation (RAG) pipeline. Tahel crawled the site with Firecrawl (Python), embedded the content with Gemini Embedding, and stored it in Supabase (PostgreSQL with pgvector) with hybrid vector and keyword search. To prevent hallucinations, a similarity threshold refuses out-of-scope questions without calling the LLM at all, and Gemini Flash answers only from the retrieved passages. She evaluated the bot with a fixed set of test questions, checking that answers were grounded in the source. In English mode, the question is translated to Hebrew for retrieval because the site content is Hebrew.`,
  },
  {
    id: "skillmate",
    title: "Project: SkillMate, a mentor matchmaking platform",
    text: `SkillMate is a full-stack skill-sharing platform Tahel architected and built with a Java 21 Spring Boot backend and a React frontend (Redux Toolkit / RTK Query, Material UI). Learners search skills, book sessions in a mentor's available slots, and leave reviews. It has three roles (learner, mentor, or both) with JWT authentication and Spring Security. It includes real-time chat over WebSockets (STOMP and SockJS) and an automated waiting list: a scheduled job notifies the next learner by email when a spot opens. It uses DTOs (ModelMapper) and React useMemo to reduce data transfer and unnecessary re-renders. Code: github.com/tahel3/skillMate. There is a 60-second demo video on this site.`,
  },
  {
    id: "skillmate-ai",
    title: "SkillMate: AI skill advisor",
    text: `SkillMate includes an LLM-powered AI assistant, the Skill Advisor, which suggests skills and mentors. Tahel integrated it through the OpenRouter API, implementing the backend REST integration, API-key authentication, error handling, and a fallback model for rate-limit failures.`,
  },
  {
    id: "campaign-plus",
    title: "Project: Campaign+ / Donation Dashboard",
    text: `Campaign+ (also called Donation Dashboard) is a real-time donation campaign platform built by a team of two. It uses Node.js with Express, MongoDB (cloud-hosted) and Socket.io for live updates, with Chart.js visualizations and backend validation. Donors see campaign progress update the moment someone donates, without refreshing the page. Code: github.com/tahel3/CampaignPlus.`,
  },
  {
    id: "ai-log-doctor",
    title: "Project in development: AI Log Doctor",
    text: `AI Log Doctor is a Python tool Tahel is currently building, with an object-oriented design. It parses application logs, groups recurring errors, and runs a multi-step LLM workflow (parse, group, analyze, report): each error group is sent to an LLM for root-cause analysis, and the results are shown in a Tkinter GUI. It is still in development.`,
  },
  {
    id: "this-site",
    title: "This portfolio and its chatbot",
    text: `This portfolio site was built with Next.js and TypeScript. Its chatbot is itself a small RAG system: Tahel's CV and project descriptions are split into chunks and embedded with Gemini; each question is embedded and matched by cosine similarity; if nothing is close enough the bot refuses without calling the LLM; otherwise Gemini Flash answers only from the retrieved chunks and shows which ones it used.`,
  },
  {
    id: "skills-ai",
    title: "Skills: AI and LLM",
    text: `AI/LLM skills: RAG, embeddings and vector search (pgvector), prompt and context management, output grounding, LLM APIs (OpenAI, Gemini, OpenRouter), Claude Code including custom skills, AI agents, and AI-assisted development with tools such as Claude Code, Cursor and GitHub Copilot.`,
  },
  {
    id: "skills-dev",
    title: "Skills: languages, frameworks and tools",
    text: `Languages: TypeScript, JavaScript, Python, C#, Java, SQL, HTML/CSS. Frameworks and APIs: React, Next.js, Angular, Redux Toolkit (RTK Query), Node.js, .NET Core / ASP.NET Core, Spring Boot, REST APIs, WebSockets. Databases: SQL Server, PostgreSQL (Supabase, pgvector), MongoDB. Tools and practices: Git, Docker, Linux, code review, CI/CD, Jira, Postman, Agile/Scrum.`,
  },
  {
    id: "education",
    title: "Education",
    text: `Tahel studied Software Practical Engineering at MAHAT (2024–2026), with a GPA of 98, as part of the KamaTech program, specializing in Full-Stack and Embedded. She has been taking a Penetration Testing and Cyber Security course at ITSAFE since 2026 (networking and Linux, Python, HTML/CSS/JS, currently learning PHP). She holds a high school diploma with 11 academic units in Computer Science (2019–2024). Languages: Hebrew (native) and English (high proficiency).`,
  },
  {
    id: "leadership",
    title: "Volunteering and leadership",
    text: `Tahel was a team leader in Ezer Mitzion fundraising (2022–2024) and a youth movement leader (2022–2023).`,
  },
];
