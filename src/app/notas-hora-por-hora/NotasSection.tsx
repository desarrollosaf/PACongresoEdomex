"use client";

import { useEffect, useState, useCallback } from "react";
import { getMonitoreo } from "../service/monitoreo.api";

type Nota = {
  id: number;
  fecha: string | null;
  medio: string | null;
  titulo: string | null;
  texto: string | null;
  link: string | null;
  captura: string | null;
};

const formatearFecha = (fecha?: string | null) => {
  if (!fecha) return "";
  // Quitar la "Z" y los milisegundos para que JS lo trate como hora local
  const limpia = fecha.replace(" ", "T").replace(/\.\d+Z?$/, "").replace(/Z$/, "");
  const d = new Date(limpia);
  if (isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  });
};

function SkeletonItem() {
  return (
    <div className="item-hxh" style={{ gap: "16px" }}>
      <div
        style={{
          width: 250,
          height: 170,
          borderRadius: 8,
          background:
            "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
          backgroundSize: "200% 100%",
          animation: "1s shine linear infinite",
          flexShrink: 0,
        }}
      />
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div
          style={{
            height: 20,
            width: "60%",
            borderRadius: 4,
            background:
              "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
            backgroundSize: "200% 100%",
            animation: "1s shine linear infinite",
          }}
        />
        <div
          style={{
            height: 14,
            width: "30%",
            borderRadius: 4,
            background:
              "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
            backgroundSize: "200% 100%",
            animation: "1s shine linear infinite",
          }}
        />
        <div
          style={{
            height: 14,
            width: "100%",
            borderRadius: 4,
            background:
              "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
            backgroundSize: "200% 100%",
            animation: "1s shine linear infinite",
          }}
        />
        <div
          style={{
            height: 14,
            width: "90%",
            borderRadius: 4,
            background:
              "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
            backgroundSize: "200% 100%",
            animation: "1s shine linear infinite",
          }}
        />
        <div
          style={{
            height: 36,
            width: 120,
            borderRadius: 6,
            background:
              "linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)",
            backgroundSize: "200% 100%",
            animation: "1s shine linear infinite",
            marginTop: 4,
          }}
        />
      </div>
    </div>
  );
}

export default function NotasSection() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const cargarNotas = useCallback(async (p: number) => {
    setLoading(true);
    const res = await getMonitoreo(p);
    if (res) {
      setNotas(res.data ?? []);
      setTotalPages(res.totalPages ?? 1);
      setTotal(res.total ?? 0);
    }
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    cargarNotas(page);
  }, [page, cargarNotas]);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPages || nuevaPagina === page)
      return;
    setPage(nuevaPagina);
  };

  // Rango de páginas a mostrar (máx 5 botones centrados en la actual)
  const getPageRange = () => {
    const delta = 2;
    const range: number[] = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    return range;
  };

  return (
    <>
      <style>{`
        @keyframes shine { to { background-position-x: -200%; } }

        .notas-list { list-style: none; padding: 0; margin: 0; }
        .notas-list > li { padding: 0; }

        .item-hxh {
          display: flex;
          gap: 20px;
          padding: 20px 24px;
          background: #fff;
          border-radius: 14px;
          border: 1px solid #e8e8e8;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          align-items: flex-start;
          margin-bottom: 16px;
        }
        .item-hxh:last-child { margin-bottom: 0; }

        .notas-img {
          width: 250px;
          min-width: 250px;
          height: 170px;
          object-fit: cover;
          border-radius: 8px;
          background: #f0f0f0;
        }

        .notas-content { flex: 1; min-width: 0; }

        .paginacion {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 32px 0 16px;
          flex-wrap: wrap;
        }
        .pag-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          height: 38px;
          padding: 0 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
          background: #fff;
          color: #1e293b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
        }
        .pag-btn:hover:not(:disabled) { background: #94134A; color: #fff; border-color: #94134A; }
        .pag-btn.active { background: #94134A; color: #fff; border-color: #94134A; }
        .pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .pag-info { font-size: 13px; color: #64748b; text-align: center; margin-bottom: 4px; }

        @media (max-width: 640px) {
          .item-hxh { flex-direction: column; }
          .notas-img { width: 100%; min-width: unset; height: 200px; }
        }
      `}</style>

      <section>
        <div className="max_width" style={{ background: "transparent" }}>
          <div className="div-block-82">
            {loading ? (
              <ul className="notas-list w-list-unstyled">
                <li className="list-item-3">
                  {[...Array(5)].map((_, i) => (
                    <SkeletonItem key={i} />
                  ))}
                </li>
              </ul>
            ) : notas.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#64748b",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
                <p>No se encontraron notas disponibles.</p>
              </div>
            ) : (
              <div>
                {notas.map((nota) => (
                  <div key={nota.id} className="item-hxh">
                    <img
                      src="/images/logo-animado.gif"
                      loading="lazy"
                      alt={nota.medio ?? "Medio"}
                      className="img-250px notas-img"
                    />
                    <div className="notas-content">
                      <h3 className="titulo-boletin">
                        {nota.titulo ?? "Sin título"}
                      </h3>
                      <p
                        className="texto-general-list"
                        style={{
                          color: "#94134A",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {nota.medio ?? ""}
                      </p>
                      <p
                        className="texto-general-list"
                        style={{ color: "#64748b", marginBottom: 8 }}
                      >
                        {formatearFecha(nota.fecha)}
                      </p>
                      <p
                        className="texto-general-list"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {nota.texto ?? ""}
                      </p>
                      {nota.link && (
                        <a
                          href={nota.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            marginTop: 12,
                            display: "inline-block",
                            padding: "10px 70px",
                            backgroundColor: "#ffffff",
                            color: "#1f2937",
                            border: "1px solid #d1d5db",
                            borderRadius: "9999px",
                            fontSize: "14px",
                            fontWeight: 500,
                            textDecoration: "none",
                            textAlign: "center",
                            transition: "all 0.2s ease",
                            cursor: "pointer",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                            e.currentTarget.style.borderColor = "#9ca3af";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffffff";
                            e.currentTarget.style.borderColor = "#d1d5db";
                          }}
                        >
                          Ir a la nota
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div>
                <p className="pag-info">
                  Página {page} de {totalPages} — {total} notas en total
                </p>
                <div className="paginacion">
                  <button
                    className="pag-btn"
                    onClick={() => cambiarPagina(1)}
                    disabled={page === 1}
                    title="Primera página"
                  >
                    «
                  </button>
                  <button
                    className="pag-btn"
                    onClick={() => cambiarPagina(page - 1)}
                    disabled={page === 1}
                    title="Página anterior"
                  >
                    ‹
                  </button>

                  {getPageRange().map((p) => (
                    <button
                      key={p}
                      className={`pag-btn${p === page ? " active" : ""}`}
                      onClick={() => cambiarPagina(p)}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    className="pag-btn"
                    onClick={() => cambiarPagina(page + 1)}
                    disabled={page === totalPages}
                    title="Página siguiente"
                  >
                    ›
                  </button>
                  <button
                    className="pag-btn"
                    onClick={() => cambiarPagina(totalPages)}
                    disabled={page === totalPages}
                    title="Última página"
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
