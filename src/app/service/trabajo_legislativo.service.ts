export async function getTrabajoLegislativo() {
  const data = await fetch("http://localhost:4000/api/trabajo-legislativo", {
    cache: "no-store",
  });
  return data.json();
}