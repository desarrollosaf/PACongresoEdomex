// app/api/votaciones/[id]/route.ts

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const res = await fetch(
      `https://parlamentario.congresoedomex.gob.mx/backend/api/estadistico/getvotospunto/${id}`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      console.error('Error del backend externo:', res.status, await res.text())
      return Response.json({ error: 'Error del backend' }, { status: res.status })
    }

    const data = await res.json()
    return Response.json(data)

  } catch (error) {
    console.error('Error en route votaciones:', error)
    return Response.json({ error: 'Error interno' }, { status: 500 })
  }
}