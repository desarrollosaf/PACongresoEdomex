'use client';

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  boletin: any;
  boletines: any;
};

export default function BoletinesSection({ boletin, boletines } : Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const fotos = boletin?.fotos || [];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') setSelectedIndex(null);
            if (e.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + fotos.length) % fotos.length);
            if (e.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % fotos.length);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, fotos.length]);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + fotos.length) % fotos.length);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % fotos.length);
    };
    const descargarTXT = () => {
        const contenido = `
        Título: ${boletin?.titulo}
        Comunicado: ${boletin?.comunicado}
        Fecha: ${boletin?.fecha}
        Contenido:
        ${boletin?.descripcion?.map((item: any) => item.bullets).join('\n')}
        ${boletin.texto}
        `;

        const blob = new Blob([contenido], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `boletin_${boletin?.titulo}.txt`;
        link.click();

        URL.revokeObjectURL(url);
        };

        const descargarWord = () => {
        const imagenes = boletin?.fotos?.length > 1
            ? boletin.fotos
                .slice(1)
                .map(
                    (item: any) => `
                    <img 
                    src="https://sistema.congresoedomex.gob.mx/${item.path}" 
                    width="100" height = "100"
                    style="margin-bottom:10px;"
                    />
                `
                )
                .join('')
        : '';
        const contenido = `
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>${boletin?.titulo}</h1>
                <strong>Comunicado: </strong> ${boletin?.comunicado} <br>
                <strong>Fecha: </strong>${boletin?.fecha}<br><br>
                ${boletin?.descripcion?.map((item: any) => `${item.bullets}`)}<br><br>
                ${boletin?.fotos?.length > 0 ? `<img src="https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}" width="150" height="150" /><br><br>` : ''}
                ${imagenes}
                ${boletin.texto}
            </body>
        </html>`;
            

        const blob = new Blob([contenido], {
            type: "application/msword;charset=utf-8;",
        });

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `boletin_${boletin?.titulo}.doc`;
            link.click();

            URL.revokeObjectURL(url);
        };

    const generarPDF = async () => {
        const imagenesHTML = boletin?.fotos?.map((item: any, index: number) => {
            return `
            <div style="flex: 1 1 30%; margin: 8px; text-align: center; page-break-inside: avoid; break-inside: avoid;">
                <img src="/api/proxy-image?url=https://sistema.congresoedomex.gob.mx/${item.path}" style="width: 100%; max-width: 250px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
            </div>
            `;
        }).join('') || '';

        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.left = '-9999px';
        wrapper.style.top = '0';
        wrapper.style.width = '800px'; 
        wrapper.style.background = 'white';

        wrapper.innerHTML = `
            <div id="pdf-content-boletin" style="padding: 40px; font-family: Arial, Helvetica, sans-serif; color: #333;">
                <style>
                    .pdf-text-content p, .pdf-text-content div {
                        page-break-inside: avoid;
                        break-inside: avoid;
                        margin-bottom: 12px;
                    }
                </style>
                <!-- Encabezado -->
                <div style="page-break-inside: avoid; break-inside: avoid;">
                    <h1 style="font-size: 26px; color: #222; text-align: left; margin-bottom: 20px; font-weight: bold; line-height: 1.3;">
                        ${boletin?.titulo || ''}
                    </h1>
                    
                    <div style="display: flex; justify-content: space-between; border-top: 2px solid #a32a32; border-bottom: 1px solid #eee; padding: 15px 0; margin-bottom: 30px; font-size: 13px; color: #666; font-weight: bold;">
                        <div style="color: #a32a32;">COMUNICADO ${boletin?.comunicado || ''}</div>
                        <div>${new Date((boletin?.fecha || '') + "T00:00:00").toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                    </div>
                </div>

                <!-- Bullets si existen -->
                <div style="font-size: 16px; line-height: 1.6; color: #444; font-weight: 500; font-style: italic; margin-bottom: 25px;">
                    ${boletin?.descripcion?.map((item: any) => `<p style="margin: 0 0 10px 0; page-break-inside: avoid; break-inside: avoid;">• ${item.bullets}</p>`).join('') || ''}
                </div>

                <!-- Bloque único de imágenes -->
                <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-bottom: 30px; page-break-inside: avoid; break-inside: avoid;">
                    ${imagenesHTML}
                </div>

                <!-- Contenedor del texto -->
                <div style="font-size: 15px; line-height: 1.8; text-align: justify; color: #333; margin-bottom: 40px;" class="pdf-text-content">
                    ${boletin?.texto || ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(wrapper);

        const images = wrapper.querySelectorAll('img');
        const loadPromises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve(true);
                } else {
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(true); // Evita quedarse colgado si falla una imagen
                }
            });
        });

        await Promise.all(loadPromises);

        const opt = {
            margin:       [15, 10, 15, 10], // superior, izquierda, inferior, derecha (mm)
            filename:     `boletin_${boletin?.titulo?.substring(0, 30) || 'congreso'}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Generar y descargar, después limpiar DOM
        (window as any).html2pdf().set(opt).from(wrapper.firstElementChild).save().then(() => {
            document.body.removeChild(wrapper);
        });
    };

    const descargarPDF = (e: React.MouseEvent) => {
        e.preventDefault();
        
        // Si el estado de carga o la libreria se ocupan, lo manejamos rápido aquí:
        if (typeof window !== 'undefined' && !(window as any).html2pdf) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.onload = generarPDF;
            document.head.appendChild(script);
        } else {
            generarPDF();
        }
    };
    
    return (
    <>
    <section className="section-8">
        <section className="encabezado-bole-n">
            <h1 className="heading-36"> {boletin.titulo} </h1>
            <div>
                <div className="columna-informativa-blog w-row">
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada">Comunicado {boletin.comunicado} </div>
                    </div>
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada">  
                            {new Date(boletin.fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="columna-informativa-blog w-row">
                    <div className="w-col w-col-6">
                    </div>
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin-centrada">  
                            <a href="#" onClick={descargarPDF} title="Descargar PDF" className="btn-boletin w-button"> PDF</a>
                            <a onClick={descargarWord} title="Descargar" className="btn-boletin w-button"> WORD</a>
                            <a onClick={descargarTXT} title="Descargar" className="btn-boletin w-button"> TXT</a>
                        </div>
                    </div>
                </div>
            </div>
            {boletin?.descripcion?.map((item:any, index: any) => (
            <p key={index} className="intro-boletin">
                {item.bullets}
            </p>
            ))}
            {boletin?.fotos?.length > 0 && (
                <a href="#" className="lightbox-link w-inline-block w-lightbox" onClick={(e) => e.preventDefault()}>
                    <img
                        src={`https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}`}
                        loading="lazy"
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        srcSet={`
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 500w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 800w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1080w, 
                            https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1280w`} alt="" className="image-25"  onClick={() => setSelectedIndex(0)}/>
                
                    {boletin.fotos.length > 1 && (
                        <div className="div-block-40">
                            {boletin?.fotos?.slice(1).map((item:any, index: any) => (
                                <div key={index} style={{cursor: 'pointer'}} onClick={(e) => { e.preventDefault(); setSelectedIndex(index + 1); }}>
                                    <img src={`https://sistema.congresoedomex.gob.mx/${item.path}`} loading="lazy" className="img-lightbox-under" />
                                </div>
                            ))}
                        </div>
                    )}
                </a>
            )}
        </section>
        <div className="div-block-41">
            <div className="intro-boletin"
                dangerouslySetInnerHTML={{ __html: boletin.texto }}
            />
        </div><br/>
        <section className="boletines-relacionados">
            <h4 className="heading-37">Mantente informado</h4>
            <div className="w-layout-grid grid-boletin">
                {boletines?.slice(0, 4).map((bol: any, idx: number) => bol ? (
                    <div key={idx}>
                        {bol?.fotos?.length > 0 ? (
                            <img src={`https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path}`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px"
                            srcSet={`
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 500w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 800w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 1080w, 
                            https://sistema.congresoedomex.gob.mx/${bol.fotos[0].path} 1200w`} alt="" className="img-boletin" />
                        ) : (
                            <div className="img-boletin" style={{ backgroundColor: '#eee', height: '200px' }} />
                        )}
                        <h5>{bol.titulo}</h5>
                        <div className="fecha-boletin">
                            {new Date(bol.fecha + "T00:00:00").toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </div>
                        <a href={`/boletines/${bol.id}`} className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                ) : null)}
            </div>
        </section>
    </section>
    {selectedIndex !== null && fotos.length > 0 && (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.92)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(5px)',
            animation: 'lbFadeIn 0.3s ease'
        }} onClick={() => setSelectedIndex(null)}>
            
            <style>{`
                @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes lbSlideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .lb-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border: none;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .lb-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-50%) scale(1.1); }
                .lb-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: transparent;
                    color: white;
                    border: none;
                    font-size: 36px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .lb-close:hover { transform: scale(1.2); }
                .lb-thumb {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: all 0.2s;
                    border: 2px solid transparent;
                }
                .lb-thumb:hover { opacity: 0.8; }
                .lb-thumb.active { opacity: 1; border-color: white; transform: scale(1.1); }
            `}</style>

            <button className="lb-close" onClick={() => setSelectedIndex(null)}>✕</button>

            {fotos.length > 1 && (
                <button className="lb-btn" style={{ left: '20px' }} onClick={handlePrev}>❮</button>
            )}

            <div style={{ maxWidth: '90%', maxHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
                <img 
                    src={`https://sistema.congresoedomex.gob.mx/${fotos[selectedIndex].path}`} 
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: '80vh', 
                        objectFit: 'contain', 
                        borderRadius: '8px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        animation: 'lbSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                />
            </div>

            {fotos.length > 1 && (
                <button className="lb-btn" style={{ right: '20px' }} onClick={handleNext}>❯</button>
            )}

            {fotos.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    display: 'flex',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '50px',
                    maxWidth: '90%',
                    overflowX: 'auto'
                }} onClick={(e) => e.stopPropagation()}>
                    {fotos.map((item:any, index: number) => (
                        <img 
                            key={index} 
                            className={`lb-thumb ${index === selectedIndex ? 'active' : ''}`}
                            src={`https://sistema.congresoedomex.gob.mx/${item.path}`} 
                            onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                        />
                    ))}
                </div>
            )}
        </div>
    )}
    </>
  )
}