'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getVotosPunto } from '../../service/diputados.api';

interface IntegrantePlano {
    id: string
    diputado: string
    partido: string
    sentido: number
    mensaje: string
}

interface IntegranteComision {
    id: string
    diputado: string
    partido: string
    sentido: number
    mensaje: string
    cargo: string
    nivel_cargo: number
}

interface GrupoComision {
    comision_id: string
    comision_nombre: string
    integrantes: IntegranteComision[]
}

interface VotacionData {
    punto: {
        id: number
        nopunto: number
        punto: string
    }
    evento: {
        descripcion: string
    }
    integrantes: IntegrantePlano[] | GrupoComision[]
    tipovento: number
}

const SENTIDO_MAP: Record<number, { label: string; className: string; icono: string; rowClass: string }> = {
    1: { label: 'A Favor',      className: 'sentido-favor',        icono: '✓', rowClass: 'fila-favor'        },
    2: { label: 'Abstención',   className: 'sentido-abstencion',   icono: '–', rowClass: 'fila-abstencion'   },
    3: { label: 'En Contra',    className: 'sentido-contra',       icono: '✕', rowClass: 'fila-contra'       },
    0: { label: 'Sin Registro', className: 'sentido-sin-registro', icono: '?', rowClass: 'fila-sin-registro' },
}

const PARTIDO_LOGOS: Record<string, string> = {
    morena: '/images/morena.png',
    pt:     '/images/PT.png',
    pvem:   '/images/PVEM.png',
    pri:    '/images/PRI.png',
    pan:    '/images/Pan.png',
    mc:     '/images/MC.png',
    prd:    '/images/PRD.png',
}

function getPartidoLogo(partido: string): string | null {
    return PARTIDO_LOGOS[partido.toLowerCase()] ?? null
}

function esTipo2(integrantes: any[]): integrantes is GrupoComision[] {
    return integrantes.length > 0 && 'integrantes' in integrantes[0]
}

const styles = `
  .skeleton-box {
    background: #eee;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
  @keyframes shine {
    to { background-position-x: -200%; }
  }

  .fila-voto {
    display: grid;
    grid-template-columns: 36px 1fr 72px 120px;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    transition: filter 0.15s;
  }
  .fila-voto:last-child { border-bottom: none; }
  .fila-voto:hover { filter: brightness(0.97); }

  .fila-favor        { background: #f0fdf4; }
  .fila-contra       { background: #fff5f5; }
  .fila-abstencion   { background: #fefce8; }
  .fila-sin-registro { background: #f8fafc; }

  .fila-header {
    display: grid;
    grid-template-columns: 36px 1fr 72px 120px;
    gap: 12px;
    padding: 10px 16px;
    background: #f8fafc;
    border-bottom: 2px solid #e2e8f0;
  }
  .header-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94a3b8;
  }

  .col-num    { text-align: center; font-size: 15px; color: #94a3b8; font-variant-numeric: tabular-nums; }
  .col-nombre { font-size: 15px; color: #1e293b; font-weight: 500; line-height: 1.3; }
  .col-cargo  { font-size: 12px; color: #94a3b8; font-weight: 400; margin-top: 3px; }

  .col-partido {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .col-partido img      { height: 24px; width: auto; object-fit: contain; }
  .col-partido-text     { font-size: 11px; font-weight: 700; color: #64748b; text-align: center; }

  .col-sentido { display: flex; align-items: center; }
  .sentido-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .sentido-icono        { font-size: 12px; font-weight: 800; line-height: 1; }
  .sentido-favor        { background: #bbf7d0; color: #14532d; }
  .sentido-contra       { background: #fecaca; color: #7f1d1d; }
  .sentido-abstencion   { background: #fef08a; color: #713f12; }
  .sentido-sin-registro { background: #e2e8f0; color: #475569; }

  .tabla-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  }

  /* partido inline — oculto por defecto, visible solo en móvil */
  .partido-inline { display: none; }

  @media (max-width: 640px) {

    /* Conteos 2x2 */
    .conteos-grid {
      grid-template-columns: 1fr 1fr !important;
    }

    /* Tabla sin columna partido */
    .fila-voto,
    .fila-header {
      grid-template-columns: 28px 1fr 100px;
    }
    .col-partido    { display: none; }
    .header-partido { display: none; }

    /* Logo partido aparece dentro del nombre */
    .partido-inline {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 4px;
    }

    .col-nombre { font-size: 13px; }
    .col-num    { font-size: 13px; }

    .sentido-badge {
      font-size: 11px;
      padding: 3px 7px;
    }

    .punto-card {
      padding: 16px !important;
    }
    .punto-card p {
      font-size: 14px !important;
    }
  }
`

