'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getOrdeDiaSesion }  from '../../service/agenda.api';

const styles = `
  .skeleton-box {
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }
  @keyframes shine { to { background-position-x: -200%; } }

  .fila-punto {
    display: grid;
    grid-template-columns: 48px 1fr;
    align-items: start;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.15s;
  }
  .fila-punto:last-child { border-bottom: none; }
  .fila-punto:hover { background: #f8fafc; }

  .fila-header {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 16px;
    padding: 10px 20px;
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

  .num-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #1e3a5f;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .tabla-card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  }

  .punto-text {
    font-size: 14px;
    line-height: 1.7;
    color: #1e293b;
    margin: 0;
    white-space: pre-line;
  }

  @media (max-width: 640px) {
    .fila-punto, .fila-header {
      grid-template-columns: 36px 1fr;
      padding: 14px 14px;
      gap: 12px;
    }
    .num-badge { width: 28px; height: 28px; font-size: 11px; }
    .punto-text { font-size: 13px; }
    .info-grid { grid-template-columns: 1fr 1fr !important; }
  }
`

const formatearFecha = (fecha?: string) => {
  if (!fecha) return ''
  const date = new Date(fecha)
  if (Number.isNaN(date.getTime())) return fecha
  return date.toLocaleDateString('es-MX', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
  })
}

function SkeletonFila() {
  return (
    <div className="fila-punto">
      <div className="skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
        <div className="skeleton-box" style={{ width: '100%', height: '14px', borderRadius: '4px' }} />
        <div className="skeleton-box" style={{ width: '80%', height: '14px', borderRadius: '4px' }} />
        <div className="skeleton-box" style={{ width: '60%', height: '14px', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

function SkeletonPage() {
  return (
    <>
      <style>{styles}</style>
      <section className="section-10">
        <div className="max_width">
          <div style={{ marginBottom: '2rem' }}>
            <div className="skeleton-box" style={{ width: '200px', height: '28px', borderRadius: '4px', marginBottom: '16px' }} />
            <div className="skeleton-box" style={{ width: '100%', height: '100px', borderRadius: '12px' }} />
          </div>
          <div className="tabla-card">
            {[...Array(6)].map((_, i) => <SkeletonFila key={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export default function OrdenDiaPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const json = await getOrdeDiaSesion(id as string)
      if (!json) setError('No se pudieron cargar los datos.')
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
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', textAlign: 'center',
        }}>
          <div style={{
            background: '#fff5f5', border: '1px solid #fca5a5',
            borderRadius: '16px', padding: '40px 48px', maxWidth: '480px',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>
              Orden del día no disponible
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6' }}>
              No se encontraron datos para esta sesión.
            </p>
            <button
              onClick={() => window.history.back()}
              style={{
                background: '#1e3a5f', color: '#fff', border: 'none',
                borderRadius: '8px', padding: '10px 28px',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Regresar
            </button>
          </div>
        </div>
      </section>
    </>
  )

  if (!data) return null

  const { evento, puntos, total } = data

  return (
    <>
      <style>{styles}</style>
      <section className="section-10">
        <div className="max_width">

          {/* Header sesión */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="h4-centrado" style={{ marginBottom: '1.25rem' }}>Orden del Día</h1>

            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #1e3a5f',
              borderRadius: '8px',
              padding: '20px 28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  background: '#1e3a5f', color: '#fff',
                  fontSize: '11px', fontWeight: '700',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '4px 10px', borderRadius: '6px',
                }}>
                  {evento?.tipoevento}
                </span>
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 12px' }}>
                {evento?.descripcion}
              </h2>

              <div className="info-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px', marginTop: '12px',
              }}>
                {[
                  { icono: '📅', label: 'Fecha', valor: formatearFecha(evento?.fecha) },
                  { icono: '📍', label: 'Sede',  valor: evento?.sede },
                  { icono: '📌', label: 'Puntos', valor: `${total} puntos en agenda` },
                ].map(({ icono, label, valor }) => (
                  <div key={label} style={{
                    background: '#fff', borderRadius: '8px',
                    padding: '10px 14px', border: '1px solid #e2e8f0',
                  }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600',
                      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                      {icono} {label}
                    </div>
                    <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600' }}>
                      {valor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabla puntos */}
          <div className="tabla-card">
            <div className="fila-header">
              <span className="header-label" style={{ textAlign: 'center' }}>#</span>
              <span className="header-label">Punto del Orden del Día</span>
            </div>

            {puntos?.map((punto: any) => (
              <div key={punto.id} className="fila-punto">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="num-badge">{punto.nopunto}</div>
                </div>
                <p className="punto-text">{punto.punto}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}