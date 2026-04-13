"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@/components/ThemeProvider";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much does it cost?",
  "How do I get started?",
  "What's your ROI calculator?",
];


export default function ChatWidget() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Caden, the Cadex AI assistant. I can answer questions about our services, pricing, or help you figure out if AI automation is right for your business. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === "dark";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      // Include welcome as context
      const apiMessages = [
        {
          role: "assistant" as const,
          content:
            "Hi! I'm Caden, the Cadex AI assistant. How can I help you today?",
        },
        ...history.filter((m) => m.content),
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Sorry, I ran into an issue. Please email us at discovery@cadexhq.com and we'll get back to you shortly.",
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const bg = isDark ? "#0F1623" : "#FFFFFF";
  const border = isDark ? "#1E2D45" : "#E5E7EB";
  const textPrimary = isDark ? "#EAF4FF" : "#111827";
  const textMuted = isDark ? "#9CA3AF" : "#6B7280";
  const userBubble = "linear-gradient(135deg, #3DCFED, #1A3CC8)";
  const aiBubbleBg = isDark ? "#1A2235" : "#F3F4F6";
  const inputBg = isDark ? "#1A2235" : "#EAF4FF";

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              backgroundColor: bg,
              border: `1px solid ${border}`,
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5"
              style={{
                background: "linear-gradient(135deg, #1A3CC822, #3DCFED22)",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)",
                  }}
                >
                  C
                </div>
                <div>
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ color: textPrimary }}
                  >
                    Caden
                  </p>
                  <p className="text-xs" style={{ color: textMuted }}>
                    Cadex AI Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs" style={{ color: "#3DCFED" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-black/10"
                  style={{ color: textMuted }}
                  aria-label="Close chat"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mr-2 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)",
                      }}
                    >
                      C
                    </div>
                  )}
                  <div
                    className="max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: userBubble,
                            color: "#FFFFFF",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            backgroundColor: aiBubbleBg,
                            color: textPrimary,
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.content ? (
                      msg.role === "assistant" ? (
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="mb-2 space-y-1 pl-3">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-2 space-y-1 pl-4 list-decimal">{children}</ol>,
                            li: ({ children }) => (
                              <li className="flex gap-1.5 items-start">
                                <span style={{ color: "#3DCFED" }} className="mt-0.5 flex-shrink-0">•</span>
                                <span>{children}</span>
                              </li>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold" style={{ color: "inherit" }}>{children}</strong>
                            ),
                            em: ({ children }) => <em className="italic opacity-90">{children}</em>,
                            a: ({ href, children }) => {
                              const isExternal = href?.startsWith("http");
                              return (
                                <a
                                  href={href}
                                  target={isExternal ? "_blank" : "_self"}
                                  rel={isExternal ? "noopener noreferrer" : undefined}
                                  style={{ color: "#3DCFED", textDecoration: "underline", textUnderlineOffset: "2px" }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {children}
                                </a>
                              );
                            },
                            code: ({ children }) => (
                              <code className="px-1 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: "rgba(61,207,237,0.1)", color: "#3DCFED" }}>{children}</code>
                            ),
                            h3: ({ children }) => <p className="font-semibold mb-1 mt-2">{children}</p>,
                            h4: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )
                    ) : (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested questions */}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-cyan-400 hover:text-cyan-400"
                      style={{
                        borderColor: border,
                        color: textMuted,
                        backgroundColor: inputBg,
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3"
              style={{ borderTop: `1px solid ${border}` }}
            >
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all disabled:opacity-60"
                  style={{
                    backgroundColor: inputBg,
                    border: `1px solid ${border}`,
                    color: textPrimary,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
                  style={{
                    background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)",
                  }}
                  aria-label="Send message"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="white" />
                  </svg>
                </button>
              </form>
              <p className="text-center text-xs mt-2" style={{ color: textMuted }}>
                Powered by{" "}
                <span style={{ color: "#3DCFED" }}>Cadex AI</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #1A3CC8, #1E6FE8, #3DCFED)",
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M2 2l18 18M20 2L2 20"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                fill="white"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
