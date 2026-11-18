"use client";
import { useEffect, useRef, useState } from "react";

type Source = { id: string; title: string };
type Msg = { role: "user" | "assistant"; content: string; sources?: Source[] };

const SUGGESTIONS = [
  "What did she build at Bpreven?",
  "Has she shipped AI features?",
  "What's her tech stack?",
  "Is she available?",
];

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm Tahel's portfolio assistant. Ask me anything about her experience, projects or skills. I answer only from her portfolio.",
};

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    const history = messages.slice(1).map(({ role, content }) => ({ role, content }));
    setMessages((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      if (res.status === 429) throw new Error("rate");
      const data = await res.json();
      if (!res.ok || !data.answer) throw new Error("fail");
      setMessages((m) => [...m, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch (e) {
      const content =
        (e as Error).message === "rate"
          ? "That's a lot of questions! Please wait a few minutes, or email Tahel at tael6688@gmail.com."
          : "I'm taking a short break right now. Everything I know is also in the projects below.";
      setMessages((m) => [...m, { role: "assistant", content }]);
    } finally {
      setLoading(false);
    }
  }

  const started = messages.length > 1;

  return (
    <div className="chat">
      <div className="chat-head">
        <span className="chat-title">
          <span className="chat-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
            </svg>
          </span>
          Ask about Tahel
        </span>
        <span className="chat-tag">grounded · RAG</span>
      </div>

      <div className="chat-list" ref={listRef} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`} dir="auto">
            {m.content}
            {m.sources && m.sources.length > 0 && (
              <div className="sources">
                <span>Sources:</span>
                {m.sources.map((s) => (
                  <span key={s.id} className="source" title={s.title}>
                    {s.id}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="bubble assistant typing" aria-label="Thinking">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      {!started && (
        <div className="chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="ask" className="sr-only">
          Ask a question about Tahel
        </label>
        <input
          id="ask"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about my work…"
          maxLength={500}
          autoComplete="off"
          dir="auto"
        />
        <button type="submit" className="send" aria-label="Send question" disabled={loading || !input.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
