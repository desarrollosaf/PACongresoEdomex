import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id requerido' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/getordendia?id=${id}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy /api/orden-dia:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
