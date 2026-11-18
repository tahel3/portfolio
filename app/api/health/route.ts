// Temporary diagnostics: times each step of the chat pipeline. Returns no secrets.
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error(`timeout ${ms}ms`)), ms))]);
}

async function step(name: string, fn: () => Promise<unknown>) {
  const t = Date.now();
  try {
    const r = await withTimeout(fn(), 12_000);
    return { name, ok: true, ms: Date.now() - t, info: r };
  } catch (e) {
    const err = e as { status?: number; message?: string };
    return { name, ok: false, ms: Date.now() - t, status: err.status, error: String(err.message ?? e).slice(0, 300) };
  }
}

export async function GET() {
  const key = process.env.GEMINI_API_KEY;
  const out: unknown[] = [{ name: "env", hasKey: !!key, keyLength: key?.length ?? 0, chatModel: process.env.CHAT_MODEL ?? null }];
  if (!key) return NextResponse.json(out);
  const ai = new GoogleGenAI({ apiKey: key });
  out.push(await step("embed-1", async () => {
    const r = await ai.models.embedContent({ model: "gemini-embedding-001", contents: ["hello"], config: { outputDimensionality: 768 } });
    return r.embeddings?.length;
  }));
  out.push(await step("embed-15", async () => {
    const r = await ai.models.embedContent({ model: "gemini-embedding-001", contents: Array.from({ length: 15 }, (_, i) => `text ${i}`), config: { outputDimensionality: 768 } });
    return r.embeddings?.length;
  }));
  for (const model of [process.env.CHAT_MODEL, "gemini-3.8-flash", "gemini-3.6-flash"].filter(Boolean) as string[]) {
    out.push(await step(`generate:${model}`, async () => {
      const r = await ai.models.generateContent({ model, contents: "Reply with the single word OK." });
      return r.text?.slice(0, 20);
    }));
  }
  return NextResponse.json(out);
}
