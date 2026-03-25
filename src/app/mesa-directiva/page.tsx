import { getMesa } from '../service/mesa.api';
import MesaSection from './MesaSection';
type MesaItem = {
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

export const dynamic = 'force-dynamic';

export default async function MesaPage() {
  const integrante: MesaItem[] = await getMesa();

  return (
    <MesaSection 
    integrante = { integrante }></MesaSection>
  );
}