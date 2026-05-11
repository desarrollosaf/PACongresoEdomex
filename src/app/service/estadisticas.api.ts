export async function getEstadisticasHome() {
  try {
    const res = await fetch('https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/iniciativas/resumen');
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    return [];
  }
}

function getApiUrl() {
  if (typeof window === 'undefined') {
    return process.env.API_URL || 'http://localhost:4000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

export async function registrarVisita(ruta: string, sumar: boolean = true) {
  try {
    const res = await fetch(`${getApiUrl()}/api/estadisticas/visita`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruta, sumar }),
    });
    if (!res.ok) {
      throw new Error('Error al registrar visita');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en registrarVisita:', error);
    return null;
  }
}

export async function guardarEncuesta(ruta: string, calificacion: number, comentario?: string) {
  try {
    const res = await fetch(`${getApiUrl()}/api/estadisticas/encuesta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruta, calificacion, comentario }),
    });
    if (!res.ok) {
      throw new Error('Error enviando la encuesta');
    }
    return await res.json();
  } catch (error) {
    console.error('Error en guardarEncuesta:', error);
    return null;
  }
}

export async function guardarEncuestaDetallada(ruta: string, respuestas: { [key: string]: number }) {
  try {
    const res = await fetch(`${getApiUrl()}/api/estadisticas/encuesta-detallada`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruta, respuestas }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('SERVER ERROR TEXT:', errorText);
      throw new Error(`Error enviando la encuesta detallada: ${errorText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error en guardarEncuestaDetallada:', error);
    throw error; // Rethrow to let the UI component know it failed
  }
}
