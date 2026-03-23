async function getBoletin(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/boletines/${id}`);
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}

async function getBoletinesRandom() {
  try {
    const res = await fetch(`http://localhost:4000/api/boletines/random`);
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}


export default async function BoletinesPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const boletin = await getBoletin(id);
    const boletines = await getBoletinesRandom();
     return (
        <section className="boletines max_width">
            <div>
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
                     {/* <section className="serction-nav-boletin">
                        <div>
                            <div className="w-row">
                            <div className="column-17 w-col w-col-6">
                                <a href="#" className="btn-nav-boletin w-button">Anterior</a>
                            </div>
                            <div className="w-col w-col-6">
                                <a href="#" className="btn-nav-boletin w-button">Siguiente</a>
                            </div>
                            </div>
                        </div>
                    </section> */}
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
                <section className="section-4">
                    <div className="columns-7 w-row">
                        <div className="w-col w-col-4">
                            <div className="text-block-8">Plaza Hidalgo s/n, Col. Centro Toluca de Lerdo, Estado de México<br/>Conmutador (722) 279-6400</div>
                        </div>
                        <div className="column-10 w-col w-col-4"><img src="images/logo-animado.gif" loading="lazy" alt="" className="image-11"/></div>
                        <div className="w-col w-col-4">
                            <div className="social-media">
                                <a href="https://www.facebook.com/CongresoEdomex" target="_blank" className="w-inline-block">
                                <img src="images/facebook_icon.png" loading="lazy" alt="" className="image-5"/></a>
                                <a href="https://x.com/CongresoEdomex" target="_blank" className="w-inline-block">
                                <img src="images/x_icon.png" loading="lazy" alt="" className="image-6"/></a>
                                <a href="https://www.instagram.com/congresoedomex" target="_blank" className="w-inline-block">
                                <img src="images/instagram_icon.png" loading="lazy" alt="" className="image-7"/></a>
                                <a href="https://www.tiktok.com/@congresoedomex" target="_blank" className="w-inline-block">
                                <img src="images/tiktok_icono.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 763px) 97vw, (max-width: 767px) 741px, 31vw"  srcSet="images/tiktok_icono-p-500.png 500w, images/tiktok_icono.png 741w" alt="" className="image-7"/></a>
                                <a href="https://www.youtube.com/@CongresoEdomex" target="_blank" className="w-inline-block"><img src="images/youtube_icon.png" loading="lazy" alt="" className="image-8 youtube-icono"/></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}