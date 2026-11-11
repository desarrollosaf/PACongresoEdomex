// Número de anillos concéntricos del hemiciclo (R). Ajustar solo aquí.
const NUM_ANILLOS: number = 4;

// Unidad de referencia normalizada para expresar los radios como fracción
// de un ancho de diseño, independiente de las unidades finales del viewBox
// (que se calculan después a partir del radioX exterior real).
const ANCHO_DISENO = 1000;

// RadioX interior y exterior del hemiciclo (eje horizontal), como fracción
// de ANCHO_DISENO. El radioX de cada anillo se interpola linealmente entre
// ambos; el radioY de cada anillo se deriva de su radioX (ver abajo).
const FRACCION_RADIO_INTERIOR = 0.28;
const FRACCION_RADIO_EXTERIOR = 0.5;

// Factor de achatamiento: radioY = radioX × este factor, anillo por
// anillo. Menor que 1 hace el hemiciclo más ancho que alto (semielipse).
const FACTOR_ACHATAMIENTO = 0.62;

// Factor sobre el menor espaciado disponible (entre asientos vecinos o
// entre anillos en el eje Y) para obtener el radio de cada punto-asiento.
const FACTOR_RADIO_PUNTO = 0.252;

// Pasos de integración numérica para aproximar la longitud de arco de
// cada anillo elíptico. Más pasos = más precisión, con costo despreciable
// para R=4 anillos.
const PASOS_INTEGRACION_ARCO = 720;

interface GrupoParlamentario {
    id: string;
    nombre: string;
    color: string;
    diputados: number;
}

interface DiagramaParlamentarioProps {
    grupos: GrupoParlamentario[];
}

// Reparte `total` asientos entre anillos proporcionalmente a un peso por
// anillo (aproximación de su longitud de arco). Redondea cada anillo y
// ajusta la diferencia sobrante en el anillo exterior (último del
// arreglo) para que la suma dé exactamente `total`.
function repartirAsientosPorAnillo(total: number, pesos: number[]): number[] {
    const sumaPesos = pesos.reduce((acc, p) => acc + p, 0);
    const asientosPorAnillo = pesos.map((p) => Math.round((total * p) / sumaPesos));
    const sumaRedondeada = asientosPorAnillo.reduce((acc, v) => acc + v, 0);
    asientosPorAnillo[asientosPorAnillo.length - 1] += total - sumaRedondeada;
    return asientosPorAnillo;
}

interface TablaArco {
    thetas: number[];
    acumulada: number[];
    total: number;
}

// Longitud de arco acumulada de una semielipse (radioX, radioY) muestreada
// en `pasos` segmentos entre 0 y π, vía integración numérica del punto
// medio: ds/dθ = √((radioX·sinθ)² + (radioY·cosθ)²).
function construirTablaArco(radioX: number, radioY: number, pasos: number): TablaArco {
    const thetas = Array.from({ length: pasos + 1 }, (_, k) => (k / pasos) * Math.PI);
    const acumulada = [0];
    for (let k = 1; k <= pasos; k++) {
        const t0 = thetas[k - 1];
        const t1 = thetas[k];
        const tm = (t0 + t1) / 2;
        const ds = Math.sqrt((radioX * Math.sin(tm)) ** 2 + (radioY * Math.cos(tm)) ** 2) * (t1 - t0);
        acumulada.push(acumulada[k - 1] + ds);
    }
    return { thetas, acumulada, total: acumulada[pasos] };
}

// Ángulos (en radianes, de 180° a 0°) de los `n` asientos de un anillo
// elíptico, espaciados a longitud de arco igual (no a ángulo igual). En
// una elipse achatada, ángulos iguales amontonan los puntos cerca de los
// extremos horizontales y los separan arriba; repartir por longitud de
// arco corrige esa distorsión y deja el espaciado visualmente parejo.
// Con un solo asiento, va al centro (90°).
function angulosPorArcoUniforme(radioX: number, radioY: number, n: number): number[] {
    if (n <= 0) return [];
    if (n === 1) return [Math.PI / 2];

    const { thetas, acumulada, total } = construirTablaArco(radioX, radioY, PASOS_INTEGRACION_ARCO);

    const thetaEnLongitud = (objetivo: number): number => {
        let lo = 0;
        let hi = PASOS_INTEGRACION_ARCO;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (acumulada[mid] < objetivo) lo = mid + 1;
            else hi = mid;
        }
        if (lo === 0) return thetas[0];
        const s0 = acumulada[lo - 1];
        const s1 = acumulada[lo];
        const t = s1 === s0 ? 0 : (objetivo - s0) / (s1 - s0);
        return thetas[lo - 1] + t * (thetas[lo] - thetas[lo - 1]);
    };

    // i=0 -> 100% del arco medido desde la izquierda (θ=π); i=n-1 -> 0% (θ=0).
    return Array.from({ length: n }, (_, i) => thetaEnLongitud((1 - i / (n - 1)) * total));
}

