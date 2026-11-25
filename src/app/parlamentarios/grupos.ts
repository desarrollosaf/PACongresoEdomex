export const BASE_URL = 'https://sistema.congresoedomex.gob.mx/';

export type Partido = {
    siglas: string;
    nombre: string;
    emblema?: string | null;
    rgb?: string | null;
};

type DiputadoConPartido = {
    integrantes?: { partido?: Partido | null }[];
};

type PartidoVisual = {
    id: string;
    nombre: string;
    clase: string;
    logo: string;
    color: string;
    srcSet?: string;
    sizes?: string;
};

export type GrupoParlamentario = PartidoVisual & {
    total: number;
    porcentaje: string;
};

export const COLOR_SIN_PARTIDO = '#454545';

// Solo presentación (logo, color, botón). Los totales salen de los diputados activos.
const PARTIDOS: PartidoVisual[] = [
    { id: 'morena', nombre: 'Morena', clase: '', color: '#9b2d25', logo: 'images/morena.png', srcSet: 'images/morena-p-500.png 500w, images/morena.png 839w', sizes: '(max-width: 839px) 100vw, 839px' },
    { id: 'pvem', nombre: 'PVEM', clase: 'btn-pvem', color: '#7aae52', logo: 'images/PVEM.png', srcSet: 'images/PVEM-p-500.png 500w, images/PVEM-p-800.png 800w, images/PVEM.png 852w', sizes: '(max-width: 852px) 100vw, 852px' },
    { id: 'pt', nombre: 'PT', clase: 'btn-pt', color: '#9b1010', logo: 'images/PT.png', srcSet: 'images/PT-p-500.png 500w, images/PT.png 852w', sizes: '(max-width: 852px) 100vw, 852px' },
    { id: 'pri', nombre: 'PRI', clase: 'btn-pri', color: '#ce1b28', logo: 'images/PRI.png', srcSet: 'images/PRI-p-500.png 500w, images/PRI-p-800.png 800w, images/PRI.png 825w', sizes: '(max-width: 825px) 100vw, 825px' },
    { id: 'pan', nombre: 'PAN', clase: 'btn-pan', color: '#233ea2', logo: 'images/Pan.png', srcSet: 'images/Pan-p-500.png 500w, images/Pan.png 840w', sizes: '(max-width: 840px) 100vw, 840px' },
    { id: 'mc', nombre: 'MC', clase: 'btn-mc', color: '#d68128', logo: 'images/MC.png', srcSet: 'images/MC-p-500.png 500w, images/MC.png 799w', sizes: '(max-width: 799px) 100vw, 799px' },
    { id: 'prd', nombre: 'PRD', clase: 'btn-prd', color: '#eec730', logo: 'images/PRD.png', srcSet: 'images/PRD-p-500.png 500w, images/PRD.png 775w', sizes: '(max-width: 775px) 100vw, 775px' },
];

export function getPartidoId(diputado: DiputadoConPartido): string {
    return diputado.integrantes?.[0]?.partido?.siglas?.trim().toLowerCase() ?? '';
}

function formatPorcentaje(parte: number, total: number): string {
    return `${Number(((parte / total) * 100).toFixed(1))}%`;
}

// Partido que existe en la base pero no tiene logo/color definido en PARTIDOS.
function partidoDesdeBase(id: string, partido: Partido): PartidoVisual {
    return {
        id,
        nombre: partido.siglas.trim(),
        clase: '',
        color: partido.rgb ? `rgb(${partido.rgb})` : COLOR_SIN_PARTIDO,
        logo: partido.emblema ? `${BASE_URL}${partido.emblema}` : '',
    };
}

export function getGruposParlamentarios(diputados: DiputadoConPartido[]) {
    const conteo = new Map<string, { total: number; partido: Partido }>();
    let sinPartido = 0;

    for (const diputado of diputados) {
        const id = getPartidoId(diputado);
        const partido = diputado.integrantes?.[0]?.partido;
        if (!id || !partido) {
            sinPartido++;
            continue;
        }
        const actual = conteo.get(id);
        if (actual) actual.total++;
        else conteo.set(id, { total: 1, partido });
    }

    // Si la API falla no hay datos: se conservan los partidos, sin cifras.
    if (diputados.length === 0) {
        return {
            grupos: PARTIDOS.map((p): GrupoParlamentario => ({ ...p, total: 0, porcentaje: '' })),
            sinPartido: 0,
        };
    }

    const orden = (id: string) => {
        const i = PARTIDOS.findIndex((p) => p.id === id);
        return i === -1 ? PARTIDOS.length : i;
    };

    const grupos = Array.from(conteo, ([id, { total, partido }]): GrupoParlamentario => ({
        ...(PARTIDOS.find((p) => p.id === id) ?? partidoDesdeBase(id, partido)),
        total,
        porcentaje: formatPorcentaje(total, diputados.length),
    })).sort((a, b) => b.total - a.total || orden(a.id) - orden(b.id));

    return { grupos, sinPartido };
}
