import PerfilDiputadoView from './PerfilDiputadoView';
import { getDiputadoPerfil, fetchIniciativasDiputado } from '../../service/diputados.api';

export default async function PerfilDiputadoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [diputado, iniciativasArray] = await Promise.all([
    getDiputadoPerfil(id),
    fetchIniciativasDiputado(id)
  ]);

  if (!diputado) {
    return (
      <div className="section-diputados" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2 className="heading-15">Diputado no encontrado</h2>
      </div>
    );
  }

  return <PerfilDiputadoView diputado={diputado} serverIniciativas={iniciativasArray || []} />;
}