function SkeletonFila() {
    return (
        <div className="fila-voto fila-sin-registro">
            <div className="skeleton-box" style={{ width: '24px', height: '14px', borderRadius: '4px' }} />
            <div className="skeleton-box" style={{ width: '70%', height: '14px', borderRadius: '4px' }} />
            <div className="skeleton-box" style={{ width: '40px', height: '24px', borderRadius: '4px', margin: '0 auto' }} />
            <div className="skeleton-box" style={{ width: '90px', height: '24px', borderRadius: '20px' }} />
        </div>
    )
}

function SkeletonPage() {
    return (
        <>
            <style>{styles}</style>
            <section className="section-10">
                <div className="max_width">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className="skeleton-box" style={{ width: '180px', height: '28px', borderRadius: '4px', margin: '0 auto 12px' }} />
                        <div className="skeleton-box" style={{ width: '100%', height: '80px', borderRadius: '8px' }} />
                    </div>
                    <div className="conteos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div className="skeleton-box" style={{ width: '60px', height: '40px', borderRadius: '4px' }} />
                                <div className="skeleton-box" style={{ width: '80px', height: '12px', borderRadius: '4px' }} />
                                <div className="skeleton-box" style={{ width: '100%', height: '6px', borderRadius: '99px' }} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max_width" style={{ marginTop: '2rem' }}>
                    <div className="tabla-card">
                        {[...Array(8)].map((_, i) => <SkeletonFila key={i} />)}
                    </div>
                </div>
            </section>
        </>
    )
}

function TablaHeader() {
    return (
        <div className="fila-header">
            <span className="header-label" style={{ textAlign: 'center' }}>#</span>
            <span className="header-label">Diputada/o</span>
            <span className="header-label header-partido" style={{ textAlign: 'center' }}>Partido</span>
            <span className="header-label">Sentido</span>
        </div>
    )
}

function FilaVoto({ integrante, index, cargo }: {
    integrante: IntegrantePlano | IntegranteComision
    index: number
    cargo?: string
}) {
    const sentido = SENTIDO_MAP[integrante.sentido] ?? SENTIDO_MAP[0]
    const logo    = getPartidoLogo(integrante.partido)

    return (
        <div className={`fila-voto ${sentido.rowClass}`}>
            <span className="col-num">{index}</span>
            <div className="col-nombre">
                <div>{integrante.diputado}</div>
                {cargo && <div className="col-cargo">{cargo}</div>}
                {/* Partido inline — solo visible en móvil */}
                <div className="partido-inline">
                    {logo
                        ? <img src={logo} alt={integrante.partido} style={{ height: '16px', width: 'auto' }} />
                        : <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748b' }}>{integrante.partido.toUpperCase()}</span>
                    }
                </div>
            </div>
            <div className="col-partido">
                {logo
                    ? <img src={logo} alt={integrante.partido} title={integrante.partido.toUpperCase()} />
                    : <span className="col-partido-text">{integrante.partido.toUpperCase()}</span>
                }
            </div>
            <div className="col-sentido">
                <span className={`sentido-badge ${sentido.className}`}>
                    <span className="sentido-icono">{sentido.icono}</span>
                    {sentido.label}
                </span>
            </div>
        </div>
    )
}

