import { getDiputados, getAllComunicadosFromProfiles } from '@/app/service/diputados.api';
import { getBoletines } from '@/app/service/boletines.api';
import SearchClientView from './SearchClientView';

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const searchTerm = normalizeText(query || '');

  // Obtenemos todos los diputados
  const allDiputadosResp = await getDiputados();
  const arrDiputados = Array.isArray(allDiputadosResp) ? allDiputadosResp : (allDiputadosResp?.data || []);

  // Extraemos todos los comunicados anidados usando la API asegurada por lotes (chunks)
  const allUniqueComunicados = await getAllComunicadosFromProfiles(arrDiputados);

  let filteredDiputados = [];
  let filteredBoletines = [];

  if (searchTerm) {
    const searchWords = searchTerm.split(' ').filter((w: string) => w.length > 0);

    filteredDiputados = arrDiputados.filter((d: any) => {
      const fullname = normalizeText(`${d.nombres || ''} ${d.apaterno || ''} ${d.amaterno || ''}`);
      return searchWords.every((word: string) => fullname.includes(word));
    });

    filteredBoletines = allUniqueComunicados.filter((b: any) => {
      const title = normalizeText(b.titulo || '');
      const text = normalizeText(stripHtml(b.texto || ''));
      const summary = normalizeText(b.descripcion?.[0]?.bullets || '');
      
      // La búsqueda es exitosa si CADA palabra ingresada se encuentra en al menos uno de los campos
      return searchWords.every((word: string) => 
        title.includes(word) || text.includes(word) || summary.includes(word)
      );
    });
  }

  return (
    <SearchClientView
      initialQuery={searchTerm}
      diputados={filteredDiputados}
      comunicados={filteredBoletines}
    />
  );
}
