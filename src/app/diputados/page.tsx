
import DiputadosList from './DiputadosList';
import ParliamentaryStats from './ParliamentaryStats';
import { getDiputados } from '../service/diputados.api';

export const dynamic = 'force-dynamic';

export default async function DiputadosPage() {
    const diputados = await getDiputados();

    return (
        <>
            <section className="diputados max_width">
                <div>
                    <h3 className="heading-3 titulo-seccion">Diputadas, diputados y diputades</h3>
                    <ParliamentaryStats /> 
                    {/* <div className="div-block-36">
                        <img src="images/grupo-parlamentario-2.png" loading="lazy" data-w-id="4c2d2cc0-c30a-59fa-a30f-abc8a3d779f4" sizes="(max-width: 1666px) 100vw, 1666px" alt="" srcSet="images/grupo-parlamentario-2-p-500.png 500w, images/grupo-parlamentario-2-p-800.png 800w, images/grupo-parlamentario-2-p-1080.png 1080w, images/grupo-parlamentario-2-p-1600.png 1600w, images/grupo-parlamentario-2.png 1666w" className="img-parlamentaria" />
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
                    </div> */}
                    <div className="div-block-26">
                        <a href="/parlamentarios" className="btn-var-2 w-button">Grupos Parlamentarios</a>
                        <a href="/mesa-directiva" className="btn-var-2 w-button">Mesa Directiva</a>
                        <a href="/junta-de-coordinacion-politica" className="btn-var-2 w-button">Junta de Coordinación Politica</a>
                        <a href="/comisiones" className="btn-var-2 w-button">Comisiones y Comités</a>
                    </div>
                </div>
            </section>
            <section className="max_width seccion-de-diputados">
                <DiputadosList diputados={diputados} />
            </section>
        </>
    );
}
