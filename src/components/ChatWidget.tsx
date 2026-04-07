"use client";

import { useState, useRef, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000/chat";

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! Soy el asistente del Congreso del Estado de México. ¿En qué puedo ayudarte?" }
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });

      if (!res.ok) throw new Error("Error en la respuesta del servidor");

      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Lo sentimos, ocurrió un error. Intenta de nuevo más tarde." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        .cw-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #94134A;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(148,19,74,.45);
          transition: transform .15s, box-shadow .15s;
        }
        .cw-fab:hover  { transform: scale(1.07); box-shadow: 0 6px 24px rgba(148,19,74,.55); }
        .cw-fab:active { transform: scale(.96); }
        .cw-fab svg    { width: 24px; height: 24px; fill: #fff; }

        .cw-badge {
          position: absolute;
          top: -2px; right: -2px;
          width: 14px; height: 14px;
          background: #ae8449;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .cw-window {
          position: fixed;
          bottom: 90px;
          right: 24px;
          z-index: 9999;
          width: min(380px, calc(100vw - 32px));
          height: min(520px, calc(100dvh - 110px));
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: cwUp .22s cubic-bezier(.25,.8,.25,1);
        }
        @keyframes cwUp {
          from { opacity:0; transform: translateY(16px) scale(.97); }
          to   { opacity:1; transform: translateY(0)    scale(1);   }
        }

        .cw-header {
          background: #94134A;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-shrink: 0;
        }
        .cw-header-info { display: flex; align-items: center; gap: 10px; }
        .cw-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cw-avatar svg { width: 18px; height: 18px; fill: #fff; }
        .cw-header-text h3 {
          font-size: 14px; font-weight: 700; color: #fff; margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        .cw-header-text p {
          font-size: 11px; color: rgba(255,255,255,.75); margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        .cw-close {
          background: rgba(255,255,255,.15);
          border: none; border-radius: 8px;
          width: 30px; height: 30px;
          cursor: pointer; color: #fff; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .15s;
        }
        .cw-close:hover { background: rgba(255,255,255,.28); }

        .cw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
          background: #f9f5f7;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

        .cw-msg {
          max-width: 82%;
          font-size: 13.5px;
          line-height: 1.5;
          padding: 10px 13px;
          border-radius: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          word-break: break-word;
        }
        .cw-msg.user {
          align-self: flex-end;
          background: #94134A;
          color: #fff;
          border-bottom-right-radius: 5px;
        }
        .cw-msg.assistant {
          align-self: flex-start;
          background: #fff;
          color: #1a1a1a;
          border: 1px solid #eee;
          border-bottom-left-radius: 5px;
        }

        .cw-typing {
          align-self: flex-start;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          border-bottom-left-radius: 5px;
          padding: 12px 16px;
          display: flex; gap: 5px; align-items: center;
        }
        .cw-typing span {
          width: 7px; height: 7px; border-radius: 50%;
          background: #94134A; opacity: .4;
          animation: cwDot 1.2s infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: .2s; }
        .cw-typing span:nth-child(3) { animation-delay: .4s; }
        @keyframes cwDot {
          0%,80%,100% { opacity:.2; transform:scale(.8); }
          40%         { opacity:1;  transform:scale(1);  }
        }

        .cw-footer {
          padding: 10px 12px 12px;
          background: #fff;
          border-top: 1px solid #f0e8ec;
          display: flex;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .cw-input {
          flex: 1;
          resize: none;
          border: 1px solid #e0d0d8;
          border-radius: 12px;
          padding: 10px 13px;
          font-size: 13.5px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          line-height: 1.4;
          outline: none;
          max-height: 100px;
          overflow-y: auto;
          transition: border .15s;
          color: #1a1a1a;
          background: #fdf8fa;
        }
        .cw-input:focus { border-color: #94134A; }
        .cw-input::placeholder { color: #aaa; }

        .cw-send {
          width: 40px; height: 40px; min-width: 40px;
          border-radius: 50%;
          background: #94134A;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, transform .1s;
          flex-shrink: 0;
        }
        .cw-send:hover  { background: #6e0e37; }
        .cw-send:active { transform: scale(.93); }
        .cw-send:disabled { background: #ccc; cursor: default; }
        .cw-send svg { width: 17px; height: 17px; fill: #fff; }
      `}</style>

      {/* FAB button */}
      <button
        className="cw-fab"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        )}
        {!open && <span className="cw-badge" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="cw-window" role="dialog" aria-label="Chat de asistencia">
          <div className="cw-header">
            <div className="cw-header-info">
              <div className="cw-avatar">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <div className="cw-header-text">
                <h3>Asistente Legislativo</h3>
                <p>Congreso del Estado de México</p>
              </div>
            </div>
            <button className="cw-close" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button>
          </div>

          <div className="cw-messages">
            {messages.map((m, i) => (
              <div key={i} className={`cw-msg ${m.role}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="cw-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="cw-footer">
            <textarea
              ref={inputRef}
              className="cw-input"
              placeholder="Escribe tu pregunta…"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              className="cw-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Enviar"
            >
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
