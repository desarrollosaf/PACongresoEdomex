import Link from "next/link";
import DiputadoHomeSection from "@/components/DiputadoHomeSection";
import { getDiputados2, getComunicadosHome } from "@/app/service/diputados.api";
import BoletinesHomeSection from "@/components/BoletinesHomeSection";
import { getBoletines } from '@/app/service/boletines.api';
import { getBannersHome } from '@/app/service/banners.api';
import AgendaHomeSection from "@/components/AgendaHomeSections";
import { getAgendaHome, getSesionReciente } from "@/app/service/agenda.api";
import BannersHomeSection from "@/components/BannersHomeSections";
import SearchForm from "@/components/SearchForm";
import { getEstadisticasHome } from "./service/estadisticas.api";
import EstadisticasHomeSection from "@/components/EstadisticasHomeSections";
import VideoBackground from "@/components/VideoBackground";

export default async function Home() {
  const boletines = await getBoletines();
  const mainBoletines = boletines && boletines.length >= 5 ? boletines : null;
  const diputados = await getDiputados2();
  const comunicados = await getComunicadosHome();
  const { agendas, transmision } = await getAgendaHome();
  const sesionUltima = await getSesionReciente();
  const banners = await getBannersHome();
  const estadisticas = await getEstadisticasHome();

  return (
    <>
      <section className="section-3">
        <div className="code-embed w-embed w-iframe" style={{ width: "100%", height: "100%" }}>
          <VideoBackground />
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

      <AgendaHomeSection agenda={agendas}  ultimaSesion={sesionUltima?.[0]} transmision={transmision} />

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
