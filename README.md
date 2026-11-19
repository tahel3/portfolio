# Tahel Eliya – Portfolio

Personal developer portfolio with a **RAG chatbot that answers questions about my work**, grounded only in my CV and project write-ups.

**Stack:** Next.js (App Router), TypeScript, Gemini API (`@google/genai`), deployed on Vercel.

## How the chatbot works
1. **Index:** the knowledge base in [`lib/knowledge.ts`](lib/knowledge.ts) is split into chunks and embedded with `gemini-embedding-001`. Embeddings are computed once per server instance and cached in memory. The corpus is small, so no vector database is needed.
2. **Retrieve:** the question is embedded and matched to the closest chunks by cosine similarity (top 5). Short follow-up questions are embedded together with the previous question. A summary chunk is always added as background, so general questions ("why hire her?") get the best overview.
3. **Threshold:** if the best match is below `REFUSE_BELOW` (in `lib/rag.ts`), the question is clearly off-topic and the bot refuses **without calling the LLM**.
4. **Answer:** Gemini answers only from the retrieved chunks, in the question's language (English or Hebrew), as an honest advocate: direct answer first, strongest evidence first (production work, then projects, then coursework), at most 4 sentences. The closest chunk ids are returned as sources.

Safety: questions are limited to 500 characters, history is sanitized, and there is a best-effort rate limit (20 questions per IP per 10 minutes). The API key stays on the server.
Model chain: `CHAT_MODEL` (if set) → `gemini-3.8-flash` without thinking (4s limit) → `gemini-3.5-flash-lite` → `gemini-3.1-flash-lite` → `gemini-3.6-flash`. The next model is tried when one is retired, overloaded (503), rate-limited or too slow, within a 22s total budget.

## Run locally
```bash
npm install
cp .env.example .env.local   # add GEMINI_API_KEY
npm run dev                  # http://localhost:3000
```

## Deploy
Import the repo in Vercel and set the `GEMINI_API_KEY` environment variable. That's it.

## Updating content
- What the bot knows: `lib/knowledge.ts`. Only write facts there; the bot cannot say anything else. Write evidence strongest-first.
- Page content: `app/page.tsx`.
- CVs: `public/cv/`.
