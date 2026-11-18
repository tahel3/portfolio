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
    console.error(e);
    const status = (e as { status?: number })?.status === 429 ? 503 : 500;
    return NextResponse.json({ error: "unavailable" }, { status });
  }
}
