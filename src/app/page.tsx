import Link from "next/link";
import DiputadoHomeSection from "@/components/DiputadoHomeSection";
import { getDiputadosHome, getComunicadosHome } from "@/app/service/diputados.api";
import BoletinesHomeSection from "@/components/BoletinesHomeSection";


async function getBoletines() {
  try {
    const res = await fetch('http://localhost:4000/api/boletines', { next: { revalidate: 10 } });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletines:", error);
    return [];
  }
}

export default async function Home() {
  const boletines = await getBoletines();
  const mainBoletines = boletines && boletines.length >= 5 ? boletines : null;
  const diputados = await getDiputadosHome();
  const comunicados = await getComunicadosHome();

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
      <DiputadoHomeSection diputados={diputados} />

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

      <BoletinesHomeSection mainBoletines = {mainBoletines}></BoletinesHomeSection>

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
