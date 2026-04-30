import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mes = searchParams.get('mes');
  const anio = searchParams.get('anio');
  const page = searchParams.get('page') || '1';

  const queryParams = new URLSearchParams();
  if (mes) queryParams.append('mes', mes);
  if (anio) queryParams.append('anio', anio);
  queryParams.append('page', page);

  try {
    const response = await fetch(`https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/getordenes?${queryParams.toString()}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy /api/ordenes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
