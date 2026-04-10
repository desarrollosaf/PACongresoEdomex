"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para tablas y URLs automáticas
import { X, Loader2, Bot } from "lucide-react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, stop, error, status } = useChat({
    onError: (e) => {
       console.error("=============== CHAT USECHAT ERROR ===============");
       console.error(e);
       console.error(e.message);
    }
  });
  
  // Auto-retry silencioso al detectar error
  const retryCount = useRef(0);
  const MAX_RETRIES = 2;

  useEffect(() => {
    if (!error) {
      retryCount.current = 0;
      return;
    }
    if (retryCount.current < MAX_RETRIES && lastMessageRef.current) {
      retryCount.current += 1;
      console.warn(`[Chat] Reintento ${retryCount.current}/${MAX_RETRIES} tras error...`);
      const timer = setTimeout(() => {
        sendMessage({ role: "user", parts: [{ type: "text", text: lastMessageRef.current }] });
      }, 800);
      return () => clearTimeout(timer);
    }
    console.error("[Chat] Se agotaron los reintentos. Error persistente.", error);
  }, [error]);
  
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  const lastMessageRef = useRef<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    lastMessageRef.current = input.trim();
    sendMessage({ role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Si la última respuesta del modelo tiene "tool_calls" pendientes, mostramos que está pensando
  const lastMessage = messages[messages.length - 1];
  const isAgentThinking =
    isLoading && (lastMessage?.role === "user" || !lastMessage?.parts?.some((p: any) => p.type === "text"));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Ventana de Chat */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#94134A] text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-white" />
              <div>
                <h3 className="font-semibold text-lg leading-tight">Asistente Legislativo</h3>
                <p className="text-xs text-[#d89b3f]">Desarrollado con IA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-3">
                <Bot className="w-12 h-12 text-gray-300" />
                <p className="text-sm px-4">
                  ¡Hola! Soy el asistente virtual del congreso. Puedes preguntarme sobre diputados, iniciativas recientes o comisiones.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {m.parts?.map((part: any, index: number) => {
                  if (part.type === "text") {
                    if (!part.text) return null;
                    return (
                      <div
                        key={index}
                        className={
                          m.role === "user"
                            ? "bg-[#94134A] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm"
                            : "bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-sm border border-gray-200 prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:text-[#94134A]"
                        }
                      >
                        {m.role === "assistant" ? (
                           <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {part.text}
                           </ReactMarkdown>
                        ) : (
                           part.text
                        )}
                      </div>
                    );
                  }

                  if (part.type.startsWith("tool-") || part.type === "tool-invocation") {
                    const toolName = part.toolName || part.type.replace("tool-", "");
                    if (part.state === "result" || part.output) return null;
                    
                    return (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-500 mb-1 ml-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                        <Loader2 className="w-3 h-3 animate-spin text-[#d89b3f]" />
                        <span>
                          {toolName === "buscar_diputado" && "Buscando diputado..."}
                          {toolName === "obtener_perfil_diputado" && "Consultando perfil..."}
                          {toolName === "obtener_iniciativas_diputado" && "Buscando iniciativas..."}
                          {toolName === "obtener_estadisticas_diputados" && "Contando diputados..."}
                          {toolName === "listar_comisiones" && "Consultando comisiones..."}
                          {toolName === "obtener_iniciativas_comision" && "Revisando iniciativas de comisión..."}
                          {toolName === "obtener_boletines_recientes" && "Revisando boletines y noticias..."}
                          {toolName === "obtener_agenda" && "Consultando la agenda legislativa..."}
                          {toolName === "obtener_mesa_directiva" && "Obteniendo Mesa Directiva..."}
                          {toolName === "obtener_estadisticas_iniciativas" && "Analizando estadísticas de iniciativas..."}
                          {toolName === "obtener_eventos_comision" && "Buscando eventos de la comisión..."}
                          {toolName === "obtener_miembros_comision" && "Analizando plantilla de la comisión..."}
                          {toolName === "buscar_sesion_agenda" && "Buscando sesión en la agenda..."}
                          {(!["buscar_diputado", "obtener_perfil_diputado", "obtener_iniciativas_diputado", "obtener_estadisticas_diputados", "listar_comisiones", "obtener_iniciativas_comision", "obtener_boletines_recientes", "obtener_agenda", "obtener_mesa_directiva", "obtener_estadisticas_iniciativas", "obtener_eventos_comision", "obtener_miembros_comision", "buscar_sesion_agenda"].includes(toolName)) && "Consultando base de datos..."}
                        </span>
                      </div>
                    );
                  }
                  
                  return null;
                })}
              </div>
            ))}
            
            {/* Animación de pensando */}
            {isAgentThinking && (
              <div className="flex items-start">
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm border border-gray-200 flex items-center gap-2">
                    <span className="flex space-x-1">
                      <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                      <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    </span>
                  </div>
              </div>
            )}
            
            {error && retryCount.current >= MAX_RETRIES && (
              <div className="bg-amber-50 text-amber-700 p-3 rounded-xl shadow-sm text-sm border border-amber-200">
                 Hubo un problema al obtener la respuesta. Por favor intenta de nuevo.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center"
          >
            <input
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#94134A]/30 focus:border-[#94134A] disabled:opacity-50 transition-all text-gray-800"
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="bg-[#94134A] hover:bg-[#6e0e37] text-white p-2.5 flex items-center justify-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isLoading && !isAgentThinking ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'white', marginLeft: 2 }}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#94134A] hover:bg-[#6e0e37] text-white p-4 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 ${isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        style={{
           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: 'white' }}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
      </button>
      
      {/* Botón de Cierre al revés para animación limpia */}
      <button
        onClick={() => setIsOpen(false)}
        className={`absolute bottom-0 right-0 bg-white text-gray-800 p-4 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95 border border-gray-100 ${isOpen ? 'rotate-0 scale-100 opacity-100 z-10' : '-rotate-90 scale-0 opacity-0 -z-10'}`}
        style={{
           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <X className="w-7 h-7" />
      </button>
    </div>
  );
}
