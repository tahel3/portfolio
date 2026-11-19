// The chatbot's knowledge base lives in knowledge.json: everything the bot may say about Tahel.
// Each entry is one chunk that is embedded and retrieved. Keep facts accurate and write
// evidence strongest-first: production work, then real projects, then coursework.
import data from "./knowledge.json";

export type Chunk = { id: string; title: string; text: string };
export const KNOWLEDGE: Chunk[] = data;

// Changes whenever the knowledge base changes; used to check that prebuilt embeddings match.
export function knowledgeHash(chunks: Chunk[] = KNOWLEDGE): string {
  let h = 2166136261;
  for (const c of chunks) {
    for (const ch of `${c.id}\n${c.title}\n${c.text}\n`) {
      h ^= ch.codePointAt(0)!;
      h = Math.imul(h, 16777619) >>> 0;
    }
  }
  return h.toString(16);
}
