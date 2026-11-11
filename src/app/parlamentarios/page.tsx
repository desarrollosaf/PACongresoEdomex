import ParlamentariosClient from './ParlamentariosClient';
import { getDiputados, calcularConteoPorPartido } from '../service/diputados.api';

export const dynamic = 'force-dynamic';

export default async function GruposParlamentarios() {
  const diputados = await getDiputados();
  const conteosPorPartido = calcularConteoPorPartido(diputados);

  return (
    <>
      <ParlamentariosClient diputados={diputados} conteosPorPartido={conteosPorPartido} />
    </>
  );
}