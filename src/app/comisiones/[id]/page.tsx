import {
  getComisionById,
  getIniciativasByComision,
  getEventosByComision,
} from "@/app/service/comisiones.api";
import ComisionPage from "./ComisionPage";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [comision, iniciativasData, eventosData] = await Promise.all([
    getComisionById(id),
    getIniciativasByComision(id),
    getEventosByComision(id),
  ]);

  if (!comision) {
    return <p>No se encontró la comisión</p>;
  }

  return (
    <ComisionPage
      comision={comision}
      iniciativas={iniciativasData?.data?.iniciativas ?? []}
      eventos={eventosData?.data?.eventos ?? []}
    />
  );
}
