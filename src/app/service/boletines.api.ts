const isServer = typeof window === 'undefined';
// On the server we hit localhost directly to avoid HTTPS/NAT timeout issues
const API_URL = isServer ? 'http://localhost:4000' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000');

export async function getBoletin(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/boletines/${id}`, {
    cache: "no-store",
  });
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}

export async function getBoletinesRandom() {
  try {
    const res = await fetch(`${API_URL}/api/boletines/random`);
     if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletin:", error);
    return [];
  }
}

export async function getBoletines() {
  try {
    const res = await fetch(`${API_URL}/api/boletines`, { next: { revalidate: 10 } });
    if (!res.ok) {
      const text = await res.text();
      console.error('Error backend:', text);
      return [];
    }
  return await res.json();
  } catch (error) {
    console.error("Failed to fetch boletines:", error);
    return [];
  }
}


