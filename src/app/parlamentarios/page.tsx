import ParlamentariosClient from './ParlamentariosClient';
import { getDiputados } from '../service/diputados.api';

export const dynamic = 'force-dynamic';

export default async function GruposParlamentarios() {
  const diputados = await getDiputados();

  return (
    <>
      <ParlamentariosClient diputados={diputados} />
    </>
  );
}