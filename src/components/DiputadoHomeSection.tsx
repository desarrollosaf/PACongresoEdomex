'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { getDiputadoPerfil2 } from '@/app/service/diputados.api';

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

const BASE_IMG = 'https://sistema.congresoedomex.gob.mx/';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// ── Subcomponente: tarjeta de un diputado ──────────────────────────────────
function DiputadoCard({
  diputado,
  comunicados,
}: {
  diputado: Diputado;
  comunicados: any[];
}) {
  const integrante = diputado.integrantes?.[0];
  const partido = integrante?.partido;
  const distrito = integrante?.distrito;
  const fotoPath = diputado.fotos?.[0]?.path;
  const fotoUrl = fotoPath ? `${BASE_IMG}${fotoPath}` : '/images/placeholder-diputado.png';
  const nombreCompleto = `${diputado.nombres ?? ''} ${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''}`.trim();
  const cargo = distrito?.distrito ? `Diputado | ${distrito.distrito}` : 'Diputado | Plurinominal';

  const facebook = diputado.facebook?.trim() || '';
  const twitter = diputado.twitter?.trim() || '';
  const instagram = diputado.instagram?.trim() || '';
  const email = diputado.email?.trim() || '';

  const com1 = comunicados[0];
  const com2 = comunicados[1];
  const com1Img = com1?.fotos?.[0]?.path ? `${BASE_IMG}${com1.fotos[0].path}` : null;
  const com2Img = com2?.fotos?.[0]?.path ? `${BASE_IMG}${com2.fotos[0].path}` : null;

  return (
    <div className="columns-2 w-row" style={{ alignItems: 'stretch', margin: 0 }}>

      {/* ── Columna izquierda ── */}
      <div className="column-3 w-col w-col-6" style={{ minHeight: 400, padding: '0 10px' }}>
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
      </div>

      {/* ── Columna derecha: comunicados ── */}
      <div className="w-col w-col-6" style={{ minHeight: 400 }}>
        <div className="div-block-12">
          <Link href={`/perfil-diputado/${diputado.id}#iniciativas`} className="button grupo_parlamentario btn-var-1 w-button">Iniciativa</Link>
          <Link href={`/perfil-diputado/${diputado.id}#comunicados`} className="button grupo_parlamentario btn-var-1 w-button">Comunicados</Link>
          <Link href={`/perfil-diputado/${diputado.id}#comisiones`} className="button grupo_parlamentario btn-var-1 w-button">Comisiones y Comites</Link>
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
                <h4 style={{ margin: 0 }}>{com1?.titulo ?? (comunicados.length === 0 ? 'Sin comunicados' : '...')}</h4>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 4 }}>
                {com1 && <a href={`/boletines/${com1.id}`} className="button-2 btn-var2 w-button">Leer comunicado</a>}
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
                {com2 && <a href={`/boletines/${com2.id}`} className="button-2 btn-var2 w-button">Leer comunicado</a>}
              </div>
            </div>
          </div>
        </div>

        <Link href={`/perfil-diputado/${diputado.id}#comunicados`} className="button-2 btn-var2 w-button">Leer todos los comunicados</Link>
      </div>

    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function DiputadoHomeSection({ diputados }: Props) {
  const [query, setQuery] = useState('');

  // Dos "slots": current (visible) y next (preparándose debajo)
  const [current, setCurrent] = useState<Diputado | null>(null);
  const [next, setNext]       = useState<Diputado | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Comunicados para cada slot
  const [currentComunicados, setCurrentComunicados] = useState<any[]>([]);
  const [nextComunicados,    setNextComunicados]    = useState<any[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Obtener comunicados de un diputado a través del API centralizado
  const fetchComunicados = async (id: string): Promise<any[]> => {
    try {
      const data = await getDiputadoPerfil2(id);
      const integrante = data?.integrantes?.[0];
      return (integrante?.autores_comunicados?.map((ac: any) => ac.comunicado).filter(Boolean) || [])
        .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 2);
    } catch (err) {
      console.error('Error fetching comunicados in Home:', err);
      return [];
    }
  };

  const pickNextDiputado = (excludeId?: string): Diputado | null => {
    if (diputados.length === 0) return null;
    const pool = diputados.filter(d => d.id !== excludeId);
    const list = pool.length > 0 ? pool : diputados;
    return list[Math.floor(Math.random() * list.length)];
  };

  // Montar: cargar el primero
  useEffect(() => {
    if (diputados.length === 0) return;
    const first = pickNextDiputado();
    if (!first) return;
    setCurrent(first);
    fetchComunicados(first.id).then(setCurrentComunicados);
  }, [diputados]);

  // Auto-rotar
  useEffect(() => {
    if (query.trim()) return;

    intervalRef.current = setInterval(async () => {
      const nextDip = pickNextDiputado(current?.id);
      if (!nextDip) return;

      // 1. Precargar el siguiente (invisible) antes de animar
      const coms = await fetchComunicados(nextDip.id);
      setNext(nextDip);
      setNextComunicados(coms);

      // 2. Pequeño tick para que React pinte el slot "next" antes de animar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitioning(true); // dispara la animación CSS

          // 3. Al terminar la transición, promover next → current
          setTimeout(() => {
            setCurrent(nextDip);
            setCurrentComunicados(coms);
            setNext(null);
            setNextComunicados([]);
            setTransitioning(false);
          }, 700); // debe coincidir con la duración del CSS
        });
      });
    }, 7000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [query, diputados, current]);

  // Búsqueda manual
  const found = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return diputados.find(d =>
      `${d.nombres} ${d.apaterno} ${d.amaterno}`.toLowerCase().includes(q)
    ) ?? null;
  }, [query, diputados]);

  // Si hay búsqueda activa, mostrar ese diputado directamente
  const [searchComunicados, setSearchComunicados] = useState<any[]>([]);
  useEffect(() => {
    if (!found) { setSearchComunicados([]); return; }
    fetchComunicados(found.id).then(setSearchComunicados);
  }, [found?.id]);

  const displayDiputado   = found ?? current;
  const displayComunicados = found ? searchComunicados : currentComunicados;

  return (
    <section className="diputados max_width">
      <div>
        {/* <div className="div-block-6">
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
            />
            <input type="button" className="search-button-2 w-button" value="Buscar" />
          </div>
        </div> */}

        {/* Filtros partido */}
        <div className="filtros-diputados grupos-parlamentarios-selector">
          <a href="#" className="button grupo_parlamentario btn-grupo-parlamentario w-button">morena</a>
          <a href="#" className="button grupo_parlamentario btn-pan btn-grupo-parlamentario w-button">PAN</a>
          <a href="#" className="button grupo_parlamentario btn-pt btn-grupo-parlamentario w-button">PT</a>
          <a href="#" className="button grupo_parlamentario btn-pri btn-grupo-parlamentario w-button">PRI</a>
          <a href="#" className="button grupo_parlamentario btn-pvem btn-grupo-parlamentario w-button">PVEM</a>
          <a href="#" className="button grupo_parlamentario btn-mc btn-grupo-parlamentario w-button">MC</a>
          <a href="#" className="button grupo_parlamentario btn-prd btn-grupo-parlamentario w-button">PRD</a>
        </div>

        {/*
          ── Contenedor con dos capas superpuestas ──
          "current" siempre visible arriba.
          "next" montado debajo, invisible al inicio.
          Al transicionar: current baja su opacidad, next sube la suya.
          Ambas comparten position:absolute dentro de un relative con altura fija.
        */}
        <div className="div-block-13-wrapper" style={{ overflow: 'hidden', padding: '1px' }}>
          <div className="div-block-13" style={{ position: 'relative', minHeight: 420 }}>
            {/* Capa NEXT — se monta debajo, empieza invisible */}
            {next && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: transitioning ? 1 : 0,
                  transform: transitioning ? 'translateY(0)' : 'translateY(12px)',
                  transition: transitioning
                    ? 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
                    : 'none',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                <DiputadoCard diputado={next} comunicados={nextComunicados} />
              </div>
            )}

            {/* Capa CURRENT — siempre encima, sale cuando transiciona */}
            {displayDiputado && (
              <div
                style={{
                  position: 'relative',
                  opacity: transitioning ? 0 : 1,
                  transform: transitioning ? 'translateY(-12px)' : 'translateY(0)',
                  transition: transitioning
                    ? 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)'
                    : 'none',
                  zIndex: 2,
                }}
              >
                <DiputadoCard diputado={displayDiputado} comunicados={displayComunicados} />
              </div>
            )}

            {!displayDiputado && (
              <div style={{ padding: '2rem 0', opacity: 0.6 }}>
                {diputados.length === 0 ? 'No se encontraron diputados activos.' : 'Cargando diputado...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}