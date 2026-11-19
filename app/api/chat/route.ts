import { NextRequest, NextResponse } from "next/server";
import { answer, type Msg } from "@/lib/rag";

export const maxDuration = 30;

// Best-effort rate limit per server instance: 20 questions per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

// GET is used for questions without conversation history (e.g. the suggested questions):
// successful answers are cached by Vercel's CDN, so repeated questions cost no API quota.
export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const question = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (!question || question.length > 500) return NextResponse.json({ error: "invalid_question" }, { status: 400 });
  try {
    const result = await answer(question, []);
    return NextResponse.json(result, {
      headers: result.found ? { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" } : { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return failure(e);
  }
}

function failure(e: unknown) {
  console.error(e);
  const err = e as { status?: number; message?: string };
  const status = err.status === 429 ? 503 : 500;
  // A short, non-secret reason helps diagnose failures from the browser.
  const reason = `${err.status ?? ""} ${String(err.message ?? e).replace(/key=[^&\s]+/gi, "key=***").slice(0, 160)}`.trim();
  return NextResponse.json({ error: "unavailable", reason }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  try {
    const { question, history } = await req.json();
    if (typeof question !== "string" || !question.trim() || question.length > 500) {
      return NextResponse.json({ error: "invalid_question" }, { status: 400 });
    }
    const safeHistory: Msg[] = Array.isArray(history)
      ? history
          .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m?.content === "string")
          .slice(-6)
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }))
      : [];
    return NextResponse.json(await answer(question.trim(), safeHistory));
  } catch (e) {
    return failure(e);
  }
}
