interface GrupoParlamentario {
    id: string;
    nombre: string;
    color: string;
    diputados: number;
}

interface DiagramaParlamentarioProps {
    grupos: GrupoParlamentario[];
}

export default function DiagramaParlamentario({ grupos }: DiagramaParlamentarioProps) {
    const gruposConDiputados = grupos.filter((g) => g.diputados > 0);
    const total = gruposConDiputados.reduce((acc, g) => acc + g.diputados, 0);

    const detalle = gruposConDiputados.map((g) => `${g.nombre}: ${g.diputados}`).join(', ');
    const ariaLabel = `Composición de la Legislatura: ${total} diputados. ${detalle}.`;

    return (
        <figure>
            <div className="flex flex-wrap justify-center gap-[0.6em]" role="img" aria-label={ariaLabel}>
                {gruposConDiputados.map((grupo) =>
                    Array.from({ length: grupo.diputados }, (_, i) => (
                        <span
                            key={`${grupo.id}-${i}`}
                            aria-hidden="true"
                            className="rounded-full shrink-0"
                            style={{
                                width: 'clamp(12px, 2.1vw, 26px)',
                                aspectRatio: '1',
                                backgroundColor: grupo.color,
                            }}
                        />
                    ))
                )}
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {gruposConDiputados.map((grupo) => (
                    <span key={grupo.id} className="inline-flex items-center gap-1.5">
                        <span
                            className="inline-block rounded-full shrink-0"
                            style={{ width: '0.8em', height: '0.8em', backgroundColor: grupo.color }}
                        />
                        {grupo.nombre}: <strong>{grupo.diputados}</strong>
                    </span>
                ))}
            </figcaption>
        </figure>
    );
}