export default function DiagramaParlamentario({ grupos }: DiagramaParlamentarioProps) {
    const gruposConDiputados = grupos.filter((g) => g.diputados > 0);
    const total = gruposConDiputados.reduce((acc, g) => acc + g.diputados, 0);

    const detalle = gruposConDiputados.map((g) => `${g.nombre}: ${g.diputados}`).join(', ');
    const ariaLabel = `Composición de la Legislatura: ${total} diputados. ${detalle}.`;

    const radioXInterior = ANCHO_DISENO * FRACCION_RADIO_INTERIOR;
    const radioXExterior = ANCHO_DISENO * FRACCION_RADIO_EXTERIOR;
    const radiosX = Array.from({ length: NUM_ANILLOS }, (_, i) =>
        NUM_ANILLOS === 1
            ? radioXExterior
            : radioXInterior + (i * (radioXExterior - radioXInterior)) / (NUM_ANILLOS - 1)
    );
    const radiosY = radiosX.map((radioX) => radioX * FACTOR_ACHATAMIENTO);
    const radioYInterior = radiosY[0];
    const radioYExterior = radiosY[radiosY.length - 1];

    // Peso por anillo para el reparto de asientos: la longitud de arco de
    // una elipse no es proporcional a un solo radio como en un círculo, así
    // que se aproxima con el promedio de radioX y radioY de cada anillo.
    const pesosPorAnillo = radiosX.map((radioX, i) => (radioX + radiosY[i]) / 2);
    const asientosPorAnillo = total > 0 ? repartirAsientosPorAnillo(total, pesosPorAnillo) : radiosX.map(() => 0);

    // Lista completa de posiciones (de todos los anillos mezclados) ordenada
    // por ángulo descendente, 180° -> 0°: un único barrido de extremo a
    // extremo del hemiciclo, sin agrupar por anillo.
    const posiciones = radiosX
        .flatMap((radioX, i) =>
            angulosPorArcoUniforme(radioX, radiosY[i], asientosPorAnillo[i]).map((angulo) => ({
                radioX,
                radioY: radiosY[i],
                angulo,
            }))
        )
        .sort((a, b) => b.angulo - a.angulo);

    // Se asignan los diputados en el orden del arreglo `grupos` sobre ese
    // barrido: cada bancada consume un tramo continuo de la lista ya
    // ordenada por ángulo, así que ocupa una única cuña contigua real.
    const colorPorAsiento = gruposConDiputados.flatMap((g) => Array<string>(g.diputados).fill(g.color));

    // Radio del punto: la separación entre asientos vecinos del anillo más
    // poblado (longitud de arco entre ellos, ya pareja por construcción)
    // frente a la separación entre anillos en el eje Y —la más apretada,
    // por el achatamiento—; se toma la menor y se reduce con
    // FACTOR_RADIO_PUNTO para dejar aire.
    const indiceAnilloMasPoblado = asientosPorAnillo.reduce(
        (mejor, n, i) => (n > asientosPorAnillo[mejor] ? i : mejor),
        0
    );
    const nMasPoblado = asientosPorAnillo[indiceAnilloMasPoblado];
    const longitudArcoMasPoblado = construirTablaArco(
        radiosX[indiceAnilloMasPoblado],
        radiosY[indiceAnilloMasPoblado],
        PASOS_INTEGRACION_ARCO
    ).total;
    const separacionEntreAsientos = nMasPoblado > 1 ? longitudArcoMasPoblado / (nMasPoblado - 1) : Infinity;
    const separacionRadialY =
        NUM_ANILLOS > 1 ? (radioYExterior - radioYInterior) / (NUM_ANILLOS - 1) : radioYExterior;
    const radioPunto = total > 0 ? Math.min(separacionEntreAsientos, separacionRadialY) * FACTOR_RADIO_PUNTO : 0;

    // El viewBox es exactamente el bounding box de la semielipse (radioX
    // exterior de ancho, radioY exterior de alto) más el margen de un
    // radio de punto en cada lado, para que el dibujo llene el SVG sin
    // espacio muerto. El centro (compartido por todos los anillos) queda a
    // un radio de punto del borde superior y del inferior.
    const anchoViewBox = 2 * radioXExterior + 2 * radioPunto;
    const altoViewBox = radioYExterior + 2 * radioPunto;
    const centroX = anchoViewBox / 2;
    const centroY = radioYExterior + radioPunto;

    return (
        <figure className="w-full">
            <svg
                viewBox={`0 0 ${anchoViewBox} ${altoViewBox}`}
                preserveAspectRatio="xMidYMid meet"
                width="100%"
                height="auto"
                role="img"
                aria-label={ariaLabel}
            >
                {posiciones.map(({ radioX, radioY, angulo }, i) => (
                    <circle
                        key={i}
                        aria-hidden="true"
                        cx={centroX + radioX * Math.cos(angulo)}
                        cy={centroY - radioY * Math.sin(angulo)}
                        r={radioPunto}
                        fill={colorPorAsiento[i]}
                    />
                ))}
            </svg>
        </figure>
    );
}
