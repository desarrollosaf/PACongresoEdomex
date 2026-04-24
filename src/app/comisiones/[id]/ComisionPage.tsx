"use client";

import { useState } from "react";
import IniciativasComisionTab from "./IniciativasComisionTab";
import EventosComisionTab from "./EventosComisionTab";

type Tab = "integrantes" | "iniciativas" | "dictamenes" | "acuerdos" | "reuniones";

const partidoColorMap: Record<string, string> = {
  morena: "bg-morena",
  pri: "bg-pri",
  pan: "bg-pan",
  pt: "bg-pt",
  mc: "bg-mc",
  pvem: "bg-pvem",
  prd: "bg-prd",
};

function normalizar(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const ORDEN_CARGOS: Record<string, number> = {
  "presidencia": 1,
  "vicepresidencia": 2,
  "secretaria": 3,
  "prosecretaria": 4,
  "vocal": 5,
  "miembro": 6,
  "suplente": 7,
};

function getOrdenCargo(cargo: string): number {
  const c = normalizar(cargo);
  return ORDEN_CARGOS[c] ?? 99;
}

function getPartidoColor(siglas?: string): string {
  if (!siglas) return "bg-morena";
  const key = siglas.toLowerCase();
  for (const partido in partidoColorMap) {
    if (key.includes(partido)) return partidoColorMap[partido];
  }
  return "bg-morena";
}

function MiembroCard({ item }: { item: any }) {
  const diputado = item.integranteLegis?.diputado;
  const partido = item.integranteLegis?.partido;
  const nombre = [diputado?.nombres, diputado?.apaterno, diputado?.amaterno]
    .filter(Boolean)
    .join(" ");
  const cargo = item.tipo_cargo?.valor ?? "Sin cargo";
  const foto = diputado?.fotos?.[0]?.path;
  const colorClass = getPartidoColor(partido?.siglas);

  return (
    <div className="integrante-comision">
      <img
        src={foto ? `http:/127.0.0.1:8088/${foto}` : "/images/default-user.png"}
        alt={nombre || "Diputado"}
        className={`image-15 diputado-${partido?.siglas.toLowerCase()}`}
      />
      <div className="info-diputado-basica">
        <h4 className="nombre-cc-centrado">
          <strong>{nombre || "Sin nombre"}</strong>
        </h4>
        <div className="texto-comision">{cargo}</div>
      </div>
      <a href={`/perfil-diputado/${diputado.id}`} className="btn-var-2 w-button">
        Saber más
      </a>
    </div>
  );
}

export default function ComisionPage({
  comision,
  iniciativas,
  eventos,
}: {
  comision: any;
  iniciativas: any;
  eventos: any;
}) {
  const [tabActiva, setTabActiva] = useState<Tab>("integrantes");

  const integrantes: any[] = comision.integrantes ?? [];

  const integrantesOrdenados = [...integrantes].sort(
    (a, b) =>
      getOrdenCargo(a.tipo_cargo?.valor ?? "") -
      getOrdenCargo(b.tipo_cargo?.valor ?? "")
  );

  const tabs = [
    { key: "integrantes" as Tab, label: "Integrantes" },
    { key: "iniciativas" as Tab, label: "Iniciativas" },
    { key: "dictamenes" as Tab, label: "Dictámenes" },
    { key: "acuerdos" as Tab, label: "Acuerdos" },
    { key: "reuniones" as Tab, label: "Reuniones" },
  ];

  return (
    <section className="max_width">
      <div className="body_comites">
        <div className="columns-20 w-row">
          <div className="w-col w-col-6">
            <div className="descripcion_dato-izq">Comisión</div>
            <h1 className="titulo-seccion">
              {comision.nombre}
            </h1>
            {comision.descripcion && (
              <p className="texto-comunicado">{comision.descripcion}</p>
            )}
          </div>
          <div className="column-26 w-col w-col-6">
            <img
              src="/images/placeholder-foto.jpg"
              loading="lazy"
              alt=""
              className="img_cc-hero"
            />
          </div>
        </div>
      </div>

      <div className="body_comites">
        <div className="w-tabs">
          <div className="tabs-menu-3 w-tab-menu">
            {tabs.map((tab, i) => (
              <button
                key={tab.key}
                onClick={() => setTabActiva(tab.key)}
                className={[
                  i === 0 ? "tab-cc-1" : i === tabs.length - 1 ? "tab-final" : "tab-cc",
                  "w-inline-block w-tab-link",
                  tabActiva === tab.key ? "w--current" : "",
                ].join(" ")}
              >
                <div className="text-tab">{tab.label}</div>
              </button>
            ))}
          </div>

          <div className="w-tab-content">
            {tabActiva === "integrantes" && (
              <div className="w-tab-pane w--tab-active">
                <h1 className="titulo-seccion">Integrantes</h1>
                <div className="w-layout-grid grid-integrante-cc">
                  {integrantesOrdenados.map((item) => (
                    <MiembroCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
            {tabActiva === "iniciativas" && (
              <IniciativasComisionTab comisionId={comision?.id || 'comision'} serverIniciativas={iniciativas} />
            )}
            {tabActiva === "dictamenes" && (
              <div className="w-tab-pane w--tab-active">
                <h1 className="titulo-seccion">Dictámenes</h1>
              </div>
            )}
            {tabActiva === "acuerdos" && (
              <div className="w-tab-pane w--tab-active">
                <h1 className="titulo-seccion">Acuerdos</h1>
              </div>
            )}
            {tabActiva === "reuniones" && (
              <EventosComisionTab
                serverEventos={eventos}
                comisionPrincipal={comision?.nombre ?? ''}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}