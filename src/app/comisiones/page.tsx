"use client";

import { useState, useEffect } from "react";
import { getComisiones } from "../service/comisiones.api";

export default function ComisionesPage() {
  const [data, setData] = useState<any>({});
  const [search, setSearch] = useState("");

  const tiposOrdenados = [
    "Comisiones Legislativas",
    "Comisiones Especiales",
    "Comisiones y Comités Permanentes",
  ];

  useEffect(() => {
    getComisiones().then(setData);
  }, []);
  return (
    <section className="max_width">
      <div>
        <h1 className="titulo-centrado">Comisiones y Comites</h1>
        <p className="subtitulo-info-centrado">
          Las comisiones y comités son los órganos de trabajo donde se analizan,
          dictaminan y dan seguimiento a los asuntos legislativos del Congreso.
        </p>
      </div>

      <div className="hero-img-comisiones">
        <div className="columns-19 w-row">
          <div className="column-24 w-col w-col-6">
            <h2 className="numero-de-cc">45</h2>
            <div className="text-centrado-cc">Comisiones</div>
          </div>
          <div className="column-25 w-col w-col-6">
            <h2 className="numero-de-cc">5</h2>
            <div className="text-centrado-cc">Comités</div>
          </div>
        </div>
      </div>

      <div className="div-block-56">
        <h3 className="titulo-centrado">Comisiones Legislativas</h3>

        <form className="search w-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="field-label">
            Encuentra de manera fácil y rápida la información que necesitas.
          </label>

          <div className="div-block-3">
            <input
              className="search-input-3 w-input"
              maxLength={256}
              placeholder="Buscar"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button" className="search-button-3 w-button">
              Buscar
            </button>
          </div>
        </form>
        {tiposOrdenados.map((tipo) => {
          const lista = data[tipo];

          if (!lista || lista.length === 0) return null;

          const listaFiltrada = lista.filter((item: any) => {
            const texto = `${item.nombre} ${item.alias}`.toLowerCase();
            return texto.includes(search.toLowerCase());
          });

          return (
            <div key={tipo}>
              <h3 className="titulo-centrado">{tipo}</h3>

              <div className="w-layout-grid grid-comisionesycomitespermanentes">
                {listaFiltrada.map((item: any) => {
                  // 🔍 Buscar al presidente
                  const presidente = item.integrantes?.find((i: any) =>
                    i.tipo_cargo?.valor?.toLowerCase().includes("presiden"),
                  );

                  // 🧠 Armar nombre completo
                  const nombrePresidente = presidente
                    ? `${presidente.integrante_legislatura?.diputado?.nombres} ${presidente.integrante_legislatura?.diputado?.apaterno} ${presidente.integrante_legislatura?.diputado?.amaterno}`
                    : "Sin presidencia";

                  return (
                    <div key={item.id} className="div-block-55">
                      <h3 className="titulo-centrado-peque-o">
                        {(item.alias || item.nombre)?.replace(/\n/g, " ")}
                      </h3>

                      {/* ✅ AQUÍ ya se imprime dinámico */}
                      <div className="texto-presidente-cc">
                        Presidencia: {nombrePresidente}
                      </div>

                      <a
                        href={`/comision/${item.id}`}
                        className="btn-var-2 w-button"
                      >
                        Acceder
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="div-block-2"></div>
      </div>
    </section>
  );
}
