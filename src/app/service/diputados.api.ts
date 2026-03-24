export async function getDiputados() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diputados`, {
    cache: "no-store",
  });
  return data.json();
}

export async function getDiputadoPerfil(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diputados/${id}/perfil`, {
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
