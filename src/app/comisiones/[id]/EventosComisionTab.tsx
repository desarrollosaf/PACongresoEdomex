'use client';

import { useState } from 'react';

type OrdenDelDia = {
  punto_id: number;
  nopunto: number;
  descripcion: string;
  tribuna: boolean;
  dispensa: boolean;
  voto: boolean;
  tiene_iniciativas: boolean;
};

type ComisionUnida = {
  comision_id: string;
  nombre: string;
};

type Evento = {
  evento_id: string;
  fecha: string;
  fecha_fmt: string;
  descripcion: string;
  liga: string | null;
  tipo_evento: string;
  es_unida: boolean;
  comisiones_unidas: ComisionUnida[];
  total_puntos: number;
  total_iniciativas: number;
  votadas: number;
  no_votadas: number;
  orden_del_dia: OrdenDelDia[];
};

type Props = {
  serverEventos: Evento[];
  comisionPrincipal: string;
};

const ITEMS_PER_PAGE = 10;

export default function EventosComisionTab({ serverEventos, comisionPrincipal }: Props) {
  const [page, setPage] = useState(1);
  const [expandido, setExpandido] = useState<string | null>(null);

  const eventos = serverEventos || [];

  if (eventos.length === 0) {
    return (
      <div className="tab-area w-tab-pane w--tab-active">
        <h1 className="titulo-seccion">Reuniones</h1>
        <div className="div-block-67" style={{ opacity: 0.6, padding: '2rem 0', marginTop: '2rem' }}>
          Aún no hay reuniones registradas.
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(eventos.length / ITEMS_PER_PAGE);
  const paginados = eventos.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const scrollToTop = () => {
    const el = document.querySelector('.grid-eventos');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 100, behavior: 'smooth' });
  };

  const toggleExpandido = (id: string) => {
    setExpandido(prev => (prev === id ? null : id));
  };

  return (
    <div className="tab-area w-tab-pane w--tab-active">
      <br />
      <h1 className="titulo-seccion">Reuniones</h1>
      <div className="div-block-67" style={{ marginTop: '2rem' }}>

        <div className="evt-header">
          <span className="evt-total-badge">{eventos.length} reunión{eventos.length !== 1 ? 'es' : ''} registrada{eventos.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid-eventos">
          {paginados.map((evt) => {
            const abierto = expandido === evt.evento_id;

            // Deduplicar comisiones unidas
            const comisionesUnicas = evt.comisiones_unidas?.filter(
              (c, i, arr) => arr.findIndex(x => x.comision_id === c.comision_id) === i
            ) ?? [];

            return (
              <div key={evt.evento_id} className={`evt-card ${abierto ? 'evt-card--abierto' : ''}`}>

                {/* Franja de fecha lateral */}
                <div className="evt-fecha-strip">
                  <span className="evt-dia">{new Date(evt.fecha).getDate()}</span>
                  <span className="evt-mes">
                    {new Date(evt.fecha).toLocaleString('es-MX', { month: 'short' }).replace('.', '')}
                  </span>
                  <span className="evt-anio">{new Date(evt.fecha).getFullYear()}</span>
                </div>

                {/* Contenido principal */}
                <div className="evt-card-body">
                  <div className="evt-card-top">
                    <span className="evt-tipo-badge">{evt.tipo_evento}</span>
                    {evt.total_puntos > 0 && (
                      <span className="evt-puntos-badge">
                        {evt.total_puntos} punto{evt.total_puntos !== 1 ? 's' : ''}
                      </span>
                    )}
                    {evt.liga && evt.liga !== '0' && (
                      <a href={evt.liga} target="_blank" rel="noopener noreferrer" className="evt-liga-btn">
                        ▶ Ver grabación
                      </a>
                    )}
                  </div>

                  {/* Comisiones unidas */}
                  {evt.es_unida && comisionesUnicas.length > 0 && (
                    <div className="evt-comisiones-unidas">
                      <span className="evt-comisiones-label">Comisiones legislativas de: </span><br></br>
                      <span className="evt-comision-unida-nombre">{comisionPrincipal} </span><br></br>
                      {comisionesUnicas.map((c) => (
                        <span key={c.comision_id} className="evt-comision-unida-nombre">
                          {c.nombre}
                        </span>
                      ))}
                    </div>
                  )}


                  {/* Orden del día expandible */}
                  {evt.orden_del_dia.length > 0 && (
                    <div className="evt-orden-wrapper">
                      <button
                        className="evt-orden-toggle"
                        onClick={() => toggleExpandido(evt.evento_id)}
                      >
                        {abierto ? '▲ Ocultar' : '▼ Ver'} orden del día
                        <span className="evt-orden-count">({evt.orden_del_dia.length})</span>
                      </button>

                      {abierto && (
                        <ol className="evt-orden-list">
                          {evt.orden_del_dia.map((punto) => (
                            <li key={punto.punto_id} className="evt-orden-item">
                              <span className="evt-orden-num">{punto.nopunto}.</span>
                              <span className="evt-orden-desc">{punto.descripcion}</span>
                              <div className="evt-orden-tags">
                                {punto.voto && <span className="evt-tag evt-tag--voto">Votación</span>}
                                {punto.tribuna && <span className="evt-tag evt-tag--tribuna">Tribuna</span>}
                                {punto.dispensa && <span className="evt-tag evt-tag--dispensa">Dispensa</span>}
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
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
      </div>
    </div>
  );
}