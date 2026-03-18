import Link from "next/link";

async function getDiputados() {
  try {
    const res = await fetch('http://localhost:3001/api/diputados', { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch diputados:", error);
    return [];
  }
}

export default async function Home() {
  const diputados = await getDiputados();
  const mainDiputado = diputados.length > 0 ? diputados[0] : null;

  return (
    <>
      <section className="section-3">
        <div className="code-embed w-embed w-iframe">
          <iframe 
            width="130%" 
            height="2035" 
            src="https://www.youtube.com/embed/j3bP2q4YWro?autoplay=1&mute=1&loop=1&playlist=j3bP2q4YWro" 
            title="Tu Congreso de Resultados" 
            frameBorder={0} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
        </div>
        <div data-w-id="0103c995-5e1d-dcc5-e0e3-47ae2562f79a" className="div-block hero-information">
          <h1 className="heading">Tu Congreso conectado y transparente</h1>
          <div className="div-block-2">
            <form action="/search" className="search w-form">
              <label htmlFor="search" className="field-label">Encuentra de manera fácil y rápida la información que necesitas.</label>
              <div className="div-block-3">
                <input className="search-input w-input" maxLength={256} name="query" placeholder="Buscar" type="search" id="search" required />
                <input type="submit" className="search-button w-button" value="Buscar" />
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <section className="numeralia max_width">
        <div className="div-block-4">
          <h1 className="heading-2 titulo-seccion">Legislatura LXII</h1>
          <p className="paragraph-2">Nuestros logros hablan del compromiso con el que legislamos</p>
        </div>
        <div>
          <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e90" className="columns w-row">
            <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
              <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">75</div>
              </div>
              <div className="descripcion_dato">This is some text inside of a div block.</div>
            </div>
            <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e92" className="numeralia_columna w-col w-col-3">
              <div data-w-id="5b28ed8c-d17f-f3f8-73e9-899b7f5bc0b4" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">75</div>
              </div>
              <div className="descripcion_dato">This is some text inside of a div block.</div>
            </div>
            <div data-w-id="34f38003-5772-2810-9f35-1c3b67f58025" className="numeralia_columna w-col w-col-3">
              <div data-w-id="7d17229f-77ef-63ea-2cfd-c4ee6aff966d" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">75</div>
              </div>
              <div className="descripcion_dato">This is some text inside of a div block.</div>
            </div>
            <div data-w-id="af7be9bb-144f-dc65-90c9-24c8f7af929a" className="numeralia_columna w-col w-col-3">
              <div data-w-id="b99290fd-c327-f819-16b9-c78bc4212308" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">75</div>
              </div>
              <div className="descripcion_dato">This is some text inside of a div block.</div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="diputados max_width">
        <div>
          <div className="div-block-6">
            <img src="/images/Diputad-1.gif" loading="lazy" alt="" className="image-31" />
            <form action="/search" className="search-2 w-form">
              <input className="search-input-2 w-input" maxLength={256} name="query" placeholder="Busca a tu diputado" type="search" id="search-2" required />
              <input type="submit" className="search-button-2 w-button" value="Buscar" />
            </form>
          </div>
          <div className="filtros-diputados grupos-parlamentarios-selector">
            <a href="#" className="button grupo_parlamentario btn-grupo-parlamentario w-button">morena</a>
            <a href="#" className="button grupo_parlamentario btn-pan btn-grupo-parlamentario w-button">PAN</a>
            <a href="#" className="button grupo_parlamentario btn-pt btn-grupo-parlamentario w-button">PT</a>
            <a href="#" className="button grupo_parlamentario btn-pri btn-grupo-parlamentario w-button">PRI</a>
            <a href="#" className="button grupo_parlamentario btn-pvem btn-grupo-parlamentario w-button">PVEM</a>
            <a href="#" className="button grupo_parlamentario btn-mc btn-grupo-parlamentario w-button">MC</a>
            <a href="#" className="button grupo_parlamentario btn-prd btn-grupo-parlamentario w-button">PRD</a>
          </div>
          <div className="div-block-13">
            <div className="columns-2 w-row">
              <div className="column-3 w-col w-col-6">
                <div className="columns-3 w-row">
                  <div className="column-2 w-col w-col-6">
                    {mainDiputado ? (
                      <Link href={`/diputados/${mainDiputado.id}`} className="w-inline-block">
                        <img src={mainDiputado.image} loading="lazy" alt="" className="image-3" />
                      </Link>
                    ) : (
                       <img src="/images/2PAN-Emma-Laura-Álvarez-Villavicencio-01.png" loading="lazy" alt="" className="image-3" />
                    )}
                  </div>
                  <div className="column-4 w-col w-col-6">
                    <div className="div-block-24">
                      {mainDiputado ? (
                        <>
                          <div>
                            <h4 className="nombre-diputado-home">{mainDiputado.name}<br /></h4>
                            <div>{mainDiputado.position}</div>
                          </div>
                          <div className="div-block-11">
                            <p>{mainDiputado.description}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h4 className="nombre-diputado-home">Emma Laura Álvarez<br /></h4>
                            <div>Diputada | Distrito Plurinominal</div>
                          </div>
                          <div className="div-block-11">
                            <p>Cargando datos del servidor...</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="columns-4 w-row">
                  <div className="w-col w-col-6">
                    <div className="div-block-16">
                      <p className="paragraph-3">Contacto</p>
                      <img src="/images/mail_icon.png" loading="lazy" alt="" className="image-4" />
                    </div>
                  </div>
                  <div className="column-5 w-col w-col-6">
                    <div>
                      <p className="paragraph-3">Redes Sociales</p>
                    </div>
                    <div className="social-media">
                      <img src="/images/facebook_icon.png" loading="lazy" alt="" className="image-5" />
                      <img src="/images/x_icon.png" loading="lazy" alt="" className="image-6" />
                      <img src="/images/instagram_icon.png" loading="lazy" alt="" className="image-7" />
                      <img src="/images/tiktok_icono.png" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 763px) 97vw, (max-width: 767px) 741px, 24vw" srcSet="/images/tiktok_icono-p-500.png 500w, /images/tiktok_icono.png 741w" alt="" className="image-8" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-col w-col-6">
                <div className="div-block-12">
                  <a href="#" className="button grupo_parlamentario btn-var-1 w-button">Iniciativa</a>
                  <a href="#" className="button grupo_parlamentario btn-var-1 w-button">Comunicados</a>
                  <a href="#" className="button grupo_parlamentario btn-var-1 w-button">Comisiones y Comites</a>
                </div>
                <div className="div-block-14">
                  <div>
                    <div className="columns-6 w-row">
                      <div className="column-8 w-col w-col-4">
                        <div className="img-comunicado-home-1"></div>
                      </div>
                      <div className="column-7 w-col w-col-8">
                        <div className="div-block-20">
                          <h4>Congreso impulsa la búsqueda de personas desaparecidas en Edomex</h4>
                        </div>
                        <a href="#" className="button-2 btn-var2 w-button">Leer comunicado</a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="columns-6 w-row">
                      <div className="column-8 w-col w-col-4">
                        <div className="img-comunicado-home-2"></div>
                      </div>
                      <div className="column-7 w-col w-col-8">
                        <div className="div-block-20">
                          <h4><strong>Agravar penas por delitos con antecedente de acecho, propone el ...</strong></h4>
                        </div>
                        <a href="#" className="button-2 btn-var2 w-button">Leer comunicado</a>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#" className="button-2 btn-var2 w-button">Leer todos los comunicado</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max_width">
        <div>
          <h4 className="heading-5 titulo-seccion">Agenda Parlamentaria del día</h4>
        </div>
        <div className="columns-5 w-row">
          <div className="w-col w-col-6">
            <div style={{ paddingTop: '56.17021276595745%' }} className="w-embed-youtubevideo youtube">
              <iframe 
                src="https://www.youtube.com/embed/KbfsXJrPXCU?rel=0&controls=1&autoplay=0&mute=0&start=0" 
                frameBorder={0} 
                style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'auto' }} 
                allow="autoplay; encrypted-media" 
                allowFullScreen 
                title="Resumen Legislativo | Semana 3 - enero | #CongresoEdomex"
              />
            </div>
            <h4>Titulo del video</h4>
          </div>
          <div className="column-6 w-col w-col-6">
            <div>
              <ol role="list" className="w-list-unstyled">
                <li className="list-item">
                  <div className="div-block-19">
                    <div className="text-block-3">Segunda cátedra “El Pensamiento Humanista de Sor Juana Inés de la Cruz” | Mtro. Juan Carlos Villarreal Martínez</div>
                    <div>Lunes 05:00 p.m. -INESLE</div>
                    <a href="#" className="btn-envivo w-button">Ir al en vivo</a>
                  </div>
                </li>
                <li className="list-item">
                  <div className="div-block-19">
                    <div className="text-block-3">Segunda cátedra “El Pensamiento Humanista de Sor Juana Inés de la Cruz” | Mtro. Juan Carlos Villarreal Martínez</div>
                    <div>Lunes 05:00 p.m. -INESLE</div>
                    <a href="#" className="btn-envivo w-button">Ir al en vivo</a>
                  </div>
                </li>
                <li className="list-item">
                  <div className="div-block-19">
                    <div className="text-block-3">Segunda cátedra “El Pensamiento Humanista de Sor Juana Inés de la Cruz” | Mtro. Juan Carlos Villarreal Martínez</div>
                    <div>Lunes 05:00 p.m. -INESLE</div>
                    <a href="#" className="btn-envivo w-button">Ir al en vivo</a>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="div-block-37">
          <a href="#" className="btn-envivo w-button">Ver todas las sesiones</a>
        </div>
      </section>

      <section className="max_width">
        <div>
          <h4 className="heading-6 titulo-seccion titulo-center">Trabajo Legislativo</h4>
        </div>
        <div>
          <div className="w-layout-grid grid">
            <div id="w-node-d567c7f8-8d96-8b81-859d-aca8ab8b5342-8a899405" className="div-block-21 legis-in-1">
              <Link href="/trabajo-legislativo" className="link-block w-inline-block">
                <h4 className="heading-8">Gaceta</h4>
              </Link>
            </div>
            <div className="div-block-21 legis-in-2">
              <h4 className="heading-8">Iniciativas de Ley</h4>
            </div>
            <div className="div-block-21 legis-in-3">
              <h4 className="heading-8">Minutas</h4>
            </div>
            <div className="div-block-21 legis-in-4">
              <h4 className="heading-8">Decretos y Acuerdos</h4>
            </div>
            <div className="div-block-21 legis-in-5">
              <h4 className="heading-8">Diario de los Debates</h4>
            </div>
            <div className="div-block-21 legis-in-6">
              <h4 className="heading-8">Sesiones, Orden del Día, Asistencia, Acta y Versión</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="max_width">
        <div>
          <div>
            <h4 className="titulo-seccion">Boletínes</h4>
          </div>
          <div>Mantente informado de todo lo que ocurre en el pleno</div>
          <div className="div-block-23">
            <div className="columns-8 w-row">
              <div className="column-9 w-col w-col-6">
                <div className="div-block-22">
                  <img src="/images/Comisión-legislativa-avala-ajustes-al-Consejo-Directivo-de-Probosque.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2666px) 48vw, 1280px" srcSet="/images/Comisión-legislativa-avala-ajustes-al-Consejo-Directivo-de-Probosque-p-500.jpg 500w, /images/Comisión-legislativa-avala-ajustes-al-Consejo-Directivo-de-Probosque-p-800.jpg 800w, /images/Comisión-legislativa-avala-ajustes-al-Consejo-Directivo-de-Probosque-p-1080.jpg 1080w, /images/Comisión-legislativa-avala-ajustes-al-Consejo-Directivo-de-Probosque.jpg 1280w" alt="" className="image-10" />
                  <div>
                    <h4 className="heading-10">Comisión legislativa avala ajustes al Consejo Directivo de Probosque<br /></h4>
                    <p className="paragraph-4">08 de Diciembre 2025</p>
                    <p>La Comisión Legislativa de Protección Ambiental y Cambio Climático avaló que la presidencia del Consejo Directivo de la Protectora de Bosques del Estado de México (Probosque) sea encabezada por la persona titular de la Secretaría del Campo, a iniciativa de la gobernadora Delfina Gómez.<br /></p>
                  </div>
                  <Link href="/noticias/comision-legislativa-avala-ajustes-al-consejo-directivo-de-probosque" className="btn-var-2 w-button">Leer el boletín</Link>
                </div>
              </div>
              <div className="w-col w-col-6">
                <div>
                  <div className="w-layout-grid">
                    <div>
                      <img src="/images/1051eb7fc-a015-46d9-acf3-4ba2d32d68e0.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2687px) 48vw, 1290px" srcSet="/images/1051eb7fc-a015-46d9-acf3-4ba2d32d68e0-p-500.jpg 500w, /images/1051eb7fc-a015-46d9-acf3-4ba2d32d68e0-p-800.jpg 800w, /images/1051eb7fc-a015-46d9-acf3-4ba2d32d68e0-p-1080.jpg 1080w, /images/1051eb7fc-a015-46d9-acf3-4ba2d32d68e0.jpg 1290w" alt="" className="img-boletin" />
                      <h5>Congreso develó fachada navideña con la presencia de la Gobernadora</h5>
                      <div className="fecha-boletin">08 de Diciembre 2025</div>
                      <a href="#" className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                    <div>
                      <img src="/images/1080265a8-2efe-46fa-802b-adc5f5cab2e6.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 2666px) 48vw, 1280px" srcSet="/images/1080265a8-2efe-46fa-802b-adc5f5cab2e6-p-500.jpg 500w, /images/1080265a8-2efe-46fa-802b-adc5f5cab2e6-p-800.jpg 800w, /images/1080265a8-2efe-46fa-802b-adc5f5cab2e6-p-1080.jpg 1080w, /images/1080265a8-2efe-46fa-802b-adc5f5cab2e6.jpg 1280w" alt="" className="img-boletin" />
                      <h5>Agradece gobernadora a congresistas por confianza en su gobierno</h5>
                      <div className="fecha-boletin">08 de Diciembre 2025</div>
                      <a href="#" className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                    <div>
                      <img src="/images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 8256px) 50vw, 4128px" srcSet="/images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-500.jpg 500w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-800.jpg 800w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-1080.jpg 1080w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-1600.jpg 1600w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-2000.jpg 2000w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-2600.jpg 2600w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2-p-3200.jpg 3200w, /images/1d6cdb34c-2e63-49f1-a7de-f671371f45e2.jpg 4128w" alt="" className="img-boletin" />
                      <h5>Anuncian nueva legislación en materia de planeación gubernamental</h5>
                      <div className="fecha-boletin">08 de Diciembre 2025</div>
                      <a href="#" className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                    <div>
                      <img src="/images/A38d9247d-6745-4959-a0b9-a2450fd1656a.jpg" loading="lazy" sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 3265px) 49vw, 1600px" srcSet="/images/A38d9247d-6745-4959-a0b9-a2450fd1656a-p-500.jpg 500w, /images/A38d9247d-6745-4959-a0b9-a2450fd1656a-p-800.jpg 800w, /images/A38d9247d-6745-4959-a0b9-a2450fd1656a-p-1080.jpg 1080w, /images/A38d9247d-6745-4959-a0b9-a2450fd1656a.jpg 1600w" alt="" className="img-boletin" />
                      <h5>Asiste Francisco Vázquez a informe del alcalde de Tlalnepantla</h5>
                      <div className="fecha-boletin">05 de Diciembre 2025</div>
                      <a href="#" className="btn-var-2 w-button">Leer el boletín</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max_width">
        <h4 className="titulo-seccion titulo-center">Información de Interés</h4>
        <div>
          <div className="w-layout-grid grid-2">
            <img src="/images/Banner-500x500-oratoria.gif" loading="lazy" alt="" className="image-13 banner-info" />
            <img src="/images/banner-notas-HxH.gif" loading="lazy" alt="" className="image-14 banner-info" />
            <img src="/images/Banner-Correo-500x500.gif" loading="lazy" alt="" className="banner-info" />
            <img src="/images/Banner-Correo-500x500.png" loading="lazy" alt="" className="banner-info" />
          </div>
        </div>
      </section>
    </>
  );
}
