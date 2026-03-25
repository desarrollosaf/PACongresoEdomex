
export async function getAgendaHome() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/agenda`);
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch agenda:", error);
    return [];
  }
}


