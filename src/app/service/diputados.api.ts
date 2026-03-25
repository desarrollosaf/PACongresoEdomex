

export async function getDiputados() {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diputados`, {
      cache: "no-store",
    });
    if (!data.ok) {
      const text = await data.text();
      console.error('Error backend en getDiputados:', text);
      return [];
    }
    return await data.json();
  } catch (error) {
    console.error('Error de red en getDiputados:', error);
    return [];
  }
}

export async function getDiputadoPerfil(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/diputados/${id}/perfil`, {
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

export async function getDiputadosHome() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/diputados`, { next: { revalidate: 60 } });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend en getDiputadosHome:', text);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error de red en getDiputadosHome:', error);
    return [];
  }
}

export async function getComunicadosHome() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comunicados`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
