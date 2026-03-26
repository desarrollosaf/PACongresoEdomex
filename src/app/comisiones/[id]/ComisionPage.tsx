"use client";

import { useState } from "react";

type Tab = "integrantes" | "iniciativas" | "dictamenes" | "acuerdos";

const partidoColorMap: Record<string, string> = {
  morena: "bg-morena",
  pri: "bg-pri",
  pan: "bg-pan",
  pt: "bg-pt",
  mc: "bg-mc",
  pvem: "bg-pvem",
  prd: "bg-prd",
};

function getPartidoColor(siglas?: string): string {
  if (!siglas) return "bg-morena";
  const key = siglas.toLowerCase();
  for (const partido in partidoColorMap) {
    if (key.includes(partido)) return partidoColorMap[partido];
  }
  return "bg-morena";
}

const CARGOS_PRIMERA_FILA = [
  "presidencia",
  "vicepresidencia",
  "secretaría",
  "prosecretaría",
];

function getCargoPrioridad(cargo: string): number {
  const c = cargo.toLowerCase();
  const idx = CARGOS_PRIMERA_FILA.findIndex((k) => c.includes(k));
  return idx === -1 ? 99 : idx;
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
        src={
          foto
            ? `https://congresoedomex.gob.mx/${foto}`
            : "/images/default-user.png"
        }
        alt={nombre || "Diputado"}
        className={`img-integrantes-cc ${colorClass}`}
      />
      <div className="info-diputado-basica">
        <h4 className="nombre-cc-centrado">
          <strong>{nombre || "Sin nombre"}</strong>
        </h4>
        <div className="texto-comision">{cargo}</div>
      </div>
      <a
        href={`/perfil-diputado/${diputado.id}`}
        className="btn-var-2 w-button"
      >
        Saber más
      </a>
    </div>
  );
}

export default function ComisionPage({
  comision,
  iniciativas,
}: {
  comision: any;
  iniciativas: any;
}) {
  const [tabActiva, setTabActiva] = useState<Tab>("integrantes");

  const integrantes: any[] = comision.integrantes ?? [];

  const primeraFila = integrantes
    .filter((item) => {
      const cargo = item.tipo_cargo?.valor?.toLowerCase() ?? "";
      return CARGOS_PRIMERA_FILA.some((k) => cargo.includes(k));
    })
    .sort(
      (a, b) =>
        getCargoPrioridad(a.tipo_cargo?.valor ?? "") -
        getCargoPrioridad(b.tipo_cargo?.valor ?? ""),
    );

  const segundaFila = integrantes.filter((item) => {
    const cargo = item.tipo_cargo?.valor?.toLowerCase() ?? "";
    return !CARGOS_PRIMERA_FILA.some((k) => cargo.includes(k));
  });

  const tabs = [
    { key: "integrantes" as Tab, label: "Integrantes" },
    { key: "iniciativas" as Tab, label: "Iniciativas" },
    { key: "dictamenes" as Tab, label: "Dictámenes" },
    { key: "acuerdos" as Tab, label: "Acuerdos" },
  ];

  return (
    <section className="max_width">
      <div className="body_comites">
        <div className="columns-20 w-row">
          <div className="w-col w-col-6">
            <div className="descripcion_dato-izq">Comisión</div>
            <h1 className="titulo-seccion">
              {comision.alias || comision.nombre}
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
                  i === 0
                    ? "tab-cc-1"
                    : i === tabs.length - 1
                      ? "tab-final"
                      : "tab-cc",
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
                  {primeraFila.map((item) => (
                    <MiembroCard key={item.id} item={item} />
                  ))}
                  {segundaFila.map((item) => (
                    <MiembroCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
            {tabActiva === "iniciativas" && (
              <div className="w-tab-pane w--tab-active">
                {tabActiva === "iniciativas" && (
                  <div className="w-tab-pane w--tab-active">
                    <h1 className="titulo-seccion">Iniciativas</h1>
                    <div className="w-layout-grid grid-iniciativas">
                      {iniciativas.length === 0 && (
                        <p className="texto-comunicado">
                          No hay iniciativas registradas.
                        </p>
                      )}
                      {iniciativas.map((ini: any) => (
                        <div key={ini.id} className="div-iniciativas">
                          {/* Título */}
                          <div className="columnas-titulo-iniciativa w-row">
                            <div className="column-27 w-col w-col-3">
                              <img
                                src="/images/description_100dp_5F687F_FILL0_wght400_GRAD0_opsz48.png"
                                loading="lazy"
                                alt=""
                                className="img-btn-titulo"
                              />
                            </div>
                            <div className="w-col w-col-9">
                              <h3 className="titulo-iniciativa">
                                {/* {ini.iniciativa} */}
                              </h3>
                            </div>
                          </div>

                          {/* Materia */}
                          <p className="texto-iniciativas">{ini.materia}</p>

                          {/* Datos */}
                          <div className="w-layout-grid grid-iniciativa-1">
                            <div className="div-block-60">
                              <p className="titulo-dato-iniciativas">
                                Proponente
                              </p>
                              <strong>{ini.autor}</strong>
                            </div>
                            <div className="div-block-60">
                              <p className="titulo-dato-iniciativas">
                                Diputado
                              </p>
                              <span>{ini.diputado}</span>
                            </div>
                            <div className="div-block-60">
                              <p className="titulo-dato-iniciativas">
                                Presentación
                              </p>
                              <span>{ini.presentac}</span>
                            </div>
                          </div>

                          <div className="w-layout-grid grid-iniciativa-2">
                            <div className="div-block-60">
                              <p className="titulo-dato-iniciativas">
                                Comisión
                              </p>
                              <span>{ini.comisiones}</span>
                            </div>
                            <div className="div-block-60">
                              <p className="titulo-dato-iniciativas">Status</p>
                              <p className="texto-status-aprobada">
                                <strong>{ini.observac}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
