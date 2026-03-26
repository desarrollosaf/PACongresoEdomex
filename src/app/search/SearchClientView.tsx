'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/SearchForm';

const BASE_URL = 'https://www.congresoedomex.gob.mx/';

// Quita etiquetas HTML y limita a 150 caracteres para un resumen limpio
function truncateHtml(html: string): string {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 150) {
    return text.substring(0, 150) + '...';
  }
  return text;
}

export default function SearchClientView({ 
  initialQuery, 
  diputados, 
  comunicados 
}: { 
  initialQuery: string, 
  diputados: any[], 
  comunicados: any[] 
}) {
  const [query, setQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsSearching(false);
    setCurrentPage(1);
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(comunicados.length / ITEMS_PER_PAGE);
  const paginatedComunicados = comunicados.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getImageUrl = (b: any) => {
    const path = b?.fotos?.[0]?.path;
    return path ? `${BASE_URL}${path}`.replace(/([^:]\/)\/+/g, '$1') : '/images/placeholder.png';
  };

  const skeletonStyles = `
    .skeleton-box {
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      background-size: 200% 100%;
      animation: 1s shine linear infinite;
    }
    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }
  `;

  return (
    <>
      <style>{skeletonStyles}</style>
      <section className="section-3" style={{ padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
        <div className="max_width">
          <h1 className="heading" style={{ color: '#000', marginBottom: '20px' }}>Resultados de Búsqueda</h1>
          <div className="div-block-2">
            <form onSubmit={handleSearch} className="search w-form">
              <label htmlFor="search" className="field-label" style={{ color: '#333' }}>
                Realiza una nueva búsqueda
              </label>
              <div className="div-block-3" style={{ maxWidth: '600px', margin: '0 0 40px 0' }}>
                <input 
                  className="search-input w-input" 
                  style={{ border: '1px solid #ccc', color: '#000' }}
                  maxLength={256} 
                  name="query" 
                  placeholder="Buscar" 
                  type="search" 
                  id="search" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  className="search-button w-button"
                  disabled={isSearching}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: '#9b9b9b',
                    color: 'white',
                    justifyContent: 'center', 
                    gap: '8px', 
                    opacity: isSearching ? 0.7 : 1,
                    cursor: isSearching ? 'wait' : 'pointer'
                  }}
                >
                  {isSearching ? <LoadingSpinner /> : 'Buscar'}
                </button>
              </div>
            </form>
          </div>

          {!initialQuery && !isSearching && (
            <div style={{ opacity: 0.7, marginTop: '20px' }}>
              Por favor ingresa un término de búsqueda para comenzar.
            </div>
          )}
          
          {initialQuery && diputados.length === 0 && comunicados.length === 0 && !isSearching && (
            <div style={{ opacity: 0.7, marginTop: '20px', padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h3 className="heading-15">No se encontraron resultados</h3>
              <p>No pudimos encontrar diputados ni comunicados que coincidan con "{initialQuery}".</p>
            </div>
          )}
        </div>
      </section>

      {isSearching && (
        <section className="max_width" style={{ marginTop: '20px', padding: '20px 20px', marginBottom: '80px' }}>
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>
              <div className="skeleton-box" style={{ width: '250px', height: '30px', borderRadius: '4px' }}></div>
            </h2>
            <div className="w-layout-grid grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', marginBottom: '40px' }}>
               {Array.from({length: 4}).map((_, i) => (
                  <div key={`skd-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div className="skeleton-box" style={{ width: '120px', height: '120px', borderRadius: '20%' }}></div>
                    <div className="skeleton-box" style={{ width: '80%', height: '20px', marginTop: '15px', borderRadius: '4px' }}></div>
                    <div className="skeleton-box" style={{ width: '40%', height: '15px', marginTop: '8px', borderRadius: '4px' }}></div>
                    <div className="skeleton-box" style={{ width: '130px', height: '38px', marginTop: '15px', borderRadius: '4px' }}></div>
                  </div>
               ))}
            </div>

            <h2 style={{ marginBottom: '20px' }}>
              <div className="skeleton-box" style={{ width: '280px', height: '30px', borderRadius: '4px' }}></div>
            </h2>
            <div className="w-layout-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
               {Array.from({length: 4}).map((_, i) => (
                  <div key={`skc-${i}`} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                    <div className="skeleton-box" style={{ width: '100%', height: '200px' }}></div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div className="skeleton-box" style={{ width: '90%', height: '20px', borderRadius: '4px' }}></div>
                      <div className="skeleton-box" style={{ width: '100%', height: '15px', borderRadius: '4px' }}></div>
                      <div className="skeleton-box" style={{ width: '85%', height: '15px', borderRadius: '4px' }}></div>
                      <div className="skeleton-box" style={{ width: '130px', height: '38px', borderRadius: '4px', marginTop: '15px' }}></div>
                    </div>
                  </div>
               ))}
            </div>
          </div>
        </section>
      )}

      {!isSearching && diputados.length > 0 && (
        <section className="numeralia max_width" style={{ marginTop: '40px', padding: '20px 20px' }}>
          <div className="div-block-4">
            <h2 className="heading-2 titulo-seccion">Diputados Encontrados ({diputados.length})</h2>
          </div>
          <div className="grupo-de-filtro" style={{ marginTop: '20px' }}>
            <div className="w-layout-grid grid-3">
                {diputados.map((diputado: any) => {
                    const integrante = diputado.integrantes?.[0];
                    const partido = integrante?.partido;
                    const distrito = integrante?.distrito;
                    const foto = diputado.fotos?.[0];
                    const fotoUrl = foto?.path ? `${BASE_URL}${foto.path}` : '/images/placeholder-diputado.png';
                    const nombreCompleto = `${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''} ${diputado.nombres ?? ''}`.trim();
                    const siglas = partido?.siglas ?? 'S/P';
                    const tipoCargo = distrito?.distrito ?? 'Plurinominal';

                    return (
                        <div key={diputado.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <img
                                src={fotoUrl}
                                loading="lazy"
                                alt={nombreCompleto}
                                className={`image-66 diputado-${siglas.toLowerCase()}`}
                                style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '20%' }}
                            />
                            <div className="info-diputado-basica" style={{ flex: 1, width: '100%', textAlign: 'center', marginTop: '15px' }}>
                                <h4 className="nombre-diputado" style={{ fontSize: '1.2rem' }}>{nombreCompleto}</h4>
                                <div className="gp-diputado" style={{ fontWeight: 'bold', color: '#666' }}>{siglas}</div>
                                <div style={{ fontSize: '0.9rem', color: '#888' }}>{tipoCargo}</div>
                            </div>
                            <Link href={`/perfil-diputado/${diputado.id}`} className="btn-var-2 w-button" style={{ marginTop: '15px' }}>
                                Ver a mi diputado
                            </Link>
                        </div>
                    );
                })}
            </div>
          </div>
        </section>
      )}

      {!isSearching && comunicados.length > 0 && (
        <section className="max_width" style={{ marginTop: '40px', marginBottom: '80px', padding: '20px 20px' }}>
          <div>
            <h2 className="titulo-seccion">Comunicados Encontrados ({comunicados.length})</h2>
          </div>
          <div style={{ marginTop: '20px' }}>
            <div className="w-layout-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {paginatedComunicados.map((b: any) => {
                const imgUrl = getImageUrl(b);
                const desc = truncateHtml(b.texto || b.descripcion?.[0]?.bullets || '');
                return (
                  <div key={b.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                    <img
                      src={imgUrl}
                      loading="lazy"
                      alt={b?.titulo || 'Boletín'}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h5 style={{ fontSize: '1.1rem', marginBottom: '10px', lineHeight: '1.4' }}>{b?.titulo || 'Sin título'}</h5>
                      <p style={{ fontSize: '0.9rem', color: '#555', flex: 1, marginBottom: '20px' }}>{desc}</p>
                      <Link href={`/boletines/${b?.id ?? ''}`} className="btn-var-2 w-button" style={{ alignSelf: 'flex-start' }}>
                        Abrir comunicado
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Client-side Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', gap: '15px' }}>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn-var-2 w-button"
                  style={{ opacity: currentPage === 1 ? 0.5 : 1, padding: '10px 20px', minWidth: '120px' }}
                >
                  Anterior
                </button>
                <div style={{ fontWeight: 'bold', color: '#555' }}>
                  Página {currentPage} de {totalPages}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-var-2 w-button"
                  style={{ opacity: currentPage === totalPages ? 0.5 : 1, padding: '10px 20px', minWidth: '120px' }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
