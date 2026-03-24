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
                                <div className="texto-centrado"> { integrante[0].tipo_cargo.valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[1].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pri"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo"> Dip. { integrante[1].integranteLegis.diputado.nombres } { integrante[1].integranteLegis.diputado.apaterno } { integrante[1].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado"> { integrante[1].tipo_cargo.valor } </div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[2].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pt"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[2].integranteLegis.diputado.nombres } { integrante[2].integranteLegis.diputado.apaterno } { integrante[2].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24"> { integrante[2].tipo_cargo.valor } </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-layout-grid div-mesa-direciva">
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[3].integranteLegis.diputado.fotos[0].path}`}  loading="lazy" alt="" className="img-jucopo bg-pan"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo"> Dip. { integrante[3].integranteLegis.diputado.nombres } { integrante[3].integranteLegis.diputado.apaterno } { integrante[3].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado"> { integrante[3].tipo_cargo.valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[4].integranteLegis.diputado.fotos[0].path}`}  loading="lazy" alt="" className="img-jucopo bg-mc"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[4].integranteLegis.diputado.nombres } { integrante[4].integranteLegis.diputado.apaterno } { integrante[4].integranteLegis.diputado.amaterno }</h3>
                                <div className="texto-centrado">{ integrante[4].tipo_cargo.valor }</div>
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
                                <div className="text-block-24">{ integrante[5].tipo_cargo.valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path}`} loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet={`
                                https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path} 1251w`}
                                 alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[6].integranteLegis.diputado.nombres } { integrante[6].integranteLegis.diputado.apaterno } { integrante[6].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24">{ integrante[6].tipo_cargo.valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[7].integranteLegis.diputado.fotos[0].path}`} loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet={`
                                https://congresoedomex.gob.mx/${integrante[7].integranteLegis.diputado.fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${integrante[7].integranteLegis.diputado.fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${integrante[7].integranteLegis.diputado.fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${integrante[7].integranteLegis.diputado.fotos[0].path} 1251w`}
                                 alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[7].integranteLegis.diputado.nombres } { integrante[7].integranteLegis.diputado.apaterno } { integrante[7].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24">{ integrante[7].tipo_cargo.valor }</div>
                            </div>
                        </div>
                        <div className="miembro-card-jucopo">
                            <img src={`https://congresoedomex.gob.mx/${integrante[8].integranteLegis.diputado.fotos[0].path}`} loading="lazy" sizes="(max-width: 1251px) 100vw, 1251px" 
                            srcSet={`
                                https://congresoedomex.gob.mx/${integrante[8].integranteLegis.diputado.fotos[0].path} 500w, 
                                https://congresoedomex.gob.mx/${integrante[8].integranteLegis.diputado.fotos[0].path} 800w, 
                                https://congresoedomex.gob.mx/${integrante[8].integranteLegis.diputado.fotos[0].path} 1080w, 
                                https://congresoedomex.gob.mx/${integrante[8].integranteLegis.diputado.fotos[0].path} 1251w`}
                                alt="" className="img-jucopo bg-morena"/>
                            <div className="cuerpo-info-jucopo">
                                <h3 className="nombre-jucopo">Dip. { integrante[8].integranteLegis.diputado.nombres } { integrante[8].integranteLegis.diputado.apaterno } { integrante[8].integranteLegis.diputado.amaterno }</h3>
                                <div className="text-block-24">{ integrante[8].tipo_cargo.valor }</div>
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
        </section>
    )
}