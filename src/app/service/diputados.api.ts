export async function getDiputados() {
  const data = await fetch("http://localhost:4000/api/diputados", {
    cache: "no-store",
  });
  return data.json();
}