export default function VotacionesPage() {
    const { id } = useParams()
    const [data, setData]       = useState<VotacionData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const json = await getVotosPunto(id as string)
            if (!json) setError('No se pudieron cargar los datos de votación.')
            else setData(json)
            setLoading(false)
        }
        if (id) fetchData()
    }, [id])

    if (loading) return <SkeletonPage />
   if (error) return (
    <>
        <style>{styles}</style>
        <section className="section-10">
            <div className="max_width" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                gap: '16px',
            }}>
                <div style={{
                    background: '#fff5f5',
                    border: '1px solid #fca5a5',
                    borderRadius: '16px',
                    padding: '40px 48px',
                    maxWidth: '480px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗳️</div>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>
                        Votación no disponible
                    </h2>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6' }}>
                        No se encontraron datos para esta votación. Es posible que aún no haya sido registrada o que el enlace sea incorrecto.
                    </p>
                    <button
                        onClick={() => window.close()}
                        style={{
                            background: '#1e3a5f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 28px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }}
                    >
                        Cerrar ventana
                    </button>
                </div>
            </div>
        </section>
    </>
)
    if (!data)   return null

    const tipo2 = esTipo2(data.integrantes)
    const todosIntegrantes: (IntegrantePlano | IntegranteComision)[] = tipo2
        ? (data.integrantes as GrupoComision[]).flatMap(g => g.integrantes)
        : data.integrantes as IntegrantePlano[]

    const conteo = { favor: 0, contra: 0, abstencion: 0, sinRegistro: 0 }
    todosIntegrantes.forEach(({ sentido }) => {
        if      (sentido === 1) conteo.favor++
        else if (sentido === 3) conteo.contra++
        else if (sentido === 2) conteo.abstencion++
        else                    conteo.sinRegistro++
    })

    const total = todosIntegrantes.length

    return (
        <>
            <style>{styles}</style>
            <section className="section-10">

                <div className="max_width">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 className="h4-centrado">Votaciones</h1>

                        <div className="punto-card" style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                            border: '1px solid #e2e8f0',
                            borderLeft: '4px solid #1e3a5f',
                            borderRadius: '8px',
                            padding: '20px 28px',
                            width: '100%',
                            textAlign: 'left',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        }}>
                            {tipo2 && (data.integrantes as GrupoComision[])[0]?.comision_nombre && (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: '#1e3a5f',
                                    borderRadius: '6px',
                                    padding: '4px 10px',
                                    marginBottom: '12px',
                                }}>
                                    <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff' }}>
                                        {(data.integrantes as GrupoComision[])[0].comision_nombre}
                                    </span>
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1e3a5f', flexShrink: 0 }} />
                                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b' }}>
                                    Punto {data.punto.nopunto}
                                </span>
                            </div>
                            <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>
                                {data.punto.punto}
                            </p>
                        </div>
                    </div>

                    {/* Conteos */}
                    <div className="conteos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                        {[
                            { label: 'A Favor',      count: conteo.favor,       icono: '✓', bg: '#f0fdf4', border: '#86efac', color: '#15803d', bar: '#22c55e' },
                            { label: 'En Contra',    count: conteo.contra,      icono: '✕', bg: '#fff5f5', border: '#fca5a5', color: '#b91c1c', bar: '#ef4444' },
                            { label: 'Abstención',   count: conteo.abstencion,  icono: '–', bg: '#fefce8', border: '#fde047', color: '#854d0e', bar: '#eab308' },
                            { label: 'Sin Registro', count: conteo.sinRegistro, icono: '?', bg: '#f8fafc', border: '#cbd5e1', color: '#475569', bar: '#94a3b8' },
                        ].map(({ label, count, bg, border, color, bar }) => {
                            const pct = total > 0 ? Math.round((count / total) * 100) : 0
                            return (
                                <div key={label} style={{
                                    background: bg, border: `1px solid ${border}`,
                                    borderRadius: '12px', padding: '16px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                }}>
                                    <span style={{ fontSize: '36px', fontWeight: '800', color, lineHeight: 1.1 }}>{count}</span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color, opacity: 0.8 }}>{label}</span>
                                    <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '99px', marginTop: '8px', overflow: 'hidden' }}>
                                        <div style={{ width: `${pct}%`, height: '100%', background: bar, borderRadius: '99px', transition: 'width 0.6s ease' }} />
                                    </div>
                                    <span style={{ fontSize: '11px', color, opacity: 0.6, marginTop: '2px' }}>{pct}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Tabla */}
                <div className="max_width" style={{ marginTop: '2rem' }}>

                    {!tipo2 && (
                        <div className="tabla-card">
                            <TablaHeader />
                            {(data.integrantes as IntegrantePlano[]).map((integrante, index) => (
                                <FilaVoto key={integrante.id} integrante={integrante} index={index + 1} />
                            ))}
                        </div>
                    )}

                    {tipo2 && (data.integrantes as GrupoComision[]).map((grupo) => (
                        <div key={grupo.comision_id} className="tabla-card" style={{ marginBottom: '1.5rem' }}>
                            <TablaHeader />
                            {grupo.integrantes.map((integrante, index) => (
                                <FilaVoto
                                    key={integrante.id}
                                    integrante={integrante}
                                    index={index + 1}
                                    cargo={integrante.cargo}
                                />
                            ))}
                        </div>
                    ))}

                </div>
            </section>
        </>
    )
}