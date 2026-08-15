"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, User } from "lucide-react";
import { Topbar } from "@/components/Topbar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { askAdminInsights, apiErrorMessage } from "@/lib/api";
import { InsightMessage } from "@/lib/types";

const suggestedQuestions = [
  "Which doctor has the most cancellations?",
  "What's our revenue trend over the last 6 months?",
  "How much do we have in pending bills?",
  "Which department has the most appointments?",
];

export default function AdminInsightsPage() {
  const [messages, setMessages] = useState<InsightMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    try {
      const answer = await askAdminInsights(question);
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      setError(apiErrorMessage(err, "Couldn't process that question. Try again."));
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <>
      <Topbar
        title="AI Insights"
        subtitle="Ask questions about your hospital's data in plain language"
        profileHref="/admin/dashboard"
      />

      <div className="flex h-[calc(100vh-6rem)] flex-col px-6 pb-6 lg:px-10">
        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <Card className="border-brand-200 bg-brand-50/40">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    Ask anything about your hospital&apos;s data
                  </p>
                  <p className="mt-1 text-sm text-ink-600">
                    Answers are generated from your real, current data — try
                    one of these to get started:
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => ask(q)}
                        className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "assistant" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-lg rounded-2xl px-4 py-3 text-sm ${
                  m.role === "user"
                    ? "bg-brand-700 text-white"
                    : "border border-ink-100 bg-white text-ink-500"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-500">
                Thinking...
              </div>
            </div>
          )}

          {error && <Alert tone="error">{error}</Alert>}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-ink-100 pt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about doctors, appointments, revenue, bills..."
            className="flex-1 rounded-xl border border-ink-100 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Button type="submit" loading={loading} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}