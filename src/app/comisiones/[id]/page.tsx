import { getComisionById } from "@/app/service/comisiones.api";

export const dynamic = "force-dynamic";

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
  const partido = item.integranteLegis?.partido; // ← aquí está el partido

  const nombre = [diputado?.nombres, diputado?.apaterno, diputado?.amaterno]
    .filter(Boolean)
    .join(" ");

  const cargo = item.tipo_cargo?.valor ?? "Sin cargo";
  const foto = diputado?.fotos?.[0]?.path;
  const colorClass = getPartidoColor(partido?.siglas); // ← usamos siglas, no nombre

  return (
    <div className="miembro-card-jucopo">
      <img
        src={
          foto
            ? `https://congresoedomex.gob.mx/${foto}`
            : "/images/default-user.png"
        }
        alt={nombre || "Diputado"}
        className={`img-jucopo ${colorClass}`}
      />
      <div className="cuerpo-info-jucopo">
        <h3 className="nombre-jucopo">{nombre || "Sin nombre"}</h3>
        <div className="texto-centrado">{cargo}</div>
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comision = await getComisionById(id);

  if (!comision) {
    return <p>No se encontró la comisión</p>;
  }

  const integrantes: any[] = comision.integrantes ?? [];

  const primeraFila = integrantes
    .filter((item) => {
      const cargo = item.tipo_cargo?.valor?.toLowerCase() ?? "";
      return CARGOS_PRIMERA_FILA.some((k) => cargo.includes(k));
    })
    .sort((a, b) => {
      const cA = a.tipo_cargo?.valor ?? "";
      const cB = b.tipo_cargo?.valor ?? "";
      return getCargoPrioridad(cA) - getCargoPrioridad(cB);
    });

  const segundaFila = integrantes.filter((item) => {
    const cargo = item.tipo_cargo?.valor?.toLowerCase() ?? "";
    return !CARGOS_PRIMERA_FILA.some((k) => cargo.includes(k));
  });

  return (
    <section className="mesa-directiva max_width">
      <div className="div-block-52">
        <div className="div-block-53">
          <h1 className="titulo-centrado">Comisión</h1>
          <h2 className="titulo-centrado">
            {comision.alias || comision.nombre}
          </h2>
          {comision.descripcion && (
            <p className="subtitulo-info-centrado">{comision.descripcion}</p>
          )}
        </div>
      </div>

      <div className="cuerpo-jucopo">
        <h3 className="titulo-centrado">Integrantes</h3>

        <div className="bg-gradient-gris">
          {primeraFila.length > 0 && (
            <div className="w-layout-grid div-mesa-direciva">
              {primeraFila.map((item) => (
                <MiembroCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {segundaFila.length > 0 && (
            <div className="w-layout-grid div-mesa-direciva">
              {segundaFila.map((item) => (
                <MiembroCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
