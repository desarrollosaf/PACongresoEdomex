'use client';

import { useState } from 'react';

type Iniciativa = {
  id: string;
  no: number;
  tipo: number;
  autor: string;
  autor_detalle: string;
  iniciativa: string;
  materia: string;
  presentac: string;
  fecha_evento_raw: string;
  comisiones: string;
  expedicion: string;
  observac: string;
  diputado: string;
  grupo_parlamentario: string;
  decreto?: string;
  fecha_aprobacion?: string;
};

type IniciativasComisionTabProps = {
  comisionId: string;
  serverIniciativas: Iniciativa[];
};

type FilterStatus = 'todas' | 'aprobada' | 'en estudio';

function formatDate(isoString: string | undefined, fallback: string) {
  if (!isoString) return fallback;
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return fallback;
    return `${d.getDate()} de ${d.toLocaleString('es-MX', { month: 'long' })}, ${d.getFullYear()}`;
  } catch {
    return fallback;
  }
}

function StatusBadge({ observac }: { observac: string }) {
  const lower = observac?.toLowerCase() ?? '';
  const cls = lower === 'aprobada' ? 'aprobada' : lower === 'en estudio' ? 'estudio' : 'default';
  return <span className={`ini-status-badge ${cls}`}>{observac || 'Sin status'}</span>;
}

const FILTROS: { key: FilterStatus; label: string; cls: string }[] = [
  { key: 'todas', label: 'Todas', cls: 'tab-todas' },
  { key: 'aprobada', label: 'Aprobadas', cls: 'tab-aprobada' },
  { key: 'en estudio', label: 'En estudio', cls: 'tab-estudio' },
];

const ITEMS_PER_PAGE = 6;

export default function IniciativasComisionTab({ comisionId, serverIniciativas }: IniciativasComisionTabProps) {
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('todas');

  const iniciativas = serverIniciativas || [];

  if (iniciativas.length === 0) {
    return (
      <div className="tab-area w-tab-pane w--tab-active" data-w-tab="iniciativas">
        <h1 className="titulo-seccion">Iniciativas</h1>
        <div className="div-block-67" style={{ opacity: 0.6, padding: '2rem 0', marginTop: '2rem' }}>
          Aún no hay iniciativas registradas.
        </div>
      </div>
    );
  }

  const iniciativasFiltradas = iniciativas.filter(ini => {
    if (filterStatus === 'todas') return true;
    return ini.observac?.toLowerCase() === filterStatus;
  });

  const totalPages = Math.ceil(iniciativasFiltradas.length / ITEMS_PER_PAGE);
  const paginadas = iniciativasFiltradas.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const scrollToTop = () => {
    const el = document.querySelector('.grid-iniciativas');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
  };

  const handleFilter = (key: FilterStatus) => {
    setFilterStatus(key);
    setPage(1);
  };

  return (
    <div className="tab-area w-tab-pane w--tab-active" data-w-tab="iniciativas">
      <br/>  
      <h1 className="titulo-seccion">Iniciativas</h1>
      <div className="div-block-67" style={{ marginTop: '2rem' }}>

        {/* Filtros */}
       <div className="ini-filtros">
          {FILTROS.map(({ key, label, cls }) => {
            const count = key === 'todas'
              ? iniciativas.length
              : iniciativas.filter(i => i.observac?.toLowerCase() === key).length;
            return (
              <button
                key={key}
                className={`ini-filtro-tab ${cls} ${filterStatus === key ? 'activo' : ''}`}
                onClick={() => handleFilter(key)}
                style={{ fontFamily: 'Regestogrotesk, Arial, sans-serif' }}
              >
                {label}
                {/* <span className="ini-filtro-count">{count}</span> */}
              </button>
            );
          })}
        </div>

        {iniciativasFiltradas.length === 0 ? (
          <div style={{ opacity: 0.6, padding: '2rem 0', textAlign: 'center' }}>
            No se encontraron iniciativas con ese estatus.
          </div>
        ) : (
          <>
            <div className="grid-iniciativas">
              {paginadas.map((ini) => (
                <div key={ini.id || ini.no} className="ini-card">

                  {/* Columna principal */}
                  <div className="ini-card-main">
                    <div className="ini-card-top">
                      {ini.no && <span className="ini-numero">No. {ini.no}</span>}
                      <h3 className="ini-card-titulo" title={ini.iniciativa}>
                        {ini.iniciativa}
                      </h3>
                    </div>

                    <p
                      className="ini-card-materia"
                      dangerouslySetInnerHTML={{ __html: ini.materia || '' }}
                      title={ini.materia}
                    />

                    <div className="ini-card-meta">
                      <span className="ini-meta-chip">
                        Proponente: <strong>{ini.autor || 'S/G'}</strong>
                      </span>
                      <span className="ini-meta-sep" />
                      <span className="ini-meta-chip">
                        Presenta: <strong>{ini.autor_detalle}</strong>
                      </span>
                      {ini.comisiones && (
                        <>
                          <span className="ini-meta-sep" />
                          <span className="ini-meta-chip">
                            Comisión: <strong>{ini.comisiones}</strong>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Columna lateral */}
                  <div className="ini-card-side">
                    <StatusBadge observac={ini.observac} />

                    <div className="ini-fecha-side">
                      <strong>Presentación</strong>
                      {formatDate(ini.fecha_evento_raw, ini.presentac)}
                    </div>

                    {ini.fecha_aprobacion && (
                      <div className="ini-aprobacion-tag">
                        ✓ Aprobada {ini.fecha_aprobacion}
                      </div>
                    )}

                    <div className="ini-side-btns">
                      <a
                        href={ini.id ? `/iniciativas/${ini.id}` : '#'}
                        className="ini-btn ini-btn-primary"
                      >
                        <img src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png" alt="" />
                        Iniciativa
                      </a>
                      {ini.decreto && (
                        <a href="#" className="ini-btn ini-btn-secondary">
                          <img src="/images/decreto.png" alt="" />
                          Decreto
                        </a>
                      )}
                      {ini.observac?.toLowerCase() === 'aprobada' && (
                        <a href="#" className="ini-btn ini-btn-secondary">
                          <img src="/images/how_to_vote_24dp_5F687F_FILL0_wght400_GRAD0_opsz24-1.png" alt="" />
                          Votación
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="ini-paginacion">
                <button
                  className="ini-pag-btn"
                  onClick={() => { setPage(p => Math.max(1, p - 1)); scrollToTop(); }}
                  disabled={page === 1}
                >
                  ← Anterior
                </button>
                <span className="ini-pag-info">Página {page} de {totalPages}</span>
                <button
                  className="ini-pag-btn"
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); scrollToTop(); }}
                  disabled={page === totalPages}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
