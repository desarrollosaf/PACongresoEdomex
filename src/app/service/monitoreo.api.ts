export async function getMonitoreo(page: number = 1) {
  try {
    const res = await fetch(`/api/monitoreo?page=${page}`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Error proxy monitoreo:', await res.text());
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch monitoreo:', error);
    return null;
  }
}
