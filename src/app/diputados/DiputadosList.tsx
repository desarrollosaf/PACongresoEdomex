'use client';

import { useState, useMemo } from 'react';

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

const BASE_URL = 'https://www.congresoedomex.gob.mx/';

const PARTIDOS = ['morena', 'PAN', 'PT', 'PRI', 'PVEM', 'MC', 'PRD'];
const PARTIDO_LOGOS: Record<string, string> = {
    morena: 'images/morena.png',
    pt: 'images/PT.png',
    pvem: 'images/PVEM.png',
    pri: 'images/PRI.png',
    pan: 'images/Pan.png',
    mc: 'images/MC.png',
    prd: 'images/PRD.png',
};

const getTitulo = (diputado: Diputado): string => {
    if (diputado.id === '40f129de-671d-41ac-8d1a-da9609fd0bf3') return 'Diputade';
    if (diputado.gender_id === 'bbd00c65-de34-4257-a939-7fc79eacc479') return 'Diputada';
    return 'Diputado';
};

type SortKey = '' | 'nombre' | 'apellido' | 'genero' | 'distrito';

export default function DiputadosList({ diputados }: { diputados: Diputado[] }) {
    const [busqueda, setBusqueda] = useState('');
    const [partidoFiltro, setPartidoFiltro] = useState('');
    const [orden, setOrden] = useState<SortKey>('');

    const resultado = useMemo(() => {
        let lista = [...diputados];

        // Filtro  (nombre, apellidos, partido, distrito)
        if (busqueda.trim()) {
            const q = busqueda.trim().toLowerCase();
            lista = lista.filter((d) => {
                const integrante = d.integrantes?.[0];
                const nombreCompleto = `${d.apaterno ?? ''} ${d.amaterno ?? ''} ${d.nombres ?? ''}`.toLowerCase();
                const partido = integrante?.partido?.siglas?.toLowerCase() ?? '';
                const partidoNombre = integrante?.partido?.nombre?.toLowerCase() ?? '';
                const distrito = integrante?.distrito?.distrito?.toLowerCase() ?? '';
                return (
                    nombreCompleto.includes(q) ||
                    partido.includes(q) ||
                    partidoNombre.includes(q) ||
                    distrito.includes(q)
                );
            });
        }

        // Filtro por partido
        if (partidoFiltro) {
            lista = lista.filter((d) => {
                const siglas = d.integrantes?.[0]?.partido?.siglas?.toLowerCase() ?? '';
                return siglas === partidoFiltro.toLowerCase();
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
    }, [diputados, busqueda, partidoFiltro, orden]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                    <h4 className="heading-13">Por apellido A-Z</h4>
                    <div>Filtra u ordena a los diputados, para facilitar tu búsqueda.</div>
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
                        placeholder="Busca por nombre, apellido, partido o distrito"
                        type="search"
                        id="search-2"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <input type="submit" className="search-button-2 w-button" value="Buscar" />
                </form>
            </div>
            <div>
                <div className="div-block-26">
                    <div data-hover="false" data-delay="0" className="dropdown-grupo-parlamentario w-dropdown">
                        <div className="filtro-grupoparlamentario w-dropdown-toggle">
                            <div className="w-icon-dropdown-toggle"></div>
                            <div>
                                {partidoFiltro ? partidoFiltro.toUpperCase() : 'Grupo parlamentario'}
                                {partidoFiltro && (
                                    <button
                                        onClick={() => setPartidoFiltro('')}
                                        style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                        title="Quitar filtro"
                                    >×</button>
                                )}
                            </div>
                        </div>
                        <nav className="dropdown-list-2 w-dropdown-list">
                            {PARTIDOS.map((p) => (
                                <a
                                    key={p}
                                    href="#"
                                    className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link"
                                    onClick={(e) => { e.preventDefault(); setPartidoFiltro(p === partidoFiltro ? '' : p); }}
                                    style={{ fontWeight: p.toLowerCase() === partidoFiltro.toLowerCase() ? 'bold' : undefined }}
                                >
                                    {p}
                                </a>
                            ))}
                        </nav>
                    </div>


                    <div data-hover="false" data-delay="0" className="dropdown-grupo-parlamentario w-dropdown">
                        <div className="filtro-grupoparlamentario w-dropdown-toggle">
                            <div className="w-icon-dropdown-toggle"></div>
                            <div>{orden ? `Orden: ${orden}` : 'Orden'}</div>
                        </div>
                        <nav className="dropdown-list-2 w-dropdown-list">
                            {(['nombre', 'apellido', 'genero', 'distrito'] as SortKey[]).map((op) => (
                                <a
                                    key={op}
                                    href="#"
                                    className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link"
                                    onClick={(e) => { e.preventDefault(); setOrden(op === orden ? '' : op); }}
                                    style={{ fontWeight: op === orden ? 'bold' : undefined, textTransform: 'capitalize' }}
                                >
                                    {op.charAt(0).toUpperCase() + op.slice(1)}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {(busqueda || partidoFiltro) && (
                <div style={{ margin: '8px 0', fontSize: '0.9rem', opacity: 0.75 }}>
                    {resultado.length} resultado{resultado.length !== 1 ? 's' : ''}
                    {busqueda && ` para "${busqueda}"`}
                    {partidoFiltro && ` · partido: ${partidoFiltro.toUpperCase()}`}
                </div>
            )}


            <div className="grupo-de-filtro">
                <div>
                    <div className="w-layout-grid grid-3">
                        {resultado.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
                                No se encontraron diputados con ese criterio.
                            </div>
                        ) : resultado.map((diputado) => {
                            const integrante = diputado.integrantes?.[0];
                            const partido = integrante?.partido;
                            const distrito = integrante?.distrito;
                            const foto = diputado.fotos?.[0];
                            const fotoUrl = foto?.path ? `${BASE_URL}${foto.path}` : 'images/placeholder-diputado.png';
                            const nombreCompleto = `${diputado.apaterno ?? ''} ${diputado.nombres ?? ''}`.trim();
                            const siglas = partido?.siglas ?? '';
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
                                        <div className="gp-diputado">{siglas}</div>
                                        <div>{tipoCargo}</div>
                                    </div>
                                    <a href={`/perfil-diputado/${diputado.id}`} className="btn-var-2 w-button">
                                        Saber más
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
