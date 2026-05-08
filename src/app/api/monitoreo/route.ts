import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/monitoreo?page=${page}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from backend' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy /api/monitoreo:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
