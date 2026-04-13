'use client';

import { useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  boletin: any;
  boletines: any;
};

export default function BoletinesSection({ boletin, boletines } : Props) {
    const [selected, setSelected] = useState<string | null>(null);
    const fotos = boletin?.fotos || [];
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
                 <img src="https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}" width="150" height = "150" /><br><br>
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
            <a href="#" className="lightbox-link w-inline-block w-lightbox">
                <img
                    src={`https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path}`}
                    loading="lazy"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    srcSet={`
                        https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 500w, 
                        https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 800w, 
                        https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1080w, 
                        https://sistema.congresoedomex.gob.mx/${boletin.fotos[0].path} 1280w`} alt="" className="image-25"  onClick={() => setSelected(boletin.fotos[0].path )}/>
            
                {boletin.fotos.length > 1 && (
                    <div className="div-block-40">
                        {boletin?.fotos?.slice(1).map((item:any, index: any) => (
                            <img key={index} src={`https://sistema.congresoedomex.gob.mx/${item.path}`} loading="lazy"  className="img-lightbox-under" onClick={() => setSelected(item.path)} />
                        ))}
                    </div>
                )}
            </a>
        </section>
        <div className="div-block-41">
            <div className="intro-boletin"
                dangerouslySetInnerHTML={{ __html: boletin.texto }}
            />
        </div><br/>
        <section className="boletines-relacionados">
            <h4 className="heading-37">Mantente informado</h4>
            <div className="w-layout-grid grid-boletin">
                <div>
                    <img src={`https://sistema.congresoedomex.gob.mx/${boletines[0].fotos[0].path}`} loading="lazy" sizes="(max-width: 1290px) 100vw, 1290px"
                    srcSet={`
                    https://sistema.congresoedomex.gob.mx/${boletines[0].fotos[0].path} 500w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[0].fotos[0].path} 800w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[0].fotos[0].path} 1080w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[0].fotos[0].path} 1200w`} alt="" className="img-boletin" />
                    <h5>{boletines[0].titulo}</h5>
                    <div className="fecha-boletin">
                        {new Date(boletines[0].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                    <a href={`/boletines/${boletines[0].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                </div>
                <div>
                    <img src={`https://sistema.congresoedomex.gob.mx/${boletines[1].fotos[0].path}`} loading="lazy" sizes="(max-width: 1280px) 100vw, 1280px"
                    srcSet={`
                    https://sistema.congresoedomex.gob.mx/${boletines[1].fotos[0].path} 500w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[1].fotos[0].path} 800w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[1].fotos[0].path} 1080w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[1].fotos[0].path} 1200w`} alt="" className="img-boletin" />
                    <h5>{boletines[1].titulo}</h5>
                    <div className="fecha-boletin">
                        {new Date(boletines[1].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                    <a href={`/boletines/${boletines[1].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                </div>
                <div>
                    <img src={`https://sistema.congresoedomex.gob.mx/${boletines[2].fotos[0].path}`} loading="lazy" sizes="(max-width: 4128px) 100vw, 4128px"
                    srcSet={`
                    https://sistema.congresoedomex.gob.mx/${boletines[2].fotos[0].path} 500w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[2].fotos[0].path} 800w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[2].fotos[0].path} 1080w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[2].fotos[0].path} 1200w`} alt="" className="img-boletin" />
                    <h5>{boletines[2].titulo}</h5>
                    <div className="fecha-boletin">
                        {new Date(boletines[2].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                    <a href={`/boletines/${boletines[2].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                </div>
                <div>
                    <img src={`https://sistema.congresoedomex.gob.mx/${boletines[3].fotos[0].path}`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px"
                    srcSet={`
                    https://sistema.congresoedomex.gob.mx/${boletines[3].fotos[0].path} 500w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[3].fotos[0].path} 800w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[3].fotos[0].path} 1080w, 
                    https://sistema.congresoedomex.gob.mx/${boletines[3].fotos[0].path} 1200w`} alt="" className="img-boletin" />
                    <h5>{boletines[3].titulo}</h5>
                    <div className="fecha-boletin">
                        {new Date(boletines[3].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                    <a href={`/boletines/${boletines[3].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                </div>
            </div>
        </section>
    </section>
    {selected !== null && (
        <div className="img-lightbox"  onClick={() => setSelected(null)}>
            <span className="close" onClick={() => setSelected(null)}>✕</span>
            <button className="nav left" onClick={(e) => e.stopPropagation()}>
                ◀
            </button>
            <img className="lightbox-main" src={`https://sistema.congresoedomex.gob.mx/${selected}`} />
            <button className="nav right" onClick={(e) => e.stopPropagation()}>
                ▶
            </button>
            <div className="lightbox-thumbs">
                {fotos.map((item:any, index: any) => (
                    <img key={index} className="thumb" src={`https://sistema.congresoedomex.gob.mx/${item.path}`} />
                ))}
            </div>
        </div>
    )}
    </>
  )
}