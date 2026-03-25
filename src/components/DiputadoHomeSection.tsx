'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

type Diputado = {
  id: string;
  nombres: string;
  apaterno: string;
  amaterno: string;
  email?: string;
  descripcion?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  integrantes?: Array<{
    partido?: { siglas?: string; nombre?: string };
    distrito?: { distrito?: string };
  }>;
  fotos?: Array<{ path: string }>;
};

type Props = {
  diputados: Diputado[];
};

const BASE_IMG = 'https://www.congresoedomex.gob.mx/';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DiputadoHomeSection({ diputados }: Props) {
  const [query, setQuery] = useState('');
  const [randomDiputado, setRandomDiputado] = useState<Diputado | null>(null);
  const [perfilComunicados, setPerfilComunicados] = useState<any[]>([]);

  // Elegir uno random
  const [visible, setVisible] = useState(true);

  const pickRandom = (excludeId?: string) => {
    if (diputados.length === 0) return;
    const pool = diputados.filter(d => d.id !== excludeId);
    const list = pool.length > 0 ? pool : diputados;
    setRandomDiputado(list[Math.floor(Math.random() * list.length)]);
  };

  // Elegir uno random al montar
  useEffect(() => { pickRandom(); }, [diputados]);

  // Auto-rotar cada 7 s cuando no hay búsqueda activa
  useEffect(() => {
    if (query.trim()) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRandomDiputado(prev => {
          const pool = diputados.filter(d => d.id !== prev?.id);
          const list = pool.length > 0 ? pool : diputados;
          return list[Math.floor(Math.random() * list.length)] ?? prev;
        });
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(interval);
  }, [query, diputados]);

  const found = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return diputados.find(d =>
      `${d.nombres} ${d.apaterno} ${d.amaterno}`.toLowerCase().includes(q)
    ) ?? null;
  }, [query, diputados]);

  const diputado = found ?? randomDiputado;

  // Cargar comunicados del diputado seleccionado
  useEffect(() => {
    if (!diputado?.id) return;
    setPerfilComunicados([]);
    fetch(`${API}/api/diputados/${diputado.id}/perfil`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        const integrante = data.integrantes?.[0];
        const comunicados = (integrante?.autores_comunicados?.map((ac: any) => ac.comunicado).filter(Boolean) || [])
          .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setPerfilComunicados(comunicados.slice(0, 2));
      })
      .catch(() => { });
  }, [diputado?.id]);

  const integrante = diputado?.integrantes?.[0];
  const partido = integrante?.partido;
  const distrito = integrante?.distrito;
  const fotoPath = diputado?.fotos?.[0]?.path;
  const fotoUrl = fotoPath ? `${BASE_IMG}${fotoPath}` : '/images/placeholder-diputado.png';
  const nombreCompleto = diputado ? `${diputado.nombres ?? ''} ${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''}`.trim() : '';
  const cargo = distrito?.distrito ? `Diputado | ${distrito.distrito}` : 'Diputado | Plurinominal';

  const facebook = diputado?.facebook?.trim() || '';
  const twitter = diputado?.twitter?.trim() || '';
  const instagram = diputado?.instagram?.trim() || '';
  const email = diputado?.email?.trim() || '';

  const com1 = perfilComunicados[0];
  const com2 = perfilComunicados[1];
  const com1Img = com1?.fotos?.[0]?.path ? `${BASE_IMG}${com1.fotos[0].path}` : null;
  const com2Img = com2?.fotos?.[0]?.path ? `${BASE_IMG}${com2.fotos[0].path}` : null;

  return (
    <section className="diputados max_width">
      <div>
        <div className="div-block-6">
          <img src="images/Diputad-1.gif" loading="lazy" alt="" className="image-31" />
          <div className="search-2 w-form">
            <input
              className="search-input-2 w-input"
              maxLength={256}
              name="query"
              placeholder="Busca a tu diputado"
              type="search"
              id="search-2"
              value={query}
              onChange={e => setQuery(e.target.value)}
            /><input type="button" className="search-button-2 w-button" value="Buscar" />
          </div>
        </div>

        {/* Filtros partido no haven nd */}
        <div className="filtros-diputados grupos-parlamentarios-selector">
          <a href="#" className="button grupo_parlamentario btn-grupo-parlamentario w-button">morena</a>
          <a href="#" className="button grupo_parlamentario btn-pan btn-grupo-parlamentario w-button">PAN</a>
          <a href="#" className="button grupo_parlamentario btn-pt btn-grupo-parlamentario w-button">PT</a>
          <a href="#" className="button grupo_parlamentario btn-pri btn-grupo-parlamentario w-button">PRI</a>
          <a href="#" className="button grupo_parlamentario btn-pvem btn-grupo-parlamentario w-button">PVEM</a>
          <a href="#" className="button grupo_parlamentario btn-mc btn-grupo-parlamentario w-button">MC</a>
          <a href="#" className="button grupo_parlamentario btn-prd btn-grupo-parlamentario w-button">PRD</a>
        </div>

        <div className="div-block-13" style={{ minHeight: 420 }}>
          <div className="columns-2 w-row" style={{ alignItems: 'stretch' }}>

            {/* ── Columna izquierda: diputado ── */}
            <div
              className="column-3 w-col w-col-6"
              style={{ minHeight: 400, opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
              {diputado ? (
                <>
                  <div className="columns-3 w-row">
                    <div className="column-2 w-col w-col-6">
                      <Link href={`/perfil-diputado/${diputado.id}`} className="w-inline-block">
                        <img
                          src={fotoUrl}
                          loading="lazy"
                          alt={nombreCompleto}
                          className="image-3"
                          style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
                        />
                      </Link>
                    </div>
                    <div className="column-4 w-col w-col-6">
                      <div className="div-block-24">
                        <div>
                          <h4 className="nombre-diputado-home">{nombreCompleto}<br /></h4>
                          <div>{cargo}</div>
                          {partido?.siglas && <div>{partido.siglas}</div>}
                        </div>
                        <div className="div-block-11">
                          {diputado.descripcion?.trim() && (
                            <p style={{ textAlign: 'justify' }}>{diputado.descripcion.trim()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="columns-4 w-row">
                    <div className="w-col w-col-6">
                      <div className="div-block-16">
                        <p className="paragraph-3">Contacto</p>
                        <img src="images/mail_icon.png" loading="lazy" alt="" className="image-4" />
                        {email && <div style={{ fontSize: 12, marginTop: 4 }}>{email}</div>}
                      </div>
                    </div>
                    <div className="column-5 w-col w-col-6">
                      <div><p className="paragraph-3">Redes Sociales</p></div>
                      <div className="social-media">
                        {facebook
                          ? <a href={facebook.startsWith('http') ? facebook : `https://www.facebook.com/${facebook}`} target="_blank" rel="noreferrer"><img src="images/facebook_icon.png" loading="lazy" alt="" className="image-5" /></a>
                          : <img src="images/facebook_icon.png" loading="lazy" alt="" className="image-5" />}
                        {twitter
                          ? <a href={twitter.startsWith('http') ? twitter : `https://x.com/${twitter}`} target="_blank" rel="noreferrer"><img src="images/x_icon.png" loading="lazy" alt="" className="image-6" /></a>
                          : <img src="images/x_icon.png" loading="lazy" alt="" className="image-6" />}
                        {instagram
                          ? <a href={instagram.startsWith('http') ? instagram : `https://www.instagram.com/${instagram}`} target="_blank" rel="noreferrer"><img src="images/instagram_icon.png" loading="lazy" alt="" className="image-7" /></a>
                          : <img src="images/instagram_icon.png" loading="lazy" alt="" className="image-7" />}
                        <img src="images/tiktok_icono.png" loading="lazy"
                          sizes="(max-width: 479px) 100vw, (max-width: 763px) 97vw, (max-width: 767px) 741px, 24vw"
                          srcSet="images/tiktok_icono-p-500.png 500w, images/tiktok_icono.png 741w"
                          alt="" className="image-8" />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <Link href={`/perfil-diputado/${diputado.id}`} className="btn-black-str w-button">Saber más</Link>
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem 0', opacity: 0.6 }}>Cargando diputado...</div>
              )}
            </div>

            {/* ── Columna derecha: comunicados del diputado ── */}
            <div
              className="w-col w-col-6"
              style={{ minHeight: 400, opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
            >
              <div className="div-block-12">
                <Link href={`/perfil-diputado/${diputado?.id}#iniciativas`} className="button grupo_parlamentario btn-var-1 w-button">Iniciativa</Link>
                <Link href={`/perfil-diputado/${diputado?.id}#comunicados`} className="button grupo_parlamentario btn-var-1 w-button">Comunicados</Link>
                <Link href={`/perfil-diputado/${diputado?.id}#comisiones`} className="button grupo_parlamentario btn-var-1 w-button">Comisiones y Comites</Link>
              </div>

              <div className="div-block-14" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* Comunicado 1 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', minHeight: 100 }}>
                  <div style={{ width: '35%', flexShrink: 0, minHeight: 90 }}>
                    {com1Img
                      ? <img src={com1Img} loading="lazy" alt={com1?.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div className="img-comunicado-home-1" style={{ width: '100%', height: '100%', minHeight: 90, background: '#eee' }}></div>
                    }
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 90 }}>
                    <div style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      <h4 style={{ margin: 0 }}>{com1?.titulo ?? (perfilComunicados.length === 0 && diputado ? 'Sin comunicados' : '...')}</h4>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: 4 }}>
                      {com1 && <a href={`/boletines/${com1?.id}`} className="button-2 btn-var2 w-button">Leer comunicado</a>}
                    </div>
                  </div>
                </div>

                {/* Comunicado 2 */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', minHeight: 100 }}>
                  <div style={{ width: '35%', flexShrink: 0, minHeight: 90 }}>
                    {com2Img
                      ? <img src={com2Img} loading="lazy" alt={com2?.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <div className="img-comunicado-home-2" style={{ width: '100%', height: '100%', minHeight: 90, background: '#eee' }}></div>
                    }
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 90 }}>
                    <div style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                      {com2 && <h4 style={{ margin: 0 }}><strong>{com2.titulo}</strong></h4>}
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: 4 }}>
                      {com2 && <a href={`/boletines/${com2?.id}`} className="button-2 btn-var2 w-button">Leer comunicado</a>}
                    </div>
                  </div>
                </div>
              </div>

              <Link href={`/perfil-diputado/${diputado?.id}#comunicados`} className="button-2 btn-var2 w-button">Leer todos los comunicado</Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
