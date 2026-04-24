'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';

type Foto = {
    path: string;
};

type Partido = {
    siglas: string;
    nombre: string;
};

type Distrito = {
    distrito: string;
};

type Integrante = {
    partido?: Partido;
    distrito?: Distrito;
};

type Diputado = {
    id: string;
    apaterno: string;
    amaterno: string;
    nombres: string;
    fancyurl?: string;
    gender_id?: string;
    genero?: {
        id: string;
        genero: string;
    };
    fotos?: Foto[];
    integrantes?: Integrante[];
};

const BASE_URL = 'http:/127.0.0.1:8088/';

const PARTIDOS = [
    { id: 'morena', nombre: 'Morena', clase: '', logo: 'images/morena.png' },
    { id: 'pvem', nombre: 'PVEM', clase: 'btn-pvem', logo: 'images/PVEM.png' },
    { id: 'pt', nombre: 'PT', clase: 'btn-pt', logo: 'images/PT.png' },
    { id: 'pri', nombre: 'PRI', clase: 'btn-pri', logo: 'images/PRI.png' },
    { id: 'pan', nombre: 'PAN', clase: 'btn-pan', logo: 'images/Pan.png' },
    { id: 'mc', nombre: 'MC', clase: 'btn-mc', logo: 'images/MC.png' },
    { id: 'prd', nombre: 'PRD', clase: 'btn-prd', logo: 'images/PRD.png' },
];

type SortKey = '' | 'nombre' | 'apellido' | 'genero' | 'distrito';

