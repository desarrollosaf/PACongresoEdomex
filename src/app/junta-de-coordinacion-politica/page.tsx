import { getJunta } from '../service/junta.api';

export default async function juntaPage() {
    const integrante = await getJunta();
     return (
        <section className="junta-de-coordinacion-politica max_width">
            <div className="div-block-52">
                <div className="div-block-53">
                    <h1 className="titulo-centrado">Junta de Coordinación Politica</h1>
                    <p className="subtitulo-info-centrado">Órgano de dirección política del Congreso del Estado de México, encargado de coordinar los trabajos legislativos, promover acuerdos entre los distintos grupos parlamentarios y garantizar el funcionamiento eficaz y democrático del Poder Legislativo.</p>
                </div>
            </div>
            <div className="cuerpo-jucopo">
                <h3 className="titulo-seccion">Integrantes</h3>
                <div>
                    <div className="columns-18 w-row">
                        <div className="column-22 w-col w-col-4">
                            <div className="presidente-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[0].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-morena"/>
                                <div className="cuerpo-info-jucopo">
                                    <h3 className="nombre-jucopo"> {integrante[0].integranteLegis.diputado.nombres} {integrante[0].integranteLegis.diputado.apaterno} {integrante[0].integranteLegis.diputado.amaterno} </h3>
                                    <div className="texto-centrado"> {integrante[0].tipo_cargo.valor} de la Junta de Coordinación Política</div>
                                </div>
                            </div>
                        </div>
                        <div className="column-23 w-col w-col-8">
                            <div className="w-layout-grid grid-15">
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[1].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pvedm"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[1].integranteLegis.diputado.nombres} {integrante[1].integranteLegis.diputado.apaterno} {integrante[1].integranteLegis.diputado.amaterno}</h3>
                                        <div className="texto-centrado">{integrante[1].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[2].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pri"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[2].integranteLegis.diputado.nombres} {integrante[2].integranteLegis.diputado.apaterno} {integrante[2].integranteLegis.diputado.amaterno}</h3>
                                        <div className="texto-centrado">{integrante[2].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[3].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pt"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[3].integranteLegis.diputado.nombres} {integrante[3].integranteLegis.diputado.apaterno} {integrante[3].integranteLegis.diputado.amaterno}</h3>
                                        <div className="text-block-24">{integrante[3].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[4].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-pan"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[4].integranteLegis.diputado.nombres} {integrante[4].integranteLegis.diputado.apaterno} {integrante[4].integranteLegis.diputado.amaterno}</h3>
                                        <div className="text-block-24">{integrante[4].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[5].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-prd"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[5].integranteLegis.diputado.nombres} {integrante[5].integranteLegis.diputado.apaterno} {integrante[5].integranteLegis.diputado.amaterno}</h3>
                                        <div className="text-block-24">{integrante[5].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                                <div className="miembro-card-jucopo"><img src={`https://congresoedomex.gob.mx/${integrante[6].integranteLegis.diputado.fotos[0].path}`} loading="lazy" alt="" className="img-jucopo bg-mc"/>
                                    <div className="cuerpo-info-jucopo">
                                        <h3 className="nombre-jucopo">{integrante[6].integranteLegis.diputado.nombres} {integrante[6].integranteLegis.diputado.apaterno} {integrante[6].integranteLegis.diputado.amaterno}</h3>
                                        <div className="text-block-24">{integrante[6].tipo_cargo.valor}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="que_es_jucopo">
                    <h1 className="titulo-seccion">¿Que hace la Junta de Coordinación Política?</h1>
                    <p className="texto-comunicado">La <strong>Junta de Coordinación Política</strong> sirve para 
                    <strong>coordinar y conducir la vida política del Congreso</strong>, asegurando que el trabajo legislativo se realice mediante el diálogo, los acuerdos y la 
                    representación equilibrada de los grupos parlamentarios.<br/><br/><strong>De manera concreta, su función es:</strong><br/>Coordinar los trabajos legislativos 
                    entre los distintos grupos parlamentarios.<br/>Construir acuerdos políticos para el funcionamiento del Congreso.<br/>Definir y ordenar la agenda legislativa.Proponer 
                    la integración de comisiones y comités.<br/>Impulsar decisiones que garanticen gobernabilidad y eficiencia legislativa.<br/>Servir como espacio de diálogo y negociación
                    parlamentaria.</p>
                </div>
            </div>
        </section>
    )
}
    
        