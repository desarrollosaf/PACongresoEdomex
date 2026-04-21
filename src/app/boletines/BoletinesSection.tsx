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
                            <a  title="Descargar" className="btn-boletin w-button"> PDF</a>
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