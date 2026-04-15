'use client';

import { useEffect, useMemo, useState } from 'react';
import { getTrabajoLegislativo } from '../service/trabajo_legislativo.service';

const formatearFecha = (fecha: string) => {
  if (!fecha) return '';

  const date = new Date(`${fecha}T00:00:00`);
  if (Number.isNaN(date.getTime())) return fecha;

  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function TrabajoLegislativo() {
  const [activeTab, setActiveTab] = useState('Gaceta');
  const [trabajoLegislativo, setTrabajoLegislativo] = useState<any[]>([]);
  const [legislacion, setLegislacion] = useState<any[]>([]);
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [busquedaLegislacion, setBusquedaLegislacion] = useState('');

  useEffect(() => {
    const cargarTrabajoLegislativo = async () => {
      try {
        const data = await getTrabajoLegislativo();


        setTrabajoLegislativo(Array.isArray(data?.gaceta) ? data.gaceta : []);
        setLegislacion(Array.isArray(data?.legislacion) ? data.legislacion : []);
      } catch (error) {
        console.error('Error al obtener trabajo legislativo:', error);
        setTrabajoLegislativo([]);
        setLegislacion([]);
      }
    };

    cargarTrabajoLegislativo();
  }, []);

 
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const selector =
      activeTab === 'Gaceta'
        ? '.gaceta-card'
        : activeTab === 'legislacion'
        ? '.legislacion-item'
        : '';

    if (!selector) return;

    const cards = document.querySelectorAll(selector);

    cards.forEach((card) => card.classList.remove('show'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [trabajoLegislativo, legislacion, busquedaTexto, busquedaLegislacion, activeTab]);


  const gacetasFiltradas = useMemo(() => {
    if (!Array.isArray(trabajoLegislativo)) return [];

    const termino = busquedaTexto.trim().toLowerCase();
    if (!termino) return trabajoLegislativo;

    return trabajoLegislativo.filter((item) => {
      const fechaOriginal = String(item?.date || '').toLowerCase();
      const fechaFormateada = formatearFecha(item?.date || '').toLowerCase();
      const numero = String(item?.numero || item?.id || '').toLowerCase();
      const year = String(item?.year || '').toLowerCase();
      const tomo = String(item?.tomo || '').toLowerCase();

      return (
        fechaOriginal.includes(termino) ||
        fechaFormateada.includes(termino) ||
        numero.includes(termino) ||
        year.includes(termino) ||
        tomo.includes(termino)
      );
    });
  }, [trabajoLegislativo, busquedaTexto]);


  const legislacionFiltrada = useMemo(() => {
    if (!Array.isArray(legislacion)) return [];

    const termino = busquedaLegislacion.trim().toLowerCase();
    if (!termino) return legislacion;

    return legislacion.filter((item: any) => {
      const nombre = String(item?.nombre || '').toLowerCase();
      const path = String(item?.path || '').toLowerCase();

      return nombre.includes(termino) || path.includes(termino);
    });
  }, [legislacion, busquedaLegislacion]);

  return (
    <>

    <div
        data-current="Gaceta"
        data-easing="ease"
        data-duration-in="300"
        data-duration-out="100"
        className="w-tabs"
      >
        <div className="tabs-menu-4 w-tab-menu">
          <button
            type="button"
            onClick={() => setActiveTab('Gaceta')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'Gaceta' ? 'w--current' : ''
            }`}
          >
            <div>Gaceta</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('legislacion')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'legislacion' ? 'w--current' : ''
            }`}
          >
            <div>Legislación</div>
          </button>

          {/* <button
            type="button"
            onClick={() => setActiveTab('diario_de_debates')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'diario_de_debates' ? 'w--current' : ''
            }`}
          >
            <div className="text-block-11">Diario de Debates</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Minuta del Congreso')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'Minuta del Congreso' ? 'w--current' : ''
            }`}
          >
            <div className="text-block-10">Minuta del Congreso</div>
          </button> */}
        </div>

      {/* CONTENIDO */}
      <div className="tabs-content w-tab-content">
        {/* GACETA */}
        {activeTab === 'Gaceta' && (
            <div data-w-tab="Gaceta" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Gaceta Parlamentaria</h2>
                <div>Conoce más sobre lo que ocurre cada semana en la cámara de diputados</div>
              </div>

              <div className="filtros-gaceta">
                <div className="buscador-texto-box">
                  <label htmlFor="busquedaTexto" className="label-fecha">
                    Buscar gaceta
                  </label>

                  <input
                    id="busquedaTexto"
                    type="text"
                    value={busquedaTexto}
                    onChange={(e) => setBusquedaTexto(e.target.value)}
                    className="input-fecha"
                    placeholder="Ej. noviembre, marzo 2026, 2 de noviembre"
                  />
                </div>

                <button
                  type="button"
                  className="btn-limpiar-fecha"
                  onClick={() => setBusquedaTexto('')}
                >
                  Limpiar
                </button>
              </div>

              <div className="gacetas-grid">
                {gacetasFiltradas.length > 0 ? (
                  gacetasFiltradas.map((item: any, index: number) => (
                    <a
                      key={item.id ?? index}
                      href={`https://legislacion.congresoedomex.gob.mx/storage/documentos/gaceta/${item.documento}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gaceta-card-link"
                    >
                      <div
                        className="gaceta-card"
                        style={{ transitionDelay: `${index * 0.06}s` }}
                      >
                        <img
                          className="gaceta-img"
                          sizes="(max-width: 890px) 100vw, 1004px, 100vw"
                          srcSet="/images/gacetaNPortal.jpeg 500w, /images/gacetaNPortal.jpeg 800w, /images/gacetaNPortal.jpeg 1004w"
                          alt="Portada gaceta"
                          src="/images/gacetaNPortal.jpeg"
                          loading="lazy"
                        />

                        <div className="gaceta-card-body">
                          <h4>Gaceta #{item.numero ?? item.id}</h4>
                          <div className="gaceta-fecha">{formatearFecha(item?.date)}</div>

                          <div className="gaceta-meta">
                            {item?.year && <span>Año: {item.year}</span>}
                            {item?.tomo && <span>Tomo: {item.tomo}</span>}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="sin-resultados">
                    No se encontraron gacetas con esa búsqueda.
                  </div>
                )}
              </div>
            </div>
        )}


        {/* LEGISLACIÓN */}
        {activeTab === 'legislacion' && (
            <div data-w-tab="legislacion" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Recursos Documentales de la Legislación</h2>
                <div>
                  Consulta leyes, códigos y ordenamientos vigentes del Estado de México,
                  localiza rápidamente un documento y descárgalo en un solo clic.
                </div>
              </div>

              <div className="filtros-gaceta">
                <div className="buscador-texto-box">
                  <label htmlFor="busquedaLegislacion" className="label-fecha">
                    Buscar documento
                  </label>

                  <input
                    id="busquedaLegislacion"
                    type="text"
                    value={busquedaLegislacion}
                    onChange={(e) => setBusquedaLegislacion(e.target.value)}
                    className="input-fecha"
                    placeholder="Ej. constitución, código civil, administrativo"
                  />
                </div>

                <button
                  type="button"
                  className="btn-limpiar-fecha"
                  onClick={() => setBusquedaLegislacion('')}
                >
                  Limpiar
                </button>
              </div>

              <div className="legislacion-lista">
                {legislacionFiltrada.length > 0 ? (
                  legislacionFiltrada.map((item: any, index: number) => (
                    <div
                      className="legislacion-item"
                      key={item.id ?? index}
                      style={{ transitionDelay: `${index * 0.05}s` }}
                    >
                      <div className="legislacion-item-info">
                        <h4>{item?.nombre || 'Sin nombre'}</h4>
                      </div>

                      <a
                        href={item?.path || '#'}
                        className="legislacion-btn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Descargar Documento
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="sin-resultados">
                    No se encontraron documentos con esa búsqueda.
                  </div>
                )}
              </div>
            </div>
          )}


          {/* {activeTab === 'diario_de_debates' && (
            <div data-w-tab="diario_de_debates" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Diario de Debates</h2>
                <div>
                  Consulta las versiones estenográficas y el registro de las intervenciones
                  realizadas durante las sesiones del Congreso del Estado de México.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Minuta del Congreso' && (
            <div data-w-tab="Minuta del Congreso" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Minutas del Congreso</h2>
                <div>
                  Consulta los acuerdos y resoluciones generados en las sesiones del Congreso del
                  Estado de México.
                </div>
              </div>
            </div>
          )} */}

          
            </div>

         </div>
      
      
    </>
  );
}