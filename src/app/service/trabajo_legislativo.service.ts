export async function getTrabajoLegislativo() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trabajo-legislativo`, {
    cache: "no-store",
  });
  return data.json();
}

export async function getOrdenes(mes?: string, anio?: string, page: number = 1) {
  const queryParams = new URLSearchParams();
  if (mes) queryParams.append('mes', mes);
  if (anio) queryParams.append('anio', anio);
  queryParams.append('page', page.toString());
  
  const data = await fetch(`/api/ordenes?${queryParams.toString()}`, {
    cache: "no-store",
  });
  return data.json();
}