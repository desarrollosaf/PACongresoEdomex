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

type IniciativasTabProps = {
  diputadoId: string;
  serverIniciativas: Iniciativa[];
};

function formatDate(isoString: string | undefined, fallback: string) {
  if (!isoString) return fallback;
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return fallback;
    const day = d.getDate();
    const month = d.toLocaleString('es-MX', { month: 'long' });
    const year = d.getFullYear();
    return `${day} de ${month}, ${year}`;
  } catch {
    return fallback;
  }
}

export default function IniciativasTab({ diputadoId, serverIniciativas }: IniciativasTabProps) {
  const [page, setPage] = useState<number>(1);
  
  const iniciativas = serverIniciativas || [];
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(iniciativas.length / ITEMS_PER_PAGE);
  const loading = false;

  // Handle Skeleton loader
  if (loading && iniciativas.length === 0) {
    return (
      <div className="tab-area w-tab-pane w--tab-active" data-w-tab="iniciativas">
        <div className="div-block-67">
          <div className="w-layout-grid grid-iniciativas" style={{ gap: '20px' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} className="div-iniciativas" style={{ opacity: 0.6, animation: 'pulse 1.5s infinite' }}>
                <div style={{ width: '100%', height: '30px', backgroundColor: '#e2e8f0', marginBottom: '10px', borderRadius: '4px' }}></div>
                <div style={{ width: '100%', height: '80px', backgroundColor: '#e2e8f0', marginBottom: '15px', borderRadius: '4px' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!loading && iniciativas.length === 0) {
    return (
      <div className="tab-area w-tab-pane w--tab-active" data-w-tab="iniciativas">
        <div className="div-block-67">
          <div style={{ opacity: 0.6, padding: '2rem 0' }}>
            Aún no hay iniciativas registradas o no se pudieron cargar.
          </div>
        </div>
      </div>
    );
  }

  const paginatedIniciativas = iniciativas.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="tab-area w-tab-pane w--tab-active" data-w-tab="iniciativas">
      <div className="div-block-67">
        <div className="w-layout-grid grid-iniciativas">
          {paginatedIniciativas.map((ini: Iniciativa) => (
            <div key={ini.id || ini.no} className="div-iniciativas">
              <div>
                <div className="columnas-titulo-iniciativa w-row" style={{ minHeight: '60px', alignItems: 'center' }}>
                  <div className="column-27 w-col w-col-3"><img src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png" loading="lazy" alt="" className="img-btn-titulo" /></div>
                  <div className="w-col w-col-9">
                    <h3 
                      className="titulo-iniciativa" 
                      style={{ 
                        display: '-webkit-box', 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        margin: 0
                      }}
                      title={ini.iniciativa}
                    >
                      {ini.iniciativa}
                    </h3>
                  </div>
                </div>
              </div>
              <p 
                className="texto-iniciativas" 
                dangerouslySetInnerHTML={{ __html: ini.materia || '' }}
                style={{ 
                  display: '-webkit-box', 
                  WebkitLineClamp: 6, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden',
                  minHeight: '120px'
                }}
                title={ini.materia}
              ></p>
              <div className="w-layout-grid grid-iniciativa-1">
                <div className="div-block-60">
                  <p className="titulo-dato-iniciativas">Proponente<br/></p>
                  <a href="#" className="text-decoration-none"><strong>{ini.grupo_parlamentario || 'S/G'}</strong></a>
                </div>
                <div className="div-block-60">
                  <p className="titulo-dato-iniciativas">Presenta<br/></p>
                  <a href="#" className="text-decoration-none">{ini.autor}</a>
                </div>
                <div className="div-block-60">
                  <p className="titulo-dato-iniciativas">Tribuna<br/></p>
                  <a href="#" className="text-decoration-none">{ini.autor_detalle || ini.diputado}</a>
                </div>
              </div>
              <div className="w-layout-grid grid-iniciativa-2">
                <div className="div-block-60">
                  <p className="titulo-dato-iniciativas">Comisión<br/></p>
                  <a href="#" className="text-decoration-none">{ini.comisiones || '-'}</a>
                </div>
                <div className="div-block-60">
                  <p className="titulo-dato-iniciativas">Status<br/></p>
                  <p className={ini.observac?.toLowerCase() === 'aprobada' ? 'texto-status-aprobada' : 'texto-status-estudio'}>
                    <strong style={{ 
                      color: ini.observac?.toLowerCase() === 'aprobada' ? '#16a34a' : 
                             ini.observac?.toLowerCase() === 'en estudio' ? '#d97706' : 'inherit' 
                    }}>{ini.observac}</strong><br/>
                  </p>
                </div>
              </div>
              <p className="texto-iniciativas">Fecha de presentación: {formatDate(ini.fecha_evento_raw, ini.presentac)}<br/></p>
              
              <div className="div-iniciativa">
                <div>
                  <div className="btn-votacion w-row">
                    <div className="column-27 w-col w-col-3"><img src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png" loading="lazy" alt="" className="img-btn-columnas" /></div>
                    <div className="column-28 w-col w-col-9">
                      <a href={ini.id ? `/iniciativas/${ini.id}` : '#'} className="text-decoration-none">Iniciativa</a>
                    </div>
                  </div>
                </div>
              </div>

              {ini.decreto ? (
                <>
                  <div className="div-block-62">
                    <p className="titulo-dato-iniciativas">Decreto<br/></p>
                    <p className="texto-iniciativas">{ini.decreto}<br/></p>
                  </div>
                  <div className="div-btn-decreto">
                    <div>
                      <div className="btn-votacion w-row">
                        <div className="column-27 w-col w-col-3"><img src="/images/decreto.png" loading="lazy" alt="" className="img-btn-columnas" /></div>
                        <div className="column-28 w-col w-col-9">
                          <a href="#" className="text-decoration-none">Decreto</a>
                        </div>
                      </div>
                    </div>
                    {ini.observac?.toLowerCase() === 'aprobada' && (
                      <div className="div-block-68">
                        <div className="btn-votacion w-row">
                          <div className="column-27 w-col w-col-3"><img src="/images/how_to_vote_24dp_5F687F_FILL0_wght400_GRAD0_opsz24-1.png" loading="lazy" alt="" className="img-btn-columnas" /></div>
                          <div className="column-28 w-col w-col-9">
                            <a href="#" className="text-decoration-none">Votación</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ini.observac?.toLowerCase() === 'aprobada' && (
                  <div className="div-btn-decreto">
                    <div className="div-block-68">
                      <div className="btn-votacion w-row">
                        <div className="column-27 w-col w-col-3"><img src="/images/how_to_vote_24dp_5F687F_FILL0_wght400_GRAD0_opsz24-1.png" loading="lazy" alt="" className="img-btn-columnas" /></div>
                        <div className="column-28 w-col w-col-9">
                          <a href="#" className="text-decoration-none">Votación</a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {ini.fecha_aprobacion && (
                <p className="texto-status-aprobada"><strong> Fecha de aprobación: {ini.fecha_aprobacion}</strong><br/></p>
              )}
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', marginTop: '30px', paddingBottom: '20px' }}>
            <button 
              onClick={() => {
                setPage(p => Math.max(1, p - 1));
                // Optionally scroll to top of the grid when paginating
                window.scrollTo({ top: document.querySelector('.grid-iniciativas')?.getBoundingClientRect().top! + window.pageYOffset - 100, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="btn-black-str w-button"
              style={{ opacity: page === 1 ? 0.5 : 1, padding: '8px 16px', background: '#333', color: '#fff' }}
            >
              Anterior
            </button>
            <span style={{ fontWeight: '500' }}>Página {page} de {totalPages}</span>
            <button 
              onClick={() => {
                setPage(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: document.querySelector('.grid-iniciativas')?.getBoundingClientRect().top! + window.pageYOffset - 100, behavior: 'smooth' });
              }}
              disabled={page === totalPages}
              className="btn-black-str w-button"
              style={{ opacity: page === totalPages ? 0.5 : 1, padding: '8px 16px', background: '#333', color: '#fff' }}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
