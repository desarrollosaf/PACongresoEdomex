'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getOrdeDiaSesion }  from '../../service/agenda.api';
import { useRouter } from 'next/navigation'

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
  .fila-punto:hover { background: #fdf0f5; }

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
    background: #94134A;
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
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [descargando, setDescargando] = useState<'pdf' | 'word' | 'txt' | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const json = await getOrdeDiaSesion(id as string)
      if (!json) setError('No se pudieron cargar los datos.')
      else setData(json)
      setLoading(false)
    }
    if (id) fetchData()
  }, [id])

  const descargarTXT = (evento: any, puntos: any[], total: number) => {
    const lineas = [
      `ORDEN DEL DÍA`,
      ``,
      `Tipo: ${evento?.tipoevento || ''}`,
      `Sesión: ${evento?.descripcion || ''}`,
      `Fecha: ${formatearFecha(evento?.fecha)}`,
      `Sede: ${evento?.sede || ''}`,
      `Total de puntos: ${total}`,
      ``,
      `PUNTOS DEL ORDEN DEL DÍA`,
      `${'─'.repeat(50)}`,
      ...puntos.map((p: any) => `${p.nopunto}. ${p.punto}`),
    ];
    const blob = new Blob([lineas.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orden_del_dia_${id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const descargarWord = (evento: any, puntos: any[], total: number) => {
    const rows = puntos.map((p: any) =>
      `<tr><td style="width:40px;font-weight:bold;color:#94134A;padding:6px 10px;border:1px solid #e2e8f0;">${p.nopunto}</td><td style="padding:6px 10px;border:1px solid #e2e8f0;">${p.punto}</td></tr>`
    ).join('');

    const contenido = `
      <html><head><meta charset="UTF-8"></head><body style="font-family:Arial,sans-serif;color:#1e293b;padding:20px;">
        <h1 style="font-size:22px;color:#1e293b;">Orden del Día</h1>
        <table style="border-collapse:collapse;border-top:3px solid #94134A;margin-bottom:16px;width:100%;">
          <tr><td style="padding:8px 0;font-size:12px;font-weight:bold;color:#94134A;">${evento?.tipoevento || ''}</td></tr>
        </table>
        <h2 style="font-size:16px;">${evento?.descripcion || ''}</h2>
        <p><strong>Fecha:</strong> ${formatearFecha(evento?.fecha)}</p>
        <p><strong>Sede:</strong> ${evento?.sede || ''}</p>
        <p><strong>Total de puntos:</strong> ${total}</p>
        <br/>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr>
            <th style="background:#94134A;color:#fff;padding:8px 10px;text-align:center;width:40px;border:1px solid #e2e8f0;">#</th>
            <th style="background:#94134A;color:#fff;padding:8px 10px;text-align:left;border:1px solid #e2e8f0;">Punto del Orden del Día</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body></html>`;

    const blob = new Blob([contenido], { type: 'application/msword;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orden_del_dia_${id}.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generarPDF = async (evento: any, puntos: any[], total: number) => {
    const rows = puntos.map((p: any) =>
      `<tr>
        <td style="width:40px;text-align:center;padding:8px;border-bottom:1px solid #f0f0f0;">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#94134A;color:#fff;font-size:12px;font-weight:bold;">${p.nopunto}</div>
        </td>
        <td style="padding:8px 10px;font-size:13px;line-height:1.6;border-bottom:1px solid #f0f0f0;">${p.punto}</td>
      </tr>`
    ).join('');

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;z-index:-1;background:white;';

    const el = document.createElement('div');
    el.style.cssText = 'width:718px;background:white;font-family:Arial,Helvetica,sans-serif;color:#1e293b;padding:24px;box-sizing:border-box;';
    el.innerHTML = `
      <h1 style="font-size:22px;font-weight:bold;margin:0 0 12px 0;color:#1e293b;">Orden del Día</h1>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-top:3px solid #94134A;border-bottom:1px solid #ddd;margin-bottom:16px;">
        <tr>
          <td style="padding:8px 0;font-size:12px;font-weight:bold;color:#94134A;">${evento?.tipoevento || ''}</td>
        </tr>
      </table>
      <h2 style="font-size:16px;font-weight:bold;margin:0 0 10px;">${evento?.descripcion || ''}</h2>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:16px;font-size:13px;">
        <tr><td style="padding:4px 0;color:#555;width:100px;">📅 Fecha:</td><td style="padding:4px 0;">${formatearFecha(evento?.fecha)}</td></tr>
        <tr><td style="padding:4px 0;color:#555;">📍 Sede:</td><td style="padding:4px 0;">${evento?.sede || ''}</td></tr>
        <tr><td style="padding:4px 0;color:#555;">📌 Puntos:</td><td style="padding:4px 0;">${total} puntos en agenda</td></tr>
      </table>
      <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:8px;text-align:center;font-size:11px;color:#94a3b8;width:48px;border-bottom:2px solid #e2e8f0;">#</th>
            <th style="padding:8px 10px;text-align:left;font-size:11px;color:#94a3b8;border-bottom:2px solid #e2e8f0;">PUNTO DEL ORDEN DEL DÍA</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    wrapper.appendChild(el);
    document.body.appendChild(wrapper);

    const opt = {
      margin:      [14, 10, 14, 10],
      filename:    `orden_del_dia_${id}.pdf`,
      image:       { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, logging: false, scrollY: 0 },
      jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:   { mode: ['avoid-all', 'css'] },
    };

    (window as any).html2pdf().set(opt).from(el).save().then(() => {
      document.body.removeChild(wrapper);
      setDescargando(null);
    });
  };



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

          {/* Regresar */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => router.back()}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                color: '#000', background: 'none', border: 'none',
                cursor: 'pointer', fontSize: '16px', fontWeight: '600', padding: '0',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Regresar
            </button>
          </div>

          {/* Header sesión */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="h4-centrado" style={{ marginBottom: '1.25rem' }}>Orden del Día</h1>

            <div style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #94134A',
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

            {/* Botones de descarga */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              {/* PDF */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (descargando) return;
                  setDescargando('pdf');
                  if (typeof window !== 'undefined' && !(window as any).html2pdf) {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                    script.onload = () => generarPDF(evento, puntos, total);
                    document.head.appendChild(script);
                  } else {
                    generarPDF(evento, puntos, total);
                  }
                }}
                title="Descargar PDF"
                className="btn-boletin w-button"
                style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: descargando && descargando !== 'pdf' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}
              >
                {descargando === 'pdf' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                PDF
              </a>

              {/* WORD */}
              <a
                onClick={() => {
                  if (descargando) return;
                  setDescargando('word');
                  setTimeout(() => { descargarWord(evento, puntos, total); setDescargando(null); }, 300);
                }}
                title="Descargar Word"
                className="btn-boletin w-button"
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', opacity: descargando && descargando !== 'word' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}
              >
                {descargando === 'word' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                WORD
              </a>

              {/* TXT */}
              <a
                onClick={() => {
                  if (descargando) return;
                  setDescargando('txt');
                  setTimeout(() => { descargarTXT(evento, puntos, total); setDescargando(null); }, 300);
                }}
                title="Descargar TXT"
                className="btn-boletin w-button"
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', opacity: descargando && descargando !== 'txt' ? 0.5 : 1, pointerEvents: descargando ? 'none' : 'auto' }}
              >
                {descargando === 'txt' ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : null}
                TXT
              </a>
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