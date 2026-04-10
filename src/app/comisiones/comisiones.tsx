"use client";

import { useState, useEffect } from "react";
import { getComisiones } from "../service/comisiones.api";


function normalizar(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}



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

                if (listaFiltrada.length === 0) return null;

                return (
                    <div key={tipo}>
                        <h3 className="comision-seccion-titulo">{tipo}</h3>

                        <div className="w-layout-grid grid-comisionesycomitespermanentes">
                            {listaFiltrada.map((item: any) => {
                                    const presidente = item.integrantes?.find((i: any) =>
                                        i.tipo_cargo?.valor === "Presidencia"
                                    );
                                    const diputado = presidente?.integranteLegis?.diputado;
                                    const nombrePresidente = diputado
                                        ? [diputado.nombres, diputado.apaterno, diputado.amaterno]
                                            .filter(Boolean)
                                            .join(" ")
                                        : "Sin presidencia asignada";

                                return (
                                    <div key={item.id} className="comision-card">

                                        <div className="comision-card-top">
                                         
                                            <h3 className="comision-card-nombre">
                                                {item.nombre?.replace(/\n/g, " ")}
                                            </h3>
                                        </div>

                                        <div className="comision-card-presidencia">
                                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                            <div className="comision-presidencia-texto">
                                                <span className="comision-presidencia-label">Presidencia</span>
                                                <span className="comision-presidencia-nombre">{nombrePresidente}</span>
                                            </div>
                                        </div>

                                        <a href={`/comisiones/${item.id}`} className="comision-card-btn">
                                            Ver comisión →
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