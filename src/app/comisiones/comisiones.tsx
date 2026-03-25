"use client";

import { useState, useEffect } from "react";
import { getComisiones } from "../service/comisiones.api";

export default function Comisiones() {
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
    <>
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

          <button type="submit" className="search-button-3 w-button">
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
                const presidente = item.integrantes?.find((i: any) =>
                  i.tipo_cargo?.valor?.toLowerCase().includes("presiden"),
                );

                const nombrePresidente = presidente
                  ? `${presidente.integrante_legislatura?.diputado?.nombres} ${presidente.integrante_legislatura?.diputado?.apaterno} ${presidente.integrante_legislatura?.diputado?.amaterno}`
                  : "Sin presidencia";

                return (
                  <div key={item.id} className="div-block-55">
                    <h3 className="titulo-centrado-peque-o">
                      {(item.alias || item.nombre)?.replace(/\n/g, " ")}
                    </h3>

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
    </>
  );
}