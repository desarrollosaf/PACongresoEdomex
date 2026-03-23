export async function getDiputados() {
  const data = await fetch("http://localhost:4000/api/diputados", {
    cache: "no-store",
  });
  return data.json();
}

export async function getDiputadoPerfil(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/diputados/${id}/perfil`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
