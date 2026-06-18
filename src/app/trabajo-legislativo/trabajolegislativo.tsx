'use client';

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTrabajoLegislativo, getOrdenes } from '../service/trabajo_legislativo.service';

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
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const validTabs = ['Gaceta', 'legislacion', 'orden_del_dia', 'iniciativas', 'puntos_acuerdo', 'minutas'];
  const [activeTab, setActiveTab] = useState(validTabs.includes(tabParam ?? '') ? tabParam! : 'Gaceta');
  const [trabajoLegislativo, setTrabajoLegislativo] = useState<any[]>([]);
  const [legislacion, setLegislacion] = useState<any[]>([]);
  const [busquedaTexto, setBusquedaTexto] = useState('');
  const [busquedaLegislacion, setBusquedaLegislacion] = useState('');

  // Estados para Orden del día
  const [todasLasOrdenes, setTodasLasOrdenes] = useState<any[]>([]);
  const [mesOrden, setMesOrden] = useState('');
  const [anioOrden, setAnioOrden] = useState('');
  const [paginaOrden, setPaginaOrden] = useState(1);
  const [isLoadingOrdenes, setIsLoadingOrdenes] = useState(false);
  const [paginaIniciativas, setPaginaIniciativas] = useState(1);
  const [paginaPuntos, setPaginaPuntos] = useState(1);
  const [paginaMinutas, setPaginaMinutas] = useState(1);
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollToTabs = () => tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Estados para Iniciativas
  const [iniciativas, setIniciativas] = useState<any[]>([]);
  const [busquedaIniciativas, setBusquedaIniciativas] = useState('');
  const deferredBusquedaIniciativas = useDeferredValue(busquedaIniciativas);

  // Estados para Puntos de Acuerdo
  const [puntosAcuerdo, setPuntosAcuerdo] = useState<any[]>([]);
  const [mesPuntos, setMesPuntos] = useState('');
  const [anioPuntos, setAnioPuntos] = useState('');

  // Estados para Minutas
  const [minutas, setMinutas] = useState<any[]>([]);
  const [busquedaMinutas, setBusquedaMinutas] = useState('');
  const deferredBusquedaMinutas = useDeferredValue(busquedaMinutas);

  const fetchOrdenes = async () => {
    setIsLoadingOrdenes(true);
    try {
      // The API returns all 114 items regardless of query parameters, so we fetch once without params
      const response = await getOrdenes();
      if (response && response.eventos) {
        setTodasLasOrdenes(response.eventos);
      }
      if (response && response.iniciativas) {
        setIniciativas(response.iniciativas);
      }
      if (response && response.puntosAcuerdo) {
        setPuntosAcuerdo(response.puntosAcuerdo);
      }
      if (response && response.minutas) {
        setMinutas(response.minutas);
      }
    } catch (error) {
      console.error('Error al obtener ordenes del dia:', error);
    } finally {
      setIsLoadingOrdenes(false);
    }
  };

  useEffect(() => {
    if (
      (activeTab === 'orden_del_dia' || activeTab === 'iniciativas' || activeTab === 'puntos_acuerdo' || activeTab === 'minutas') &&
      todasLasOrdenes.length === 0
    ) {
      fetchOrdenes();
    }
  }, [activeTab]);

  const ordenesFiltradas = useMemo(() => {
    return todasLasOrdenes.filter(orden => {
      if (!orden.fecha) return false;
      const [yyyy, mm] = orden.fecha.split('T')[0].split('-');
      const matchMes = mesOrden ? parseInt(mm).toString() === mesOrden : true;
      const matchAnio = anioOrden ? yyyy === anioOrden : true;
      return matchMes && matchAnio;
    });
  }, [todasLasOrdenes, mesOrden, anioOrden]);

  const ordenesPaginadas = useMemo(() => {
    const limit = 10;
    const start = (paginaOrden - 1) * limit;
    return ordenesFiltradas.slice(start, start + limit);
  }, [ordenesFiltradas, paginaOrden]);


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

  const fechasIniciativas = useMemo(() => {
    const m = new Map<string, string>();
    iniciativas.forEach(item => {
      const raw = item?.fecha_evento_raw?.split('T')[0];
      if (raw) m.set(item.id, formatearFecha(raw).toLowerCase());
    });
    return m;
  }, [iniciativas]);

  const iniciativasFiltradas = useMemo(() => {
    if (!Array.isArray(iniciativas)) return [];
    const sorted = [...iniciativas].sort((a, b) => b.no - a.no);
    const termino = deferredBusquedaIniciativas.trim().toLowerCase();
    if (!termino) return sorted;
    return sorted.filter((item: any) => {
      const titulo = String(item?.iniciativa || '').toLowerCase();
      const autor = String(item?.autor_detalle || item?.autor || '').toLowerCase();
      const comisiones = String(item?.comisiones || '').toLowerCase();
      const estado = String(item?.observac || '').toLowerCase();
      const grupo = String(item?.grupo_parlamentario || '').toLowerCase();
      const no = String(item?.no || '');
      const id = String(item?.id || '');
      const presentac = String(item?.presentac || '').toLowerCase();
      const fechaFormateada = fechasIniciativas.get(item.id) || '';
      return (
        titulo.includes(termino) ||
        autor.includes(termino) ||
        comisiones.includes(termino) ||
        estado.includes(termino) ||
        grupo.includes(termino) ||
        no.includes(termino) ||
        id.includes(termino) ||
        presentac.includes(termino) ||
        fechaFormateada.includes(termino)
      );
    });
  }, [iniciativas, deferredBusquedaIniciativas, fechasIniciativas]);

  const iniciativasPaginadas = useMemo(() => {
    const start = (paginaIniciativas - 1) * 10;
    return iniciativasFiltradas.slice(start, start + 10);
  }, [iniciativasFiltradas, paginaIniciativas]);

  const puntosFiltrados = useMemo(() => {
    if (!Array.isArray(puntosAcuerdo)) return [];
    return [...puntosAcuerdo].sort((a, b) => b.no - a.no).filter((item: any) => {
      if (!mesPuntos && !anioPuntos) return true;
      const raw = item?.fecha_evento_raw;
      if (!raw) return true;
      // handles both "YYYY-MM-DDTHH:MM:SS" and "YYYY-MM-DD HH:MM:SS" formats
      const datePart = raw.split(/[T ]/)[0].trim();
      const parts = datePart.split('-');
      if (parts.length < 2) return true;
      const [yyyy, mm] = parts;
      const matchMes = mesPuntos ? parseInt(mm, 10).toString() === mesPuntos : true;
      const matchAnio = anioPuntos ? yyyy.trim() === anioPuntos : true;
      return matchMes && matchAnio;
    });
  }, [puntosAcuerdo, mesPuntos, anioPuntos]);

  const puntosPaginados = useMemo(() => {
    const start = (paginaPuntos - 1) * 10;
    return puntosFiltrados.slice(start, start + 10);
  }, [puntosFiltrados, paginaPuntos]);

  const fechasMinutas = useMemo(() => {
    const m = new Map<string, string>();
    minutas.forEach(item => {
      const raw = item?.fecha_evento_raw?.split(/[T ]/)[0];
      if (raw) m.set(item.id, formatearFecha(raw).toLowerCase());
    });
    return m;
  }, [minutas]);

  const minutasFiltradas = useMemo(() => {
    if (!Array.isArray(minutas)) return [];
    const sorted = [...minutas].sort((a, b) => b.no - a.no);
    const termino = deferredBusquedaMinutas.trim().toLowerCase();
    if (!termino) return sorted;
    return sorted.filter((item: any) => {
      const titulo = String(item?.iniciativa || '').toLowerCase();
      const materia = String(item?.materia || '').toLowerCase();
      const autor = String(item?.autor_detalle || item?.autor || '').toLowerCase();
      const no = String(item?.no || '');
      const estado = String(item?.observac || '').toLowerCase();
      const presentac = String(item?.presentac || '').toLowerCase();
      const fechaFormateada = fechasMinutas.get(item.id) || '';
      const acuerdoNombre = String(item?.acuerdo?.nombre_decreto || '').toLowerCase();
      const dispensada = item?.dispensada ? 'dispensa' : '';
      const aprobada = item?.aprobada ? 'aprobado' : '';
      return (
        titulo.includes(termino) ||
        materia.includes(termino) ||
        autor.includes(termino) ||
        no.includes(termino) ||
        estado.includes(termino) ||
        presentac.includes(termino) ||
        fechaFormateada.includes(termino) ||
        acuerdoNombre.includes(termino) ||
        dispensada.includes(termino) ||
        aprobada.includes(termino)
      );
    });
  }, [minutas, deferredBusquedaMinutas, fechasMinutas]);

  const minutasPaginadas = useMemo(() => {
    const start = (paginaMinutas - 1) * 10;
    return minutasFiltradas.slice(start, start + 10);
  }, [minutasFiltradas, paginaMinutas]);

  return (
    <>

    <div
        ref={tabsRef}
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
            onClick={() => setActiveTab('orden_del_dia')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'orden_del_dia' ? 'w--current' : ''
            }`}
          >
            <div>Orden del día</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('iniciativas')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'iniciativas' ? 'w--current' : ''
            }`}
          >
            <div>Iniciativas de ley o Decretos</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('puntos_acuerdo')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'puntos_acuerdo' ? 'w--current' : ''
            }`}
          >
            <div>Puntos de Acuerdo</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('minutas')}
            className={`btn-var-2 w-inline-block w-tab-link ${
              activeTab === 'minutas' ? 'w--current' : ''
            }`}
          >
            <div>Minutas</div>
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
                            {/* {item?.tomo && <span>Tomo: {item.tomo}</span>} */}
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

        {/* ORDEN DEL DÍA */}
        {activeTab === 'orden_del_dia' && (
          <div data-w-tab="orden_del_dia" className="w-tab-pane w--tab-active">
            <div className="titulo-tab">
              <h2>Ordenes del día</h2>
              <div>Conoce más sobre lo que ocurre cada semana en la cámara de diputados</div>
              
              {/* FILTROS */}
              <div className="div-filtro-fechas-sintesis" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <select 
                  value={mesOrden} 
                  onChange={(e) => { setMesOrden(e.target.value); setPaginaOrden(1); }}
                  className="filtro-sintesis w-dropdown-toggle"
                  style={{ 
                    background: 'white', 
                    border: '1px solid #e8eaf0', 
                    padding: '8px 15px', 
                    borderRadius: '8px',
                    color: '#5f687f',
                    minWidth: '150px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235f687f\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 15px center'
                  }}
                >
                  <option value="">Todos los meses</option>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>

                <select 
                  value={anioOrden} 
                  onChange={(e) => { setAnioOrden(e.target.value); setPaginaOrden(1); }}
                  className="filtro-sintesis w-dropdown-toggle"
                  style={{ 
                    background: 'white', 
                    border: '1px solid #e8eaf0', 
                    padding: '8px 15px', 
                    borderRadius: '8px',
                    color: '#5f687f',
                    minWidth: '120px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235f687f\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 15px center'
                  }}
                >
                  <option value="">Todos los años</option>
                  {[...Array(11)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                  })}
                </select>

              </div>
            </div>

            <div style={{ width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '20px', width: '100%' }}>
                {isLoadingOrdenes ? (
                  // SKELETON LOADER
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={`sk-${idx}`} style={{ pointerEvents: 'none', background: '#fff', borderRadius: '14px', border: '1px solid #e8eaf0', padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '15px', height: '100%', boxSizing: 'border-box' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <div style={{ width: '70px', height: '70px', borderRadius: '10px', background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
                          <div style={{ width: '60%', height: '16px', borderRadius: '4px', background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '80%', height: '16px', borderRadius: '4px', background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '40%', height: '14px', borderRadius: '4px', background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', marginTop: '5px' }} />
                        </div>
                      </div>
                      <div style={{ width: '120px', height: '40px', borderRadius: '8px', background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                    </div>
                  ))
                ) : (
                  // ORDENES DATA
                  ordenesPaginadas.map((orden) => (
                    <div key={orden.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e8eaf0', padding: '15px 20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '15px', transition: 'box-shadow 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', height: '100%', boxSizing: 'border-box', flexWrap: 'nowrap', margin: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <img src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png" loading="lazy" alt="" className="img-70px" style={{ background: '#f8f9fa', padding: '10px', borderRadius: '10px', flexShrink: 0 }} />
                        <div style={{ minWidth: 0, overflow: 'hidden' }}>
                          <h4 className="subtitulo-info" style={{ color: '#8B1A1A', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Orden del día</h4>
                          <h4 className="subtitulo-info" style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{orden.descripcion || 'Sesión parlamentaria'}</h4>
                          <div className="texto-general" style={{ color: '#666', marginTop: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{formatearFecha(orden.fecha?.split('T')[0])}</div>
                        </div>
                      </div>
                      <a href={`/ordeDia/${orden.id}`} className="btn-var-2-orden_del_dia w-button" style={{ textAlign: 'center', background: '#8B1A1A', color: 'white', borderRadius: '8px', padding: '10px 15px', flexShrink: 0, fontSize: '13px' }}>Ver Orden del día</a>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* PAGINACIÓN */}
            {ordenesFiltradas.length > 0 && (
              <div className="numeralia-centrado" style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  disabled={paginaOrden === 1} 
                  onClick={() => {
                    setPaginaOrden(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: paginaOrden === 1 ? 'not-allowed' : 'pointer', padding: '5px 10px', background: paginaOrden === 1 ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  Anterior
                </button>
                <span style={{ padding: '5px 10px' }}>Página {paginaOrden} de {Math.ceil(ordenesFiltradas.length / 10)}</span>
                <button 
                  disabled={paginaOrden >= Math.ceil(ordenesFiltradas.length / 10)}
                  onClick={() => {
                    setPaginaOrden(prev => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ cursor: paginaOrden >= Math.ceil(ordenesFiltradas.length / 10) ? 'not-allowed' : 'pointer', padding: '5px 10px', background: paginaOrden >= Math.ceil(ordenesFiltradas.length / 10) ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  Siguiente
                </button>
              </div>
            )}
            {!isLoadingOrdenes && ordenesFiltradas.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '14px', border: '1px dashed #ccc', marginTop: '20px' }}>
                <div style={{ fontSize: '18px', color: '#5f687f', marginBottom: '10px' }}>No hay ordenes del día para mostrar.</div>
                <div style={{ color: '#888' }}>Intenta ajustando los filtros de búsqueda.</div>
              </div>
            )}
          </div>
        )}

        {/* INICIATIVAS DE LEY O DECRETOS */}
        {activeTab === 'iniciativas' && (
          <div data-w-tab="iniciativas" className="w-tab-pane w--tab-active">
            <div className="titulo-tab">
              <h2 className="h4-centrado">Iniciativas de ley o Decretos</h2>
              <div className="texto-centrado">
                Propuestas presentadas por integrantes de la legislatura o autoridades facultadas para crear, reformar, adicionar o derogar disposiciones legales.
              </div>
            </div>

            <div className="filtros-gaceta">
              <div className="buscador-texto-box">
                <label htmlFor="busquedaIniciativas" className="label-fecha">
                  Buscar iniciativa
                </label>
                <input
                  id="busquedaIniciativas"
                  type="text"
                  value={busquedaIniciativas}
                  onChange={(e) => { setBusquedaIniciativas(e.target.value); setPaginaIniciativas(1); }}
                  className="input-fecha"
                  placeholder="Ej. educación, decreto, reforma, autor..."
                />
              </div>
              <button
                type="button"
                className="btn-limpiar-fecha"
                onClick={() => { setBusquedaIniciativas(''); setPaginaIniciativas(1); }}
              >
                Limpiar
              </button>
            </div>

            {isLoadingOrdenes ? (
              <ul role="list" className="btn-iniciativas-turnado">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <div className="div-iniciativa-bloque">
                      <div className="div-block-85">
                        <div style={{ width: 70, height: 70, borderRadius: 10, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', gap: 40 }}>
                            <div style={{ width: 60, height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                            <div style={{ width: 130, height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          </div>
                          <div style={{ width: '88%', height: 18, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '55%', height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '35%', height: 12, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: 160, height: 32, borderRadius: 8, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <div style={{ width: 80, height: 14, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        <div style={{ width: 90, height: 36, borderRadius: 8, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul role="list" className="btn-iniciativas-turnado">
                {iniciativasFiltradas.length > 0 ? (
                  iniciativasPaginadas.map((item: any, index: number) => {
                    const contador = iniciativasFiltradas.length - ((paginaIniciativas - 1) * 10 + index);
                    return (
                    <li key={item.id ?? index}>
                      <div className="div-iniciativa-bloque">
                        <div className="div-block-85">
                          <img
                            src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png"
                            loading="lazy"
                            alt=""
                            className="img-70px"
                          />
                          <div>
                            <div className="info-iniciativas-bloque">
                              <div>No. {contador}</div>
                              <div>{formatearFecha(item.fecha_evento_raw?.split('T')[0])}</div>
                            </div>
                            <h4 className="texto-general-bold">{item.iniciativa}</h4>
                            <div>Autor: <strong>{item.autor_detalle || item.autor}</strong></div>
                            {item.comisiones && (
                              <>
                                <div>Turnada a:</div>
                                {item.comisiones.split(',').map((com: string, ci: number) => (
                                  <span key={ci} className="btn-basico w-button" style={{ display: 'inline-block', marginRight: '6px', marginTop: '4px' }}>
                                    {com.trim()}
                                  </span>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                          <div className={`texto-general-bold-centrado ${item.aprobada ? 'verde' : ''}`}>
                            {item.observac || 'En Estudio'}
                          </div>
                          {item.documento && (
                            <a
                              href={`https://parlamentario.congresoedomex.gob.mx/backend/${item.documento}`}
                              className="btn-var-2 w-button"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Descargar
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ); })
                ) : (
                  <div className="sin-resultados">
                    No se encontraron iniciativas con esa búsqueda.
                  </div>
                )}
              </ul>
            )}
            {!isLoadingOrdenes && iniciativasFiltradas.length > 10 && (
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                <button
                  disabled={paginaIniciativas === 1}
                  onClick={() => { setPaginaIniciativas(p => p - 1); scrollToTabs(); }}
                  style={{ cursor: paginaIniciativas === 1 ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaIniciativas === 1 ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Anterior</button>
                <span style={{ padding: '5px 10px' }}>Página {paginaIniciativas} de {Math.ceil(iniciativasFiltradas.length / 10)}</span>
                <button
                  disabled={paginaIniciativas >= Math.ceil(iniciativasFiltradas.length / 10)}
                  onClick={() => { setPaginaIniciativas(p => p + 1); scrollToTabs(); }}
                  style={{ cursor: paginaIniciativas >= Math.ceil(iniciativasFiltradas.length / 10) ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaIniciativas >= Math.ceil(iniciativasFiltradas.length / 10) ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Siguiente</button>
              </div>
            )}
          </div>
        )}

        {/* MINUTAS */}
        {activeTab === 'minutas' && (
          <div data-w-tab="minutas" className="w-tab-pane w--tab-active">
            <div className="titulo-tab">
              <h2 className="h4-centrado">Minutas del H. Congreso de la Unión recibidas durante la legislatura</h2>
              <div className="texto-centrado">
                Proyectos de ley o decreto a la Constitución federal aprobados por el Congreso de la Unión y enviadas al Congreso del Estado de México para su análisis, discusión y eventual aprobación.
              </div>
            </div>

            <div className="filtros-gaceta">
              <div className="buscador-texto-box">
                <label htmlFor="busquedaMinutas" className="label-fecha">
                  Buscar minuta
                </label>
                <input
                  id="busquedaMinutas"
                  type="text"
                  value={busquedaMinutas}
                  onChange={(e) => { setBusquedaMinutas(e.target.value); setPaginaMinutas(1); }}
                  className="input-fecha"
                  placeholder="Ej. licencia, decreto, elección..."
                />
              </div>
              <button
                type="button"
                className="btn-limpiar-fecha"
                onClick={() => { setBusquedaMinutas(''); setPaginaMinutas(1); }}
              >
                Limpiar
              </button>
            </div>

            {isLoadingOrdenes ? (
              <ul role="list" className="w-list-unstyled">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <div className="div-punto-acuerdo-block">
                      <div>
                        <div className="div-block-85">
                          <div style={{ width: 70, height: 70, borderRadius: 10, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div style={{ width: 60, height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                            <div style={{ width: '88%', height: 18, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                            <div style={{ width: '55%', height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                            <div style={{ width: 160, height: 32, borderRadius: 8, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul role="list" className="w-list-unstyled">
                {minutasFiltradas.length > 0 ? (
                  minutasPaginadas.map((item: any, index: number) => {
                    const contador = minutasFiltradas.length - ((paginaMinutas - 1) * 10 + index);
                    return (
                    <li key={item.id ?? index}>
                      <div className="div-punto-acuerdo-block">

                        {/* — Bloque principal — */}
                        <div>
                          <div className="div-block-85">
                            <img
                              src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png"
                              loading="lazy"
                              alt=""
                              className="img-70px"
                            />
                            <div className="div-info-bloque">
                              <div>No. {contador}</div>
                              {item.autor_detalle && item.autor_detalle !== '-' && (
                                <div>Autor: <strong>{item.autor_detalle}</strong></div>
                              )}
                              <h4 className="texto-general-bold">{item.iniciativa}</h4>
                              <div>Fecha de presentación: {formatearFecha(item.fecha_evento_raw?.split(/[T ]/)[0])}</div>
                              {item.dispensada && <div>Dispensa.</div>}
                              {item.aprobada && (
                                <div className="texto-general-bold verde">Aprobado</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="texto-general-bold">{item.observac || 'En Estudio'}</div>
                            {item.documento && (
                              <a
                                href={`https://parlamentario.congresoedomex.gob.mx/backend/${item.documento}`}
                                className="btn-boletin w-button"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Minuta
                              </a>
                            )}
                          </div>
                        </div>

                        {/* — Bloque acuerdo (solo si existe) — */}
                        {item.acuerdo && (
                          <div>
                            <div className="div-block-85">
                              <div className="div-info-bloque">
                                <h4 className="texto-general-bold">Acuerdo</h4>
                                {item.acuerdo.nombre_decreto && (
                                  <div>{item.acuerdo.nombre_decreto}</div>
                                )}
                              </div>
                            </div>
                            <div>
                              {item.acuerdo.decreto && (
                                <a
                                  href={`https://parlamentario.congresoedomex.gob.mx/backend/${item.acuerdo.decreto}`}
                                  className="btn-boletin w-button"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Acuerdo
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    </li>
                  ); })
                ) : (
                  <div className="sin-resultados">
                    No se encontraron minutas con esa búsqueda.
                  </div>
                )}
              </ul>
            )}
            {!isLoadingOrdenes && minutasFiltradas.length > 10 && (
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                <button
                  disabled={paginaMinutas === 1}
                  onClick={() => { setPaginaMinutas(p => p - 1); scrollToTabs(); }}
                  style={{ cursor: paginaMinutas === 1 ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaMinutas === 1 ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Anterior</button>
                <span style={{ padding: '5px 10px' }}>Página {paginaMinutas} de {Math.ceil(minutasFiltradas.length / 10)}</span>
                <button
                  disabled={paginaMinutas >= Math.ceil(minutasFiltradas.length / 10)}
                  onClick={() => { setPaginaMinutas(p => p + 1); scrollToTabs(); }}
                  style={{ cursor: paginaMinutas >= Math.ceil(minutasFiltradas.length / 10) ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaMinutas >= Math.ceil(minutasFiltradas.length / 10) ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Siguiente</button>
              </div>
            )}
          </div>
        )}

        {/* PUNTOS DE ACUERDO */}
        {activeTab === 'puntos_acuerdo' && (
          <div data-w-tab="puntos_acuerdo" className="w-tab-pane w--tab-active">
            <div className="titulo-tab">
              <h2 className="h4-centrado">Puntos de Acuerdo presentados durante la LXII Legislatura</h2>
              <div className="texto-centrado">
                Resoluciones de la legislatura sobre asuntos de interés público que no requieren la creación de una ley pero sí un pronunciamiento formal del Congreso.
              </div>
            </div>

            <div className="filtros-gaceta">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div className="buscador-fecha-box">
                  <label className="label-fecha">Mes</label>
                  <select
                    value={mesPuntos}
                    onChange={(e) => { setMesPuntos(e.target.value); setPaginaPuntos(1); }}
                    className="input-fecha"
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235f687f\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                  >
                    <option value="">Todos los meses</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </div>

                <div className="buscador-fecha-box">
                  <label className="label-fecha">Año</label>
                  <select
                    value={anioPuntos}
                    onChange={(e) => { setAnioPuntos(e.target.value); setPaginaPuntos(1); }}
                    className="input-fecha"
                    style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235f687f\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                  >
                    <option value="">Todos los años</option>
                    {[...Array(11)].map((_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={String(year)}>{year}</option>;
                    })}
                  </select>
                </div>

                <button
                  type="button"
                  className="btn-limpiar-fecha"
                  onClick={() => {
                    setMesPuntos('');
                    setAnioPuntos('');
                    setPaginaPuntos(1);
                  }}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {isLoadingOrdenes ? (
              <ul role="list" className="btn-iniciativas-turnado">
                {Array.from({ length: 5 }).map((_, i) => (
                  <li key={i}>
                    <div className="div-iniciativa-bloque">
                      <div className="div-block-85">
                        <div style={{ width: 70, height: 70, borderRadius: 10, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out', flexShrink: 0 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <div style={{ display: 'flex', gap: 40 }}>
                            <div style={{ width: 60, height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                            <div style={{ width: 130, height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          </div>
                          <div style={{ width: '88%', height: 18, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '55%', height: 13, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                          <div style={{ width: '35%', height: 12, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        <div style={{ width: 80, height: 14, borderRadius: 4, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                        <div style={{ width: 90, height: 36, borderRadius: 8, background: '#f0f0f0', animation: 'pulse 1.5s infinite ease-in-out' }} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul role="list" className="list-legislacion-documentos">
                {puntosFiltrados.length > 0 ? (
                  puntosPaginados.map((item: any, index: number) => {
                    const contador = puntosFiltrados.length - ((paginaPuntos - 1) * 10 + index);
                    return (
                    <li key={item.id ?? index}>
                      <div className="div-punto-acuerdo-block">

                        {/* — Bloque principal (siempre visible) — */}
                        <div>
                          <div className="div-block-85">
                            <img
                              src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png"
                              loading="lazy"
                              alt=""
                              className="img-70px"
                            />
                            <div className="div-info-bloque">
                              <div className="info-iniciativas-bloque">
                                <div>No. {contador}</div>
                                <div>Fecha de presentación: {formatearFecha(item.fecha_evento_raw?.split(/[T ]/)[0])}</div>
                              </div>
                              <h4 className="texto-general-bold">
                                {item.titulo || item.descripcion || item.punto || item.iniciativa}
                              </h4>
                              {(item.autor_detalle || item.autor) && (
                                <div>Autor: <strong>{item.autor_detalle || item.autor}</strong></div>
                              )}
                              {item.comisiones && item.comisiones !== '-' && (
                                <div>Turnado a: <strong>{item.comisiones}</strong></div>
                              )}
                              {item.dispensada && <div>Dispensa.</div>}
                              {item.aprobada && (
                                <div className="texto-general-bold verde">Aprobado</div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="texto-general-bold">{item.observac || 'En Estudio'}</div>
                            {item.documento && (
                              <a
                                href={`https://parlamentario.congresoedomex.gob.mx/backend/${item.documento}`}
                                className="btn-boletin w-button"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Punto de acuerdo
                              </a>
                            )}
                          </div>
                        </div>

                        {/* — Bloque acuerdo (solo si existe) — */}
                        {item.acuerdo && (
                          <div>
                            <div className="div-block-85">
                              <div className="div-info-bloque">
                                <h4 className="texto-general-bold">Acuerdo</h4>
                                <div>{item.acuerdo}</div>
                              </div>
                            </div>
                            <div>
                              {item.documento_acuerdo && (
                                <a
                                  href={`https://parlamentario.congresoedomex.gob.mx/backend/${item.documento_acuerdo}`}
                                  className="btn-boletin w-button"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Acuerdo
                                </a>
                              )}
                            </div>
                          </div>
                        )}

                      </div>
                    </li>
                  ); })
                ) : (
                  <div className="sin-resultados">
                    No se encontraron puntos de acuerdo para el período seleccionado.
                  </div>
                )}
              </ul>
            )}
            {!isLoadingOrdenes && puntosFiltrados.length > 10 && (
              <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '20px', alignItems: 'center' }}>
                <button
                  disabled={paginaPuntos === 1}
                  onClick={() => { setPaginaPuntos(p => p - 1); scrollToTabs(); }}
                  style={{ cursor: paginaPuntos === 1 ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaPuntos === 1 ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Anterior</button>
                <span style={{ padding: '5px 10px' }}>Página {paginaPuntos} de {Math.ceil(puntosFiltrados.length / 10)}</span>
                <button
                  disabled={paginaPuntos >= Math.ceil(puntosFiltrados.length / 10)}
                  onClick={() => { setPaginaPuntos(p => p + 1); scrollToTabs(); }}
                  style={{ cursor: paginaPuntos >= Math.ceil(puntosFiltrados.length / 10) ? 'not-allowed' : 'pointer', padding: '5px 12px', background: paginaPuntos >= Math.ceil(puntosFiltrados.length / 10) ? '#f0f0f0' : '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                >Siguiente</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
    <style jsx global>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `}</style>
  </>
  );
}