export async function getComisiones() {
  const data = await fetch("http://localhost:4000/api/comisiones", {
    cache: "no-store",
  });
  return data.json();
}