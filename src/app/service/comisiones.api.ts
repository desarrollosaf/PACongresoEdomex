export async function getComisiones() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comisiones`, {
    cache: "no-store",
  });
  return data.json();
}