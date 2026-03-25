import { getJunta } from '../service/junta.api';
import JuntaSection from './JuntaSection';

export const dynamic = 'force-dynamic';

type JuntaItem = {
  integranteLegis?: {
    diputado?: {
      nombres?: string;
      apaterno?: string;
      amaterno?: string;
      fotos?: { path?: string }[];
    };
  };
  tipo_cargo?: {
    valor?: string;
  };
};

export default async function JuntaPage() {
  let integrante: JuntaItem[] = [];

  try {
    const data = await getJunta();
    integrante = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al obtener junta:', error);
  }

  const presidente = integrante?.[0];
  const miembros = integrante.slice(1, 7);

  return (
    <JuntaSection 
    presidente = { presidente }
    miembros = { miembros }
    integrante = { integrante }></JuntaSection>
  );
}