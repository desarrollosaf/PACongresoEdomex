'use client';
import { useState, useEffect } from 'react';
import ComunicadosSection from "./ComunicadosSection";
import { getBoletinesAll } from '../service/comunicados.api';

export const dynamic = 'force-dynamic';

export default function ComunicadosPage() {
    
    const [paginaActual, setPaginaActual] = useState(1);
    const [boletines, setBoletines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const totalPaginas = Math.ceil(total / 12);
     useEffect(() => {
        const fetchData = async () => {
            setBoletines([]);
            setLoading(true);
            const data = await getBoletinesAll(paginaActual);
           setTimeout(() => {
            setBoletines(data.rows);
            setTotal(data.count);
            setLoading(false);
        }, 400);
    }
        fetchData();
    }, [paginaActual]); 

    const getPaginas = () => {
        const paginas = [];

        const inicio = Math.max(1, paginaActual - 1);
        const fin = Math.min(totalPaginas, paginaActual + 1);

        // Siempre mostrar primera
        paginas.push(1);

        // Puntos suspensivos antes
        if (inicio > 2) {
            paginas.push('...');
        }

        // Páginas cercanas
        for (let i = inicio; i <= fin; i++) {
            if (i !== 1 && i !== totalPaginas) {
                paginas.push(i);
            }
        }

        // Puntos suspensivos después
        if (fin < totalPaginas - 1) {
            paginas.push('...');
        }

        // Siempre mostrar última
        if (totalPaginas > 1) {
            paginas.push(totalPaginas);
        }

        return paginas;
    };
    
    return (
        <div>
            <ComunicadosSection boletines = { boletines } loading={ loading }></ComunicadosSection>
                <div className="ini-paginacion">
                    {getPaginas().map((item, index) => (
                        <span
                            key={index}
                            onClick={() => typeof item === 'number' && setPaginaActual(item)}
                            style={{
                                margin: '20px',
                                cursor: item === '...' ? 'default' : 'pointer',
                                fontWeight: item === paginaActual ? 'bold' : 'normal'
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
        </div>
    );
}