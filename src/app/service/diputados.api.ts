
function getApiUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || 'http://localhost:4000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

export async function getDiputados() {
  try {
    const data = await fetch(`${getApiUrl()}/api/diputados`, {



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

    const res = await fetch(`${getApiUrl()}/api/diputados/${id}/perfil`, {

      cache: 'no-store'
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {
    console.error('Error de red en getDiputadoPerfil:', error);
    return null;
  }
}

export async function getDiputadosHome() {
  try {

    const res = await fetch(`${getApiUrl()}/api/diputados`, { next: { revalidate: 60 } });

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

    const res = await fetch(`${getApiUrl()}/api/comunicados`, { next: { revalidate: 60 } });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getAllComunicadosFromProfiles(arrDiputados: any[]) {
  try {
    const extractedComunicados: any[] = [];
    const apiUrl = getApiUrl();
    
    // Chunking de 10 en 10 para evitar rechazos del servidor (ECONNRESET o fallos de fetch)
    const chunkSize = 10;
    for (let i = 0; i < arrDiputados.length; i += chunkSize) {
      const chunk = arrDiputados.slice(i, i + chunkSize);
      
      const chunkPromises = chunk.map((d: any) => 
        fetch(`${apiUrl}/api/diputados/${d.id}/perfil`, { next: { revalidate: 60 } })
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
      );
      
      const chunkProfiles = await Promise.all(chunkPromises);
      
      chunkProfiles.forEach(profile => {
        if (profile?.integrantes?.[0]?.autores_comunicados) {
          profile.integrantes[0].autores_comunicados.forEach((ac: any) => {
            if (ac.comunicado && ac.comunicado.id) {
              extractedComunicados.push(ac.comunicado);
            }
          });
        }
      });
    }

    const uniqueMap = new Map();
    extractedComunicados.forEach(c => uniqueMap.set(c.id, c));
    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error('Error extrayendo comunicados completos:', error);
    return [];
  }
}
