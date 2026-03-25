'use client';
import Link from 'next/link';

type Props = {
    mainBoletines: any
}

export default function BoletinesHomeSection({ mainBoletines } : Props) {
    return (
        <section className="max_width">
            <div>
                <div>
                    <h4 className="titulo-seccion">Boletínes </h4>
                </div>
                <div>Mantente informado de todo lo que ocurre en el pleno</div>
                <div className="div-block-23">
                    {mainBoletines && (
                    <div className="columns-8 w-row">
                    {/* aqui va la posicion 0 de boletines */}
                    <div className="column-9 w-col w-col-6">
                        <div className="div-block-22">
                        <img src={`https://congresoedomex.gob.mx/${mainBoletines[0].fotos[0].path}`} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2666px) 48vw, 1280px" 
                        srcSet={`
                        https://congresoedomex.gob.mx/${mainBoletines[0].fotos[0].path} 500w, 
                        https://congresoedomex.gob.mx/${mainBoletines[0].fotos[0].path} 800w, 
                        https://congresoedomex.gob.mx/${mainBoletines[0].fotos[0].path} 1080w, 
                        https://congresoedomex.gob.mx/${mainBoletines[0].fotos[0].path} 1280w`} alt="" className="image-10" />
                        <div>
                            <h4 className="heading-10"> { mainBoletines[0].titulo}  <br /></h4>
                            <p className="paragraph-4">
                                {new Date(mainBoletines[0].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>
                            <p> {mainBoletines[0].descripcion[0].bullets} </p>
                        </div>
                        <Link href={`/boletines/${mainBoletines[0].id}`} className="btn-var-2 w-button">Leer el boletín</Link>
                        </div>
                    </div>
                    <div className="w-col w-col-6">
                        <div>
                        <div className="w-layout-grid">
                            <div>
                            <img src={`https://congresoedomex.gob.mx/${mainBoletines[1].fotos[0].path}`} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px" 
                                srcSet={`
                                https://congresoedomex.gob.mx/${mainBoletines[1].fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${mainBoletines[1].fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${mainBoletines[1].fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${mainBoletines[1].fotos[0].path} 1280w`} alt="" className="img-boletin" />
                            <h5>{ mainBoletines[1].titulo}</h5>
                            <div className="fecha-boletin">
                                {new Date(mainBoletines[1].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
                            <a href={`/boletines/${mainBoletines[1].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                            </div>
                            <div>
                                <img src={`https://congresoedomex.gob.mx/${mainBoletines[2].fotos[0].path}`} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px" 
                                srcSet={`
                                https://congresoedomex.gob.mx/${mainBoletines[2].fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${mainBoletines[2].fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${mainBoletines[2].fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${mainBoletines[2].fotos[0].path} 1280w`} alt="" className="img-boletin" />
                            <h5>{ mainBoletines[2].titulo}</h5>
                            <div className="fecha-boletin">
                                {new Date(mainBoletines[2].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
                            <a href={`/boletines/${mainBoletines[2].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                            </div>
                            <div>
                            <img src={`https://congresoedomex.gob.mx/${mainBoletines[3].fotos[0].path}`} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px" 
                                srcSet={`
                                https://congresoedomex.gob.mx/${mainBoletines[3].fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${mainBoletines[3].fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${mainBoletines[3].fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${mainBoletines[3].fotos[0].path} 1280w`} alt="" className="img-boletin" />
                            
                            <h5>{ mainBoletines[3].titulo}</h5>
                            <div className="fecha-boletin">
                                {new Date(mainBoletines[3].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                                </div>
                            <a href={`/boletines/${mainBoletines[3].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                            </div>
                            <div>
                            <img src={`https://congresoedomex.gob.mx/${mainBoletines[4].fotos[0].path}`} loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px" 
                                srcSet={`
                                https://congresoedomex.gob.mx/${mainBoletines[4].fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${mainBoletines[4].fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${mainBoletines[4].fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${mainBoletines[4].fotos[0].path} 1280w`} alt="" className="img-boletin" />
                            <h5>{ mainBoletines[4].titulo}</h5>
                            <div className="fecha-boletin">
                                {new Date(mainBoletines[4].fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
                            <a href={`/boletines/${mainBoletines[4].id}`} className="btn-var-2 w-button">Leer el boletín</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    )}
                </div>
            </div>
        </section>
    )
}