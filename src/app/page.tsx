import Link from "next/link";
import DiputadoHomeSection from "@/components/DiputadoHomeSection";
import { getDiputadosHome, getComunicadosHome } from "@/app/service/diputados.api";
import BoletinesHomeSection from "@/components/BoletinesHomeSection";
import { getBoletines } from '@/app/service/boletines.api';
import { getBannersHome } from '@/app/service/banners.api';
import AgendaHomeSection from "@/components/AgendaHomeSections";
import { getAgendaHome } from "@/app/service/agenda.api";
import BannersHomeSection from "@/components/BannersHomeSections";
import SearchForm from "@/components/SearchForm";
import { getEstadisticasHome } from "./service/estadisticas.api";
import EstadisticasHomeSection from "@/components/EstadisticasHomeSections";

export default async function Home() {
  const boletines = await getBoletines();
  const mainBoletines = boletines && boletines.length >= 5 ? boletines : null;
  const diputados = await getDiputadosHome();
  const comunicados = await getComunicadosHome();
  const agenda = await getAgendaHome();
  const banners = await getBannersHome();
  const estadisticas = await getEstadisticasHome();

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
          <SearchForm />
        </div>
      </section>
      
      <section className="numeralia max_width">
        <div className="div-block-4">
          <h1 className="heading-2 titulo-seccion">Legislatura LXII</h1>
          <p className="paragraph-2">Nuestros logros hablan del compromiso con el que legislamos</p>
        </div>
        <div>
          <EstadisticasHomeSection estadisticas= { estadisticas }></EstadisticasHomeSection>
      
        </div>
      </section>
      <DiputadoHomeSection diputados={diputados} />

      <AgendaHomeSection agenda={agenda} />

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
          <BannersHomeSection banners = { banners }></BannersHomeSection>
        </div>
      </section>
    </>
  );
}
