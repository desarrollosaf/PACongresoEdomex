async function getMesa() {
  try {
    const res = await fetch('http://localhost:4000/api/mesa');
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch diputados:", error);
    return [];
  }
}


export default async function MesaPage() {
    const integrante = await getMesa();
     return (
        <section className="mesa-directiva max_width">
            <div className="div-block-52">
                <div className="div-block-53">
                    <h1 className="titulo-centrado">Diputación Permanente</h1>
                    <p className="subtitulo-info-centrado">Grupo de legisladoras y legisladores que trabajan durante los periodos de receso de la Legislatura. Puede 
                        convocar a todas y todos los legisladores a un periodo extraordinario para resolver asuntos que lo ameriten.
                    </p>
                </div>
            </div>
            <div className="cuerpo-jucopo">
                <h3 className="titulo-centrado">Integrantes</h3>
                <div className="bg-gradient-gris">
                    <div className="w-layout-grid div-mesa-direciva">
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[0].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">  Dip. { integrante[0].integranteLegis.diputado.nombres } { integrante[0].integranteLegis.diputado.apaterno } { integrante[0].integranteLegis.diputado.amaterno } </h3>
                                <div className="texto-centrado"> { integrante[0].cargo. valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[1].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pri"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo"> Dip. { integrante[1].integranteLegis.diputado.nombres } { integrante[1].integranteLegis.diputado.apaterno } { integrante[1].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado"> { integrante[1].cargo. valor } </div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[2].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pt"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[2].integranteLegis.diputado.nombres } { integrante[2].integranteLegis.diputado.apaterno } { integrante[2].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24"> { integrante[2].cargo. valor } </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-layout-grid div-mesa-direciva">
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[3].integranteLegis.diputado.fotos[0].path}`}  loading="lazy" alt="" className="img-jucopo bg-pan"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo"> Dip. { integrante[3].integranteLegis.diputado.nombres } { integrante[3].integranteLegis.diputado.apaterno } { integrante[3].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado"> { integrante[3].cargo. valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[4].integranteLegis.diputado.fotos[0].path}`}  loading="lazy" alt="" className="img-jucopo bg-mc"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[4].integranteLegis.diputado.nombres } { integrante[4].integranteLegis.diputado.apaterno } { integrante[4].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado">{ integrante[4].cargo. valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path}`}  loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet={`
                                https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path} 1251w`}
                                alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[5].integranteLegis.diputado.nombres } { integrante[5].integranteLegis.diputado.apaterno } { integrante[5].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24">{ integrante[5].cargo. valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src="images/MORENA-Jennifer-Nathalie-González-López.png" loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet="images/MORENA-Jennifer-Nathalie-González-López-p-500.png 500w, 
                            images/MORENA-Jennifer-Nathalie-González-López-p-800.png 800w, 
                            images/MORENA-Jennifer-Nathalie-González-López-p-1080.png 1080w, 
                            images/MORENA-Jennifer-Nathalie-González-López.png 1251w" alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[5].integranteLegis.diputado.nombres } { integrante[5].integranteLegis.diputado.apaterno } { integrante[5].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24">{ integrante[5].cargo. valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src="images/MORENA-Zaira-Cedillo-Silva.png" loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet="images/MORENA-Zaira-Cedillo-Silva-p-500.png 500w, 
                            images/MORENA-Zaira-Cedillo-Silva-p-800.png 800w, 
                            images/MORENA-Zaira-Cedillo-Silva-p-1080.png 1080w, 
                            images/MORENA-Zaira-Cedillo-Silva.png 1251w" alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. Zaira Cedillo Silva</h3>
                                <div className="text-block-24">Integrante</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src="images/MORENAEstebanJuárezHernández.png" loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet="images/MORENAEstebanJuárezHernández-p-500.png 500w, 
                            images/MORENAEstebanJuárezHernández-p-800.png 800w, 
                            images/MORENAEstebanJuárezHernández-p-1080.png 1080w, 
                            images/MORENAEstebanJuárezHernández.png 1251w" alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. Esteban Juárez Hernández</h3>
                                <div className="text-block-24">Integrante</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="que_es_jucopo">
                    <div className="columns-21 w-row">
                        <div className="w-col w-col-6">
                            <h1 className="titulo-seccion">¿Que hace la Mesa Directiva?</h1>
                        </div>
                        <div className="w-col w-col-6">
                            <p className="texto-comunicado">Atiende los asuntos del Congreso mexiquense durante los periodos de receso; es decir, entre un periodo ordinario y otro. 
                                Debido a que tiene atribuciones limitadas, puede convocar a todas y todos los legisladores a un periodo extraordinario para resolver asuntos cuya importancia 
                                lo requiera.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section className="section-4">
                <div className="columns-7 w-row">
                    <div className="w-col w-col-4">
                        <div className="text-block-8">Plaza Hidalgo s/n, Col. Centro Toluca de Lerdo, Estado de México<br/>Conmutador (722) 279-6400</div>
                    </div>
                    <div className="column-10 w-col w-col-4">
                        <img src="images/logo-animado.gif" loading="lazy" alt="" className="image-11"/>
                    </div>
                    <div className="w-col w-col-4">
                        <div className="social-media">
                            <a href="https://www.facebook.com/CongresoEdomex" target="_blank" className="w-inline-block">
                                <img src="images/facebook_icon.png" loading="lazy" alt="" className="image-5"/></a>
                            <a href="https://x.com/CongresoEdomex" target="_blank" className="w-inline-block">
                                <img src="images/x_icon.png" loading="lazy" alt="" className="image-6"/>
                            </a>
                            <a href="https://www.instagram.com/congresoedomex" target="_blank" className="w-inline-block">
                                <img src="images/instagram_icon.png" loading="lazy" alt="" className="image-7"/>
                            </a>
                            <a href="https://www.tiktok.com/@congresoedomex" target="_blank" className="w-inline-block">
                                <img src="images/tiktok_icono.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 763px) 97vw, (max-width: 767px) 741px, 31vw" 
                                srcSet="images/tiktok_icono-p-500.png 500w, images/tiktok_icono.png 741w" alt="" className="image-7"/>
                            </a>
                            <a href="https://www.youtube.com/@CongresoEdomex" target="_blank" className="w-inline-block">
                                <img src="images/youtube_icon.png" loading="lazy" alt="" className="image-8 youtube-icono"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>     
        </section>
    )
}