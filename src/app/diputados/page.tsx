import { getDiputados } from '../service/diputados.api';

export default async function DiputadosPage() {
    const diputados = await getDiputados();

    return (
        <>


            <section className="diputados max_width">
                <div>
                    <div className="div-block-6">
                        <h3 className="heading-3 titulo-seccion">Diputadas, diputados y diputades</h3>
                        <form action="/search" className="search-2 w-form"><input className="search-input-2 w-input" maxLength={256} name="query" placeholder="Busca a tu diputado" type="search" id="search-2" required /><input type="submit" className="search-button-2 w-button" value="Buscar" /></form>
                    </div>
                    <div>Filtra u ordena a los diputados, para facilitar tu búsqueda.</div>
                    <div className="div-block-36"><img src="images/grupo-parlamentario-2.png" loading="lazy" data-w-id="4c2d2cc0-c30a-59fa-a30f-abc8a3d779f4" sizes="(max-width: 1666px) 100vw, 1666px" alt="" srcSet="images/grupo-parlamentario-2-p-500.png 500w, images/grupo-parlamentario-2-p-800.png 800w, images/grupo-parlamentario-2-p-1080.png 1080w, images/grupo-parlamentario-2-p-1600.png 1600w, images/grupo-parlamentario-2.png 1666w" className="img-parlamentaria" />
                        <div data-w-id="63971480-a937-37ef-f8c0-d2b8754bdc89" className="features-wrapper">
                            <div data-w-id="63971480-a937-37ef-f8c0-d2b8754bdc8a" className="features-block"><img src="images/morena.png" loading="lazy" sizes="(max-width: 839px) 100vw, 839px" srcSet="images/morena-p-500.png 500w, images/morena.png 839w" alt="" className="image-23" />
                                <div className="features-title">52%</div>
                            </div>
                            <div data-w-id="63971480-a937-37ef-f8c0-d2b8754bdc91" className="features-block"><img src="images/PT.png" loading="lazy" sizes="(max-width: 852px) 100vw, 852px" srcSet="images/PT-p-500.png 500w, images/PT.png 852w" alt="" className="image-23" />
                                <div className="features-title">10.7%</div>
                            </div>
                            <div data-w-id="63971480-a937-37ef-f8c0-d2b8754bdc98" className="features-block"><img src="images/PVEM.png" loading="lazy" sizes="(max-width: 852px) 100vw, 852px" srcSet="images/PVEM-p-500.png 500w, images/PVEM-p-800.png 800w, images/PVEM.png 852w" alt="" className="image-23" />
                                <div className="features-title">12%</div>
                            </div>
                            <div data-w-id="63971480-a937-37ef-f8c0-d2b8754bdc9d" className="features-block"><img src="images/PRI.png" loading="lazy" sizes="(max-width: 825px) 100vw, 825px" srcSet="images/PRI-p-500.png 500w, images/PRI-p-800.png 800w, images/PRI.png 825w" alt="" className="image-23" />
                                <div className="features-title">9.3<span className="features-title-small">%</span></div>
                            </div>
                            <div data-w-id="60c6a68c-4929-715e-f895-ec7fd077ea99" className="features-block"><img src="images/Pan.png" loading="lazy" sizes="(max-width: 840px) 100vw, 840px" srcSet="images/Pan-p-500.png 500w, images/Pan.png 840w" alt="" className="image-23" />
                                <div className="features-title">8%</div>
                            </div>
                            <div data-w-id="51f9a351-f307-2ca1-8ad4-64a0b8fb0db9" className="features-block"><img src="images/MC.png" loading="lazy" sizes="(max-width: 799px) 100vw, 799px" srcSet="images/MC-p-500.png 500w, images/MC.png 799w" alt="" className="image-23" />
                                <div className="features-title">5.3%</div>
                            </div>
                            <div data-w-id="b0e92feb-a9c2-27d1-8472-3f4540e8cbbe" className="features-block"><img src="images/PRD.png" loading="lazy" sizes="(max-width: 775px) 100vw, 775px" srcSet="images/PRD-p-500.png 500w, images/PRD.png 775w" alt="" className="image-23" />
                                <div className="features-title">2.7%</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="div-block-26">
                            <div data-hover="false" data-delay="0" className="dropdown-grupo-parlamentario w-dropdown">
                                <div className="filtro-grupoparlamentario w-dropdown-toggle">
                                    <div className="w-icon-dropdown-toggle"></div>
                                    <div>Grupo parlamentario </div>
                                </div>
                                <nav className="dropdown-list-2 w-dropdown-list">
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">morena</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">PAN</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">PT</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">PRI</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">PVEM</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">MC</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">PRD</a>
                                </nav>
                            </div>
                            <div data-hover="false" data-delay="0" className="dropdown-grupo-parlamentario w-dropdown">
                                <div className="filtro-grupoparlamentario w-dropdown-toggle">
                                    <div className="w-icon-dropdown-toggle"></div>
                                    <div>Orden</div>
                                </div>
                                <nav className="dropdown-list-2 w-dropdown-list">
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">Nombre</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">Apellido</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">Genero</a>
                                    <a href="#" className="filtro-grupoparlamentario opcion-de-grupo w-dropdown-link">Distrito</a>
                                </nav>
                            </div>
                        </div>
                        <div className="div-block-26">
                            <a href="#" className="btn-var-2 w-button">Grupos Parlamentarios</a>
                            <a href="mesa-directiva.html" className="btn-var-2 w-button">Diputación Permanente</a>
                            <a href="#" className="btn-var-2 w-button">Junta de Coordinación Politica</a>
                            <a href="comisiones-y-comites.html" className="btn-var-2 w-button">Comisiones y Comités</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max_width seccion-de-diputados">
                <div>
                    <h4 className="heading-13">Por apellido A-Z</h4>
                </div>
                <div>Encuentra a tu diputado por orden alfabético de apellido</div>
                <div className="grupo-de-filtro">
                    <div>
                        <div className="w-layout-grid grid-3">
                            {diputados.map((diputado: any) => {
                                const integrante = diputado.integrantes?.[0];
                                const partido = integrante?.partido;
                                const distrito = integrante?.distrito;
                                const foto = diputado.fotos?.[0];
                                const fotoUrl = foto?.path ? `https://www.congresoedomex.gob.mx/${foto.path}` : undefined;
                                const nombreCompleto = `${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''} ${diputado.nombres ?? ''}`.trim();
                                const siglas = partido?.siglas ?? '';
                                const tipoCargo = distrito?.distrito ?? 'Plurinominal';

                                return (
                                    <div key={diputado.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img
                                            src={fotoUrl ?? 'images/placeholder-diputado.png'}
                                            loading="lazy"
                                            alt={nombreCompleto}
                                            className={`image-15 diputado-${siglas.toLowerCase()}`}
                                        />
                                        <div className="info-diputado-basica" style={{ flex: 1, width: '100%' }}>
                                            <h4 className="nombre-diputado">{nombreCompleto}</h4>
                                            <div className="gp-diputado">{siglas}</div>
                                            <div>{tipoCargo}</div>
                                        </div>
                                        <a href={`/diputados/${diputado.fancyurl ?? diputado.id}`} className="btn-var-2 w-button">Saber más</a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
