'use client';

type Props = {
  boletin: any;
  boletines: any;
};

export default function BoletinesSection({ boletin, boletines } : Props) {
    return (
    <section className="section-8">
        <section className="encabezado-bole-n">
            <h1 className="heading-36"> {boletin.titulo} </h1>
            <div>
                <div className="columna-informativa-blog w-row">
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin">Comunicado {boletin.comunicado} </div>
                    </div>
                    <div className="w-col w-col-6">
                        <div className="fecha-boletin">  
                            {new Date(boletin.fecha+ "T00:00:00").toLocaleDateString('es-MX', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
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
                    src={`https://congresoedomex.gob.mx/${boletin.fotos[0].path}`}
                    loading="lazy"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    srcSet={`
                        https://congresoedomex.gob.mx/${boletin.fotos[0].path} 500w, 
                        https://congresoedomex.gob.mx/${boletin.fotos[0].path} 800w, 
                        https://congresoedomex.gob.mx/${boletin.fotos[0].path} 1080w, 
                        https://congresoedomex.gob.mx/${boletin.fotos[0].path} 1280w`} alt="" className="image-25" />
            
                {boletin.fotos.length > 1 && (
                    <div className="div-block-40">
                        {boletin?.fotos?.slice(1).map((item:any, index: any) => (
                            <img key={index} src={`https://congresoedomex.gob.mx/${item.path}`} className="img-lightbox-under" />
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
                    <img src={`https://congresoedomex.gob.mx/${boletines[0].fotos[0].path}`} loading="lazy" sizes="(max-width: 1290px) 100vw, 1290px"
                    srcSet={`
                    https://congresoedomex.gob.mx/${boletines[0].fotos[0].path} 500w, 
                    https://congresoedomex.gob.mx/${boletines[0].fotos[0].path} 800w, 
                    https://congresoedomex.gob.mx/${boletines[0].fotos[0].path} 1080w, 
                    https://congresoedomex.gob.mx/${boletines[0].fotos[0].path} 1200w`} alt="" className="img-boletin" />
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
                    <img src={`https://congresoedomex.gob.mx/${boletines[1].fotos[0].path}`} loading="lazy" sizes="(max-width: 1280px) 100vw, 1280px"
                    srcSet={`
                    https://congresoedomex.gob.mx/${boletines[1].fotos[0].path} 500w, 
                    https://congresoedomex.gob.mx/${boletines[1].fotos[0].path} 800w, 
                    https://congresoedomex.gob.mx/${boletines[1].fotos[0].path} 1080w, 
                    https://congresoedomex.gob.mx/${boletines[1].fotos[0].path} 1200w`} alt="" className="img-boletin" />
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
                    <img src={`https://congresoedomex.gob.mx/${boletines[2].fotos[0].path}`} loading="lazy" sizes="(max-width: 4128px) 100vw, 4128px"
                    srcSet={`
                    https://congresoedomex.gob.mx/${boletines[2].fotos[0].path} 500w, 
                    https://congresoedomex.gob.mx/${boletines[2].fotos[0].path} 800w, 
                    https://congresoedomex.gob.mx/${boletines[2].fotos[0].path} 1080w, 
                    https://congresoedomex.gob.mx/${boletines[2].fotos[0].path} 1200w`} alt="" className="img-boletin" />
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
                    <img src={`https://congresoedomex.gob.mx/${boletines[3].fotos[0].path}`} loading="lazy" sizes="(max-width: 1600px) 100vw, 1600px"
                    srcSet={`
                    https://congresoedomex.gob.mx/${boletines[3].fotos[0].path} 500w, 
                    https://congresoedomex.gob.mx/${boletines[3].fotos[0].path} 800w, 
                    https://congresoedomex.gob.mx/${boletines[3].fotos[0].path} 1080w, 
                    https://congresoedomex.gob.mx/${boletines[3].fotos[0].path} 1200w`} alt="" className="img-boletin" />
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
  )
}