export default function ParlamentariosClient({ diputados }: { diputados: Diputado[] }) {
    const [busqueda, setBusqueda] = useState('');
    const [partidoSeleccionado, setPartidoSeleccionado] = useState<string | null>(null);
    const [orden, setOrden] = useState<SortKey>('');
    const [ordenOpen, setOrdenOpen] = useState(false);

    const resultadosRef = useRef<HTMLDivElement>(null);
    const botonesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const p = params.get('partido');
            if (p) {
                setPartidoSeleccionado(p);
                setTimeout(() => {
                    resultadosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, []);

    const handleSelectPartido = (partidoId: string) => {
        setPartidoSeleccionado(partidoId);
        // Scroll hacia los resultados suavemente
        setTimeout(() => {
            resultadosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleScrollTop = () => {
        botonesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const resultado = useMemo(() => {
        if (!partidoSeleccionado) return [];

        let lista = [...diputados];

        // Filtrar por el partido seleccionado
        lista = lista.filter((d) => {
            const siglas = d.integrantes?.[0]?.partido?.siglas?.toLowerCase() ?? '';
            return siglas === partidoSeleccionado.toLowerCase();
        });

        // Autocompletado de texto (nombre, apellidos, distrito)
        if (busqueda.trim()) {
            const q = busqueda.trim().toLowerCase();
            lista = lista.filter((d) => {
                const integrante = d.integrantes?.[0];
                const nombreCompleto = `${d.apaterno ?? ''} ${d.amaterno ?? ''} ${d.nombres ?? ''}`.toLowerCase();
                const distrito = integrante?.distrito?.distrito?.toLowerCase() ?? '';
                return (
                    nombreCompleto.includes(q) ||
                    distrito.includes(q)
                );
            });
        }

        // Ordenamiento
        if (orden === 'nombre') {
            lista.sort((a, b) => (a.nombres ?? '').localeCompare(b.nombres ?? ''));
        } else if (orden === 'apellido') {
            lista.sort((a, b) => (a.apaterno ?? '').localeCompare(b.apaterno ?? ''));
        } else if (orden === 'genero') {
            lista.sort((a, b) => (a.genero?.genero ?? '').localeCompare(b.genero?.genero ?? ''));
        } else if (orden === 'distrito') {
            lista.sort((a, b) => {
                const da = a.integrantes?.[0]?.distrito?.distrito ?? '';
                const db = b.integrantes?.[0]?.distrito?.distrito ?? '';
                return da.localeCompare(db);
            });
        }

        return lista;
    }, [diputados, busqueda, partidoSeleccionado, orden]);

    const partidoInfo = PARTIDOS.find(p => p.id === partidoSeleccionado);

    return (
        <section className="diputados max_width">
            {/* Sección superior: Botones */}
            <div ref={botonesRef} style={{ scrollMarginTop: '100px' }}>
                <h3 className="heading-3 titulo-seccion" style={{ textAlign: 'left' }}>Grupos Parlamentarios</h3>
                <br />
                <div className="filtros-diputados grupos-parlamentarios-selector">
                    {PARTIDOS.map((grupo) => (
                        <a
                            href="#"
                            key={grupo.id}
                            onClick={(e) => { e.preventDefault(); handleSelectPartido(grupo.id); }}
                            className={`button grupo_parlamentario btn-grupo-parlamentario w-button ${grupo.clase}`}
                            style={{
                                opacity: partidoSeleccionado && partidoSeleccionado !== grupo.id ? 0.6 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {grupo.nombre}
                        </a>
                    ))}
                </div>
            </div>

            {/* Sección inferior: Resultados */}
            {partidoSeleccionado && partidoInfo && (
                <div ref={resultadosRef} style={{ marginTop: '3rem', paddingBottom: '2rem', scrollMarginTop: '40px' }} className="seccion-de-diputados">
                    
                    {/* Header del partido */}
                    <div className="div-block-36" style={{ marginBottom: '2rem' }}>
                        <div className="features-wrapper">
                            <div className="features-gp">
                                <img
                                    src={partidoInfo.logo}
                                    loading="lazy"
                                    sizes="(max-width: 839px) 100vw, 839px"
                                    alt={`${partidoInfo.nombre} Logo`}
                                    className="img-grupo_parlamentario-logo"
                                />
                                <div className="titulo-seccion-legislativo">{partidoInfo.nombre}</div>
                            </div>
                        </div>
                    </div>

                    {/* Botones de navegación solictados */}
                    <div className="div-block-26" style={{ marginBottom: '2.5rem' }}>
                        <a href="/mesa-directiva" target="_blank" rel="noopener noreferrer" className="btn-var-2 w-button">Diputación Permanente</a>
                        <a href="/junta-de-coordinacion-politica" target="_blank" rel="noopener noreferrer" className="btn-var-2 w-button">Junta de Coordinación Política</a>
                        <a href="/comisiones" target="_blank" rel="noopener noreferrer" className="btn-var-2 w-button">Comisiones y Comités</a>
                    </div>

                    {/* Filtros */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <h4 className="heading-13">Búsqueda</h4>
                            <div>Filtra u ordena a los legisladores del grupo parlamentario.</div>
                        </div>
                        <form
                            className="search-2 w-form"
                            onSubmit={(e) => e.preventDefault()}
                            style={{ display: 'flex', alignItems: 'center', margin: 0 }}
                        >
                            <input
                                className="search-input-2 w-input"
                                maxLength={256}
                                name="query"
                                placeholder="Buscar por nombre, apellido o distrito"
                                type="search"
                                id="search-2"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <input type="submit" className="search-button-2 w-button" value="Buscar" />
                        </form>
                    </div>

                    <div>
                        <div className="div-block-26" style={{ marginBottom: '1.5rem' }}>
                            <div data-hover="false" data-delay="0" className="dropdown-grupo-parlamentario w-dropdown" onClick={() => setOrdenOpen(!ordenOpen)}>
                                <div className={`filtro-grupoparlamentario w-dropdown-toggle ${ordenOpen ? 'w--open' : ''}`}>
                                    <div className="w-icon-dropdown-toggle"></div>
                                    <div>{orden ? `Orden: ${orden}` : 'Orden'}</div>
                                </div>
                                <nav className={`dropdown-list-2 w-dropdown-list ${ordenOpen ? 'w--open' : ''}`}>
                                    {(['nombre', 'apellido', 'genero', 'distrito'] as SortKey[]).map((op) => (
                                        <a
                                            key={op}
                                            href="#"
                                            className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link"
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                setOrden(op === orden ? '' : op);
                                                setOrdenOpen(false);
                                            }}
                                            style={{ fontWeight: op === orden ? 'bold' : undefined, textTransform: 'capitalize' }}
                                        >
                                            {op.charAt(0).toUpperCase() + op.slice(1)}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {busqueda && (
                        <div style={{ margin: '8px 0', fontSize: '0.9rem', opacity: 0.75 }}>
                            {resultado.length} resultado{resultado.length !== 1 ? 's' : ''} para "{busqueda}"
                        </div>
                    )}

                    {/* Grilla de Diputados */}
                    <div className="grupo-de-filtro">
                        <div>
                            <div className="w-layout-grid grid-3">
                                {resultado.length === 0 ? (
                                    <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                                        No se encontraron legisladores con ese criterio.
                                    </div>
                                ) : resultado.map((diputado) => {
                                    const integrante = diputado.integrantes?.[0];
                                    const siglas = integrante?.partido?.siglas ?? '';
                                    const distrito = integrante?.distrito;
                                    const foto = diputado.fotos?.[0];
                                    const fotoUrl = foto?.path ? `${BASE_URL}${foto.path}` : 'images/placeholder-diputado.png';
                                    const nombreCompleto = `${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''} ${diputado.nombres ?? ''}`.trim();
                                    const tipoCargo = distrito?.distrito ?? 'Plurinominal';

                                    return (
                                        <div key={diputado.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <img
                                                src={fotoUrl}
                                                loading="lazy"
                                                alt={nombreCompleto}
                                                className={`image-15 diputado-${siglas.toLowerCase()}`}
                                            />
                                            <div className="info-diputado-basica" style={{ flex: 1, minHeight: '80px' }}>
                                                <h4 className="nombre-diputado">{nombreCompleto}</h4>
                                                <div className="gp-diputado">{siglas.toUpperCase()}</div>
                                                <div>{tipoCargo}</div>
                                            </div>
                                            <Link href={`/perfil-diputado/${diputado.id}`} className="btn-var-2 w-button">
                                                Saber más
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Botón Volver Arriba */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                        <button
                            onClick={handleScrollTop}
                            className="btn-var-2 w-button"
                            style={{ border: 'none', cursor: 'pointer', padding: '10px 30px' }}
                        >
                            ↑ Ir al inicio
                        </button>
                    </div>

                </div>
            )}
        </section>
    );
}
