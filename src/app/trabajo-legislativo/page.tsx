'use client';

import { useState } from 'react';   
import { getTrabajoLegislativo } from '../service/trabajo_legislativo.service';

export default async function TrabajoLegislativoPage() {
  const [activeTab, setActiveTab] = useState('Gaceta');
  const trabajoLegislativo = await getTrabajoLegislativo();
  
  return (
    <>
      <section className="main-legislativo">
        <h2 className="titulo-seccion trabajo-legislativo">Trabajo Legislativo</h2>

        <div
          data-current="Gaceta"
          data-easing="ease"
          data-duration-in="300"
          data-duration-out="100"
          className="w-tabs"
        >
          <div className="tabs-menu-4 w-tab-menu">
            <button
              type="button"
              onClick={() => setActiveTab('Gaceta')}
              className={`btn-var-2 w-inline-block w-tab-link ${activeTab === 'Gaceta' ? 'w--current' : ''}`}
            >
              <div>Gaceta</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('legislacion')}
              className={`btn-var-2 w-inline-block w-tab-link ${activeTab === 'legislacion' ? 'w--current' : ''}`}
            >
              <div>Legislación</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('diario_de_debates')}
              className={`btn-var-2 w-inline-block w-tab-link ${activeTab === 'diario_de_debates' ? 'w--current' : ''}`}
            >
              <div className="text-block-11">Diario de Debates</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Minuta del Congreso')}
              className={`btn-var-2 w-inline-block w-tab-link ${activeTab === 'Minuta del Congreso' ? 'w--current' : ''}`}
            >
              <div className="text-block-10">Minuta del Congreso</div>
            </button>
          </div>

          <div className="tabs-content w-tab-content">
            {activeTab === 'Gaceta' && (
              <div data-w-tab="Gaceta" className="w-tab-pane w--tab-active">
                <div className="titulo-tab">
                  <h2>Gaceta Parlamentaria</h2>
                  <div>Conoce más sobre lo que ocurre cada semana en la cámara de diputados</div>
                </div>
                <div className="w-layout-grid grid-4">
                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>

                  <div className="gaceta">
                    <img
                      sizes="(max-width: 1004px) 100vw, 1004px, 100vw"
                      srcSet="images/gaceta-example-4-p-500.jpeg 500w, images/gaceta-example-4-p-800.jpeg 800w, images/gaceta-example-4.jpeg 1004w"
                      alt=""
                      src="images/gaceta-example-4.jpeg"
                      loading="lazy"
                    />
                    <h4>Numero de Gaceta</h4>
                    <div>Fecha de publicación</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'legislacion' && (
              <div data-w-tab="legislacion" className="w-tab-pane w--tab-active">
                <div className="titulo-tab">
                  <h2>Recursos Documentales de la Legislación</h2>
                  <div>
                    Aqui necesito un subtitulo, para explicarle al ciudadano que puede encontrar en esta sección
                  </div>
                </div>
                <ul role="list" className="list-legislacion-documentos">
                  <li>
                    <div className="div-block-30">
                      <h4>[Titulo del documento]</h4>
                      <a href="#" className="btn-var-2 w-button">
                        Descargar Documento
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="div-block-30">
                      <h4>[Titulo del documento]</h4>
                      <a href="#" className="btn-var-2 w-button">
                        Descargar Documento
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="div-block-30">
                      <h4>[Titulo del documento]</h4>
                      <a href="#" className="btn-var-2 w-button">
                        Descargar Documento
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'diario_de_debates' && (
              <div data-w-tab="diario_de_debates" className="w-tab-pane w--tab-active">
                <div className="titulo-tab">
                  <h2>Recursos Documentales de la Legislación</h2>
                  <div>
                    Aqui necesito un subtitulo para explicarle al ciudadano que puede encontrar en esta sección
                  </div>
                </div>
                <div>
                  <div className="w-layout-grid grid-13">
                    <div className="div-block-45">
                      <h4>Tomo I</h4>
                      <p className="paragraph-13">
                        04 de Septiembre 2024
                        <br />
                        05 de Septiembre 2024
                        <br />
                        05 de Septiembre 2024
                        <br />
                        12 de Septiembre 2024
                        <br />
                        19 de Septiembre 2024
                        <br />
                        26 de Septiembre 2024
                        <br />
                        08 de Octubre 2024
                        <br />
                        09 de Octubre 2024
                        <br />
                        10 de Octubre 2024
                        <br />
                        10 de Octubre 2024
                        <br />
                        14 de Octubre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo II</h4>
                      <p className="paragraph-13">22 de Octubre 2024</p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo III</h4>
                      <p className="paragraph-13">22 de Octubre 2024</p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo III</h4>
                      <p className="paragraph-13">22 de Octubre 2024</p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo IV</h4>
                      <p className="paragraph-13">
                        22 de Octubre 2024
                        <br />
                        29 de Octubre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo V</h4>
                      <p className="paragraph-13">
                        31 de Octubre 2024
                        <br />
                        05 de Noviembre 2024
                        <br />
                        12 de Noviembre 2024
                        <br />
                        12 de Noviembre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo VI</h4>
                      <p className="paragraph-13">
                        19 de Noviembre 2024
                        <br />
                        25 de Noviembre 2024
                        <br />
                        28 de Noviembre 2024
                        <br />
                        03 de Diciembre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo VII</h4>
                      <p className="paragraph-13">
                        05 de Diciembre 20241
                        <br />0 de Diciembre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo VIII</h4>
                      <p className="paragraph-13">
                        05 de Diciembre 20241
                        <br />0 de Diciembre 2024
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo VIII</h4>
                      <p className="paragraph-13">
                        19 de Diciembre 2024
                        <br />
                        19 de Diciembre 2024
                        <br />
                        06 de Enero de 2025
                        <br />
                        10 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        20 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        06 de Febrero de 2025
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo XI</h4>
                      <p className="paragraph-13">
                        12 de Febrero de 2025
                        <br />
                        19 de Febrero de 2025
                        <br />
                        27 de Febrero de 2025
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>

                    <div className="div-block-45">
                      <h4>Tomo VIII</h4>
                      <p className="paragraph-13">
                        19 de Diciembre 2024
                        <br />
                        19 de Diciembre 2024
                        <br />
                        06 de Enero de 2025
                        <br />
                        10 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        14 de Enero de 2025
                        <br />
                        20 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        31 de Enero de 2025
                        <br />
                        06 de Febrero de 2025
                      </p>
                      <a href="#" className="btn-black-str w-button">
                        Descargar PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Minuta del Congreso' && (
              <div data-w-tab="Minuta del Congreso" className="w-tab-pane w--tab-active">
                <div className="titulo-tab">
                  <h2>Minutas del Congreso</h2>
                  <div>Conoce más sobre lo que ocurre cada semana en la cámara de diputados</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}