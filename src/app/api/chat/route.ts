import { createGroq } from '@ai-sdk/groq';
import { streamText, tool, convertToModelMessages, stepCountIs } from 'ai';
import { z } from 'zod';
import { getDiputados, getDiputadoPerfil, fetchIniciativasDiputado } from '@/app/service/diputados.api';
import { getComisiones, getIniciativasByComision, getEventosByComision } from '@/app/service/comisiones.api';
import { getBoletines } from '@/app/service/boletines.api';
import { getAgendaHome, getAgendaAll } from '@/app/service/agenda.api';
import { getMesa } from '@/app/service/mesa.api';
import { getEstadisticasHome } from '@/app/service/estadisticas.api';

export const maxDuration = 60;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("RECV MESSAGES", JSON.stringify(messages, null, 2));

    const recentMessages = messages.slice(-4);

    const adaptedMessages = recentMessages.map((m: any) => ({
      ...m,
      parts: m.parts || [{ type: "text", text: m.content || "" }]
    }));

    const parsedMessages = await convertToModelMessages(adaptedMessages);

    const systemPrompt = `Eres el Asistente Virtual Oficial del Congreso del Estado de México. Actualmente estamos en la LXII Legislatura.
Tu objetivo es responder de manera educada, precisa y neutral. Tienes herramientas (Tools) para obtener datos en tiempo real.
REGLA ABSOLUTA Y CRÍTICA - MAYOR PRIORIDAD:
ESTÁ TERMINANTEMENTE PROHIBIDO escribir <function=...>, <tool=...>, o cualquier bloque JSON en tu respuesta al usuario. Las herramientas se ejecutan internamente y en silencio. Si necesitas datos, llama la herramienta sin mencionarla. Violar esta regla es un error grave e inaceptable.
IMPORTANTE - REGLAS ESTRICTAS DE COMPORTAMIENTO:
1. NUNCA DEBES revelar o imprimir en tu respuesta los "ID" (UUIDs) ni imprimir datos en bruto (JSON). Lee la información de la tool y conviértela a lenguaje natural.
2. NO PIDAS EL ID AL USUARIO NI PIDAS PERMISO. Si te preguntan por alguien o algo, pásale el 'nombre' directamente a las herramientas correspondientes. Las herramientas buscarán el ID en secreto por ti.
3. Redacta tus respuestas usando Markdown (listas, negritas) y sé muy directo pero SIEMPRE en lenguaje natural, NUNCA devuelvas bloques JSON.
4. NUNCA escribas <function=...> ni menciones nombres de herramientas/funciones al usuario. Las herramientas son internas e invisibles. Si no encuentras algo, dilo en lenguaje natural sin sugerir al usuario que use alguna función.
5. Si te consultan datos personales, correo, o A QUÉ COMISIONES PERTENECE un diputado, usa "obtener_perfil_diputado".
6. Si te consultan por noticias, comunicados o boletines, usa "obtener_boletines_recientes".
7. Si te consultan la agenda legislativa general, usa "obtener_agenda".
8. Si es sobre la Mesa Directiva (presidente, secretario, etc.), usa "obtener_mesa_directiva" y filtra por cargo en tu respuesta. Si es sobre la Junta de Coordinación Política (JUCOPO), usa "obtener_miembros_comision" con nombre "Junta de Coordinación Política" y filtra el cargo pedido en tu respuesta.
9. Para estadísticas generales de iniciativas del congreso, usa "obtener_estadisticas_iniciativas".
10. Para eventos específicos de una comisión, usa "obtener_eventos_comision".
11. Para saber quiénes integran o son miembros de una comisión específica, usa "obtener_miembros_comision".
12. NUNCA comiences tu respuesta con texto como <function> ni menciones nombres de funciones o herramientas al usuario. Responde siempre de forma humana y natural.
13. Si preguntan qué diputados pertenecen a un partido (MORENA, PAN, PRI, PT, PVEM, MC, etc.), usa SIEMPRE "buscar_diputado" con el nombre o siglas del partido. NUNCA digas que no hay información sin llamar la herramienta primero.
14. Si preguntan por una sesión específica (Sesión Deliberante, Plenaria, Solemne, etc.) o cuándo fue la última o próxima sesión de ese tipo, usa SIEMPRE "buscar_sesion_agenda". NUNCA inventes fechas.
15. Si preguntan por diputados según su profesión, ocupación, trayectoria, características personales o cualquier dato descriptivo (licenciado, médico, ingeniero, maestro, agricultor, empresario, activista, etc.), usa SIEMPRE "buscar_diputado" pasando el término descriptivo como parámetro de búsqueda. La herramienta busca en la descripción completa del diputado. NUNCA respondas que no hay resultados sin llamar la herramienta primero.
16. Si te preguntan algo que NO esté relacionado con el Congreso del Estado de México (como la fecha, el clima, preguntas de cultura general, etc.), responde únicamente: "Solo puedo proporcionar información relacionada con el Congreso del Estado de México. ¿En qué puedo ayudarte al respecto?" Sin mencionar herramientas ni funciones.
17. Si preguntan cuántos diputados hay en total, cuántos son hombres o cuántas son mujeres, usa "obtener_estadisticas_diputados".
18. Si preguntan cuántas iniciativas tiene un diputado específico, cuántas le han sido aprobadas, cuántas están en estudio, etc., usa "obtener_iniciativas_diputado" con el nombre del diputado.
19. Si una herramienta devuelve error o está vacía, responde EXACTAMENTE: "No encontré información disponible sobre eso en este momento." NUNCA inventes datos.`;

    const tools = {
      buscar_diputado: tool({
        description: 'Busca diputados por nombre, apellido, partido político (MORENA, PAN, PRI, PT, PVEM, MC…), profesión, ocupación o cualquier término descriptivo (médico, ingeniero, activista, agricultor…). Busca en el nombre completo, partido Y en la descripción personal del diputado. Úsala para cualquier pregunta sobre quiénes son o qué características tienen los diputados.',
        inputSchema: z.object({
          nombre: z.string().describe("Término de búsqueda: puede ser un nombre, un partido político (ej. MORENA, PAN, PRI) o una profesión. NUNCA lo dejes vacío.")
        }),
        execute: async (args) => {
          const nombre = args?.nombre || "";
          const diputados = await getDiputados();
          if (!diputados || diputados.length === 0) return { error: "No se pudieron obtener diputados" };

          const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const searchParam = normalizar(nombre);

          const esBusquedaGeneral = ['todos', 'listar', 'lista', 'all', 'diputados'].some(k => searchParam.includes(k));

          const resultados = esBusquedaGeneral
            ? diputados
            : diputados.filter((d: any) => {
                const nombreCompleto = normalizar(`${d.nombres} ${d.apaterno} ${d.amaterno}`);
                const partido = normalizar(d.integrantes?.[0]?.partido?.siglas || '');
                const partidoNombre = normalizar(d.integrantes?.[0]?.partido?.nombre || '');
                const descripcion = normalizar(d.descripcion || '');
                return nombreCompleto.includes(searchParam) ||
                       partido.includes(searchParam) ||
                       partidoNombre.includes(searchParam) ||
                       descripcion.includes(searchParam);
              });

          return resultados.slice(0, 20).map((d: any) => ({
            id: d.id,
            nombre_completo: `${d.nombres} ${d.apaterno} ${d.amaterno}`.trim(),
            partido: d.integrantes?.[0]?.partido?.siglas || 'Sin partido',
            partido_nombre: d.integrantes?.[0]?.partido?.nombre || '',
            distrito: d.integrantes?.[0]?.distrito?.distrito || '',
            email: d.email || '',
            profesion_o_descripcion: d.descripcion ? (d.descripcion.length > 80 ? d.descripcion.substring(0, 80) + '...' : d.descripcion) : 'No especificada'
          }));
        }
      }),

      obtener_perfil_diputado: tool({
        description: 'Obtiene el perfil detallado de un diputado usando su ID o nombre.',
        inputSchema: z.object({
          id: z.string().optional().describe("ID del diputado"),
          nombre: z.string().optional().describe("Nombre del diputado si NO tienes su ID")
        }),
        execute: async (args) => {
          let id = args?.id;
          let nombre = args?.nombre;
          if (id && !id.includes("-")) { nombre = id; id = undefined; }
          if (!id && nombre) {
            const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const diputados = await getDiputados();
            const d = diputados?.find((x: any) => normalizar(`${x.nombres} ${x.apaterno} ${x.amaterno}`).includes(normalizar(nombre!)));
            if (d) id = d.id;
          }
          if (!id) return { error: "ID faltante o no se encontró diputado con ese nombre" };
          const perfil = await getDiputadoPerfil(id);
          if (!perfil) return { error: "No se encontró el perfil" };
          return {
            nombre: `${perfil.nombres} ${perfil.apaterno} ${perfil.amaterno}`.trim(),
            partido: perfil.integrantes?.[0]?.partido?.siglas || '',
            partido_nombre: perfil.integrantes?.[0]?.partido?.nombre || '',
            distrito: perfil.integrantes?.[0]?.distrito?.distrito || '',
            email: perfil.email || '',
            comisiones: perfil.integrantes?.[0]?.comisiones?.map((c: any) => `${c.comision?.nombre} (${c.tipo_cargo?.valor || 'Miembro'})`).filter(Boolean).join(", ") || 'Ninguna'
          };
        }
      }),

      obtener_iniciativas_diputado: tool({
        description: 'Obtiene las iniciativas presentadas por un diputado usando su ID o nombre.',
        inputSchema: z.object({
          id: z.string().optional().describe("ID del diputado"),
          nombre: z.string().optional().describe("Nombre del diputado si NO tienes su ID")
        }),
        execute: async (args) => {
          let id = args?.id;
          let nombre = args?.nombre;
          if (id && !id.includes("-")) { nombre = id; id = undefined; }
          if (!id && nombre) {
            const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const diputados = await getDiputados();
            const d = diputados?.find((x: any) => normalizar(`${x.nombres} ${x.apaterno} ${x.amaterno}`).includes(normalizar(nombre!)));
            if (d) id = d.id;
          }
          if (!id) return { error: "ID faltante o no se encontró diputado con ese nombre" };
          const iniciativas = await fetchIniciativasDiputado(id);
          if (!iniciativas || iniciativas.length === 0) return { mensaje: "El diputado no tiene iniciativas registradas" };
          return iniciativas.slice(0, 10).map((i: any) => ({
            titulo: i.titulo || i.resumen_texto,
            fecha: i.fecha_evento_raw || i.fecha,
            estatus: i.tramite_publico || i.estatus,
            tema: i.tema
          }));
        }
      }),

      listar_comisiones: tool({
        description: 'Obtiene todas las comisiones vigentes del congreso con su ID.',
        inputSchema: z.object({
          nombre: z.string().optional(),
          acronimo: z.string().optional(),
        }),
        execute: async () => {
          const res = await getComisiones();
          if (!res) return { error: "No se pudieron obtener comisiones" };
          let todasLasComisiones: any[] = [];
          if (Array.isArray(res)) {
            todasLasComisiones = res;
          } else if (typeof res === 'object') {
            Object.values(res).forEach((grupo: any) => {
              if (Array.isArray(grupo)) todasLasComisiones = [...todasLasComisiones, ...grupo];
            });
          }
          if (todasLasComisiones.length === 0) return { error: "No hay comisiones listadas" };
          return todasLasComisiones.map((c: any) => ({
            id: c.id,
            nombre: c.nombre || c.alias,
            tipo: c.tipo?.valor || ''
          }));
        }
      }),

      obtener_iniciativas_comision: tool({
        description: 'Obtiene las iniciativas de una comisión específica usando su ID.',
        inputSchema: z.object({
          id: z.string().describe("ID de la comisión")
        }),
        execute: async (args) => {
          const id = args?.id || "";
          if (!id) return { error: "ID faltante" };
          const iniciativas = await getIniciativasByComision(id);
          if (!iniciativas || !iniciativas.data) return { error: "No se encontraron iniciativas para esta comisión" };
          return iniciativas.data.slice(0, 10).map((i: any) => ({
            titulo: i.titulo,
            fecha: i.fecha_evento_raw,
            estatus: i.tramite_publico || i.estatus
          }));
        }
      }),

      obtener_boletines_recientes: tool({
        description: 'Obtiene las noticias, comunicados y boletines más recientes del congreso.',
        inputSchema: z.object({}),
        execute: async () => {
          const boletines = await getBoletines();
          if (!boletines || !Array.isArray(boletines) || boletines.length === 0) return { error: "No hay boletines recientes." };
          return boletines.slice(0, 5).map((b: any) => ({
            titulo: b.titulo,
            fecha: b.fecha_publicacion,
            resumen: b.resumen,
            categoria: b.categoria?.nombre || "Sin categoría"
          }));
        }
      }),

      obtener_agenda: tool({
        description: 'Obtiene la agenda general de los próximos eventos legislativos (vista general sin filtrar por tipo de sesión). Para buscar sesiones específicas como Sesión Deliberante, usa buscar_sesion_agenda.',
        inputSchema: z.object({}),
        execute: async () => {
          const agenda = await getAgendaHome();
          if (!agenda || !Array.isArray(agenda) || agenda.length === 0) return { error: "No hay eventos en la agenda." };
          return agenda.slice(0, 5).map((a: any) => ({
            descripcion: a.descripcion,
            fecha_hora: a.fecha_hora_inicio || a.fecha_hora,
            sede: a.sede?.sede || ''
          }));
        }
      }),

      buscar_sesion_agenda: tool({
        description: 'Busca sesiones específicas en la agenda por tipo: Sesión Deliberante, Sesión Plenaria, Sesión Solemne, etc. Úsala cuando pregunten por la última o próxima sesión de un tipo concreto.',
        inputSchema: z.object({
          tipo: z.string().describe("Tipo de sesión a buscar, ej: 'Sesión Deliberante', 'Sesión Plenaria', 'Sesión Solemne'. Se filtrará por este texto en el campo descripcion del evento.")
        }),
        execute: async (args) => {
          const tipo = args?.tipo || '';
          const normalizar = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
          const tipoNorm = normalizar(tipo);
          const agenda = await getAgendaAll();
          const raw: any[] = Array.isArray(agenda) ? agenda : (agenda?.data ?? []);
          if (!raw || raw.length === 0) return { error: 'No se pudo obtener la agenda.' };
          const coincidencias = raw.filter((a: any) => normalizar(a.descripcion || '').includes(tipoNorm));
          if (coincidencias.length === 0) {
            const ejemplos = [...new Set(raw.slice(0, 20).map((a: any) => a.descripcion).filter(Boolean))];
            return { error: `No se encontraron sesiones de tipo "${tipo}".`, tipos_disponibles: ejemplos };
          }
          coincidencias.sort((a: any, b: any) => {
            const fa = new Date(a.fecha_hora_inicio || a.fecha_hora || 0).getTime();
            const fb = new Date(b.fecha_hora_inicio || b.fecha_hora || 0).getTime();
            return fb - fa;
          });
          return coincidencias.slice(0, 5).map((a: any) => ({
            descripcion: a.descripcion,
            fecha_hora: a.fecha_hora_inicio || a.fecha_hora,
            fecha_hora_fin: a.fecha_hora_fin,
            sede: a.sede?.sede || ''
          }));
        }
      }),

      obtener_mesa_directiva: tool({
        description: 'Obtiene todos los integrantes de la Mesa Directiva con su cargo (Presidente, Secretario, etc.), nombre y partido. Úsala para saber quién preside o integra la Mesa Directiva.',
        inputSchema: z.object({}),
        execute: async () => {
          const mesa = await getMesa();
          if (!mesa || !Array.isArray(mesa) || mesa.length === 0) return { error: "No se pudo obtener la mesa directiva." };
          return mesa.map((m: any) => ({
            cargo: m.cargo?.nombre || "",
            diputado: `${m.diputado?.nombres || ''} ${m.diputado?.apaterno || ''} ${m.diputado?.amaterno || ''}`.trim(),
            partido: m.diputado?.integrantes?.[0]?.partido?.siglas || ""
          }));
        }
      }),

      obtener_estadisticas_diputados: tool({
        description: 'Obtiene estadísticas generales sobre los diputados del congreso: total de diputados, cuántos son hombres y cuántas son mujeres.',
        inputSchema: z.object({}),
        execute: async () => {
          const diputados = await getDiputados();
          if (!diputados || !Array.isArray(diputados) || diputados.length === 0)
            return { error: "No se pudo obtener la lista de diputados." };
          const norm = (t: string) => (t || '').toLowerCase();
          const hombres = diputados.filter((d: any) => norm(d.genero?.genero).includes('mascul')).length;
          const mujeres = diputados.filter((d: any) => norm(d.genero?.genero).includes('femen')).length;
          const otros = diputados.length - hombres - mujeres;
          return { total: diputados.length, hombres, mujeres, otros: otros > 0 ? otros : undefined };
        }
      }),

      obtener_estadisticas_iniciativas: tool({
        description: 'Obtiene estadísticas generales sobre el estado actual de las iniciativas del congreso (cuántas hay aprobadas, pendientes, precluídas, etc.).',
        inputSchema: z.object({}),
        execute: async () => {
          const res = await getEstadisticasHome();
          if (!res || !res.data) return { error: "No se pudieron obtener estadísticas." };
          const { iniciativas, minutas, totales_generales } = res.data;
          return {
            iniciativas_aprobadas: iniciativas?.aprobadas || 0,
            iniciativas_en_estudio: iniciativas?.en_estudio || 0,
            iniciativas_total: iniciativas?.total || 0,
            minutas_aprobadas: minutas?.aprobadas || 0,
            minutas_total: minutas?.total || 0,
            total_registros: totales_generales?.total_registros || 0
          };
        }
      }),

      obtener_eventos_comision: tool({
        description: 'Obtiene los eventos recientes o programados de una comisión usando su ID o nombre.',
        inputSchema: z.object({
          id: z.string().optional().describe("ID de la comisión"),
          nombre: z.string().optional().describe("Nombre de la comisión si NO tienes su ID")
        }),
        execute: async (args) => {
          let id = args?.id;
          let nombre = args?.nombre;
          if (id && !id.includes("-")) { nombre = id; id = undefined; }
          if (!id && nombre) {
            const res = await getComisiones();
            if (res) {
              let todasLasComisiones: any[] = [];
              if (Array.isArray(res)) todasLasComisiones = res;
              else if (typeof res === 'object') {
                Object.values(res).forEach((grupo: any) => {
                  if (Array.isArray(grupo)) todasLasComisiones = [...todasLasComisiones, ...grupo];
                });
              }
              const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              const queryNorm = normalizar(nombre!);
              const queryWords = queryNorm.split(/\s+/).filter((w: string) => w.length > 3);
              let c = todasLasComisiones.find((x: any) => normalizar(x.nombre || x.alias || '').includes(queryNorm));
              if (!c) c = todasLasComisiones.find((x: any) => queryNorm.includes(normalizar(x.nombre || x.alias || '')));
              if (!c && queryWords.length > 0) c = todasLasComisiones.find((x: any) => { const n = normalizar(x.nombre || x.alias || ''); return queryWords.every((w: string) => n.includes(w)); });
              if (!c && queryWords.length > 1) { c = todasLasComisiones.reduce((best: any, x: any) => { const n = normalizar(x.nombre || x.alias || ''); const m = queryWords.filter((w: string) => n.includes(w)).length; return m > (best?.matches || 0) ? { ...x, matches: m } : best; }, null); if (c && c.matches < Math.ceil(queryWords.length / 2)) c = null; }
              if (c) id = c.id;
            }
          }
          if (!id) return { error: "ID faltante o no se encontró comisión con ese nombre" };
          const eventos = await getEventosByComision(id);
          if (!eventos || !eventos.data) return { error: "No se encontraron eventos para esta comisión" };
          return eventos.data.slice(0, 5).map((e: any) => ({
            titulo: e.titulo,
            fecha: e.fecha_evento_raw,
            lugar: e.lugar
          }));
        }
      }),

      obtener_miembros_comision: tool({
        description: 'Obtiene los diputados que son miembros de una comisión usando su ID o nombre.',
        inputSchema: z.object({
          id: z.string().optional().describe("ID de la comisión"),
          nombre: z.string().optional().describe("Nombre de la comisión si NO tienes su ID")
        }),
        execute: async (args) => {
          let id = args?.id;
          let nombre = args?.nombre;
          if (id && !id.includes("-")) { nombre = id; id = undefined; }
          if (!id && nombre) {
            const res = await getComisiones();
            if (res) {
              let todasLasComisiones: any[] = [];
              if (Array.isArray(res)) todasLasComisiones = res;
              else if (typeof res === 'object') {
                Object.values(res).forEach((grupo: any) => {
                  if (Array.isArray(grupo)) todasLasComisiones = [...todasLasComisiones, ...grupo];
                });
              }
              const normalizar = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
              const queryNorm = normalizar(nombre!);
              const queryWords = queryNorm.split(/\s+/).filter((w: string) => w.length > 3);
              let c = todasLasComisiones.find((x: any) => normalizar(x.nombre || x.alias || '').includes(queryNorm));
              if (!c) c = todasLasComisiones.find((x: any) => queryNorm.includes(normalizar(x.nombre || x.alias || '')));
              if (!c && queryWords.length > 0) {
                c = todasLasComisiones.find((x: any) => {
                  const nombreNorm = normalizar(x.nombre || x.alias || '');
                  return queryWords.every((w: string) => nombreNorm.includes(w));
                });
              }
              if (!c && queryWords.length > 1) {
                c = todasLasComisiones.reduce((best: any, x: any) => {
                  const nombreNorm = normalizar(x.nombre || x.alias || '');
                  const matches = queryWords.filter((w: string) => nombreNorm.includes(w)).length;
                  if (matches > (best?.matches || 0)) return { ...x, matches };
                  return best;
                }, null);
                if (c && c.matches < Math.ceil(queryWords.length / 2)) c = null;
              }
              if (c) id = c.id;
            }
          }
          if (!id) return { error: "ID faltante o no se encontró comisión con ese nombre" };
          const baseUrl = typeof window === "undefined" ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL;
          try {
            const r = await fetch(`${baseUrl}/api/comisiones/${id}`, { cache: "no-store" });
            if (!r.ok) return { error: "No se pudieron obtener los integrantes de esta comisión" };
            const comisionData = await r.json();
            if (!comisionData || !comisionData.integrantes) return { error: "No hay integrantes registrados en esta comisión" };
            return comisionData.integrantes.map((i: any) => ({
              diputado: `${i.integranteLegis?.diputado?.nombres || ''} ${i.integranteLegis?.diputado?.apaterno || ''} ${i.integranteLegis?.diputado?.amaterno || ''}`.trim(),
              partido: i.integranteLegis?.partido?.siglas || '',
              cargo: i.tipo_cargo?.valor || 'Miembro'
            }));
          } catch (err: any) {
            return { error: "Fallo en la consulta interna: " + err.message };
          }
        }
      })
    };

    // ✅ Configuración base compartida entre ambos modelos
    const streamConfig = {
      temperature: 0.1,
      messages: parsedMessages,
      stopWhen: stepCountIs(5),
      system: systemPrompt,
      tools
    };

    // ✅ Intenta con 70b, si hay rate limit cae al 8b automáticamente
    let result;
    try {
      result = streamText({
        model: groq('llama-3.3-70b-versatile'),
        ...streamConfig
      });
      // Forzamos que el stream inicie para detectar el error antes de responder
      await result.usage;
    } catch (modelError: any) {
      const isRateLimit =
        modelError?.statusCode === 429 ||
        modelError?.message?.includes('rate_limit') ||
        modelError?.message?.includes('Rate limit');

      if (isRateLimit) {
        console.warn('⚠️ Rate limit en 70b, cambiando a llama-3.1-8b-instant...');
        result = streamText({
          model: groq('llama-3.1-8b-instant'),
          ...streamConfig
        });
      } else {
        throw modelError;
      }
    }

    return result.toUIMessageStreamResponse();

  } catch (error: any) {
    console.error("ERROR EN CHAT:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}