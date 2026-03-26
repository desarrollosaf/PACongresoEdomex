export async function getComisiones() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comisiones`, {
    cache: "no-store",
  });
  return data.json();
}

export async function getComisionById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comisiones/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}