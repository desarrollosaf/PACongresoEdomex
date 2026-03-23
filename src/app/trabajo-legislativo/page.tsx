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

export default function TrabajoLegislativoPage() {
  const [activeTab, setActiveTab] = useState('Gaceta');
  const [trabajoLegislativo, setTrabajoLegislativo] = useState<any[]>([]);
  const [legislacion, setLegislacion] = useState<any[]>([]);
  const [busquedaTexto, setBusquedaTexto] = useState('');

  useEffect(() => {
    const cargarTrabajoLegislativo = async () => {
      try {
        const data = await getTrabajoLegislativo();

        setTrabajoLegislativo(data.gaceta || []);
        setLegislacion(data.legislacion || []); // nuevo estado
      } catch (error) {
        console.error('Error al obtener trabajo legislativo:', error);
        setTrabajoLegislativo([]);
        setLegislacion([]);
      }
    };

    cargarTrabajoLegislativo();
  }, []);

  useEffect(() => {
    if (activeTab !== 'Gaceta') return;

    const cards = document.querySelectorAll('.gaceta-card');

    cards.forEach((card) => {
      card.classList.remove('show');
    });

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
  }, [trabajoLegislativo, busquedaTexto, activeTab]);

  const gacetasFiltradas = useMemo(() => {
    if (!Array.isArray(trabajoLegislativo)) return [];

    const termino = busquedaTexto.trim().toLowerCase();

    if (termino === '') {
      return trabajoLegislativo;
    }

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

  return (
    <section className="main-legislativo">
      <h2 className="titulo-seccion trabajo-legislativo">Trabajo Legislativo</h2>

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

          <button
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
          </button>
        </div>

        <div className="tabs-content w-tab-content">
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
                    <div
                      className="gaceta-card"
                      key={item.id ?? index}
                      style={{ transitionDelay: `${index * 0.06}s` }}
                    >
                      <img
                        className="gaceta-img"
                        sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                        srcSet="/images/gaceta-example-4-p-500.jpeg 500w, /images/gaceta-example-4-p-800.jpeg 800w, /images/gaceta-example-4.jpeg 1004w"
                        alt="Portada gaceta"
                        src="/images/gaceta-example-4.jpeg"
                        loading="lazy"
                      />

                      <div className="gaceta-card-body">
                        <h4>Gaceta #{item.numero ?? item.id}</h4>
                        <div className="gaceta-fecha">{formatearFecha(item.date)}</div>

                        <div className="gaceta-meta">
                          {item.year && <span>Año: {item.year}</span>}
                          {item.tomo && <span>Tomo: {item.tomo}</span>}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="sin-resultados">
                    No se encontraron gacetas con esa búsqueda.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'legislacion' && (
            <div data-w-tab="legislacion" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Recursos Documentales de la Legislación</h2>
                <div>
                  Aqui necesito un subtitulo, para explicarle al ciudadano que puede encontrar en esta
                  sección
                </div>
              </div>

              <ul role="list" className="list-legislacion-documentos">
                {legislacion.length > 0 ? (
                  legislacion.map((item: any, index: number) => (
                    <li key={item.id ?? index}>
                      <div className="div-block-30">
                        <h4>{item.nombre}</h4>
                        <a href={item.path} className="btn-var-2 w-button" target="_blank">
                          Descargar Documento
                        </a>
                      </div>
                    </li>
                  ))
                ) : (
                  <div>No hay documentos disponibles.</div>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'diario_de_debates' && (
            <div data-w-tab="diario_de_debates" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Recursos Documentales de la Legislación</h2>
                <div>
                  Aqui necesito un subtitulo para explicarle al ciudadano que puede encontrar en esta
                  sección
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Minuta del Congreso' && (
            <div data-w-tab="Minuta del Congreso" className="w-tab-pane w--tab-active">
              <div className="titulo-tab">
                <h2>Minutas del Congreso</h2>
                <div>Conoce más sobre lo que ocurre cada semana en la cámara de diputados</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}