'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    integrante: any;
};

type MesaItem = {
  integranteLegis?: {
    partido?: {
      siglas?: string;
    };
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

export default function MesaSection({ integrante } : Props) {
  const router = useRouter();
  const isDiputacionPermanente = Array.isArray(integrante) && integrante.length > 0 && integrante[0]?.comision?.nombre === "Diputación Permanente";
  const tituloSeccion = isDiputacionPermanente ? "Diputación Permanente" : "Directiva";

  useEffect(() => {
    if (isDiputacionPermanente) {
      router.replace('/diputacion-permanente');
    }
  }, [isDiputacionPermanente, router]);

  const renderCard = (item?: MesaItem, key?: string | number) => {
    if (!item) return null;
    const diputado = item?.integranteLegis?.diputado;
    const foto = diputado?.fotos?.[0]?.path;
    const nombre = [diputado?.nombres, diputado?.apaterno, diputado?.amaterno]
      .filter(Boolean)
      .join(' ');
    const cargo = item?.tipo_cargo?.valor ?? 'Sin cargo';
    const siglas = item?.integranteLegis?.partido?.siglas;
    const bgClass = siglas ? `image-15 diputado-${siglas.toLowerCase()}` : 'image-15 bg-morena';

    return (
      <div key={key} className="miembro-card-jucopo">
        <img
          src={foto ? `https://sistema.congresoedomex.gob.mx/${foto}` : '/images/default-user.png'}
          loading="lazy"
          alt={nombre || 'Diputado'}
          className={`img-jucopo ${bgClass}`}
        />
        <div className="cuerpo-info-jucopo">
          <h3 className="nombre-jucopo">
            {nombre ? `Dip. ${nombre}` : 'Información no disponible'}
          </h3>
          <div className="texto-centrado">{cargo}</div>
        </div>
      </div>
    );
  };

return (
    <section className="mesa-directiva max_width">
        <div className="div-block-52">
            <div className="div-block-53">
            <h1 className="titulo-centrado">{tituloSeccion}</h1>
              <p className="subtitulo-info-centrado">
               Órgano de la Legislatura que conduce y organiza el desarrollo de las sesiones del Congreso del Estado de México. Se integra de forma plural y
               paritaria, y es responsable de garantizar el orden y cumplimiento del trabajo legislativo.
              </p> 
            </div>
        </div>

        <div className="cuerpo-jucopo">
            <h3 className="titulo-centrado">Integrantes</h3>

            <div className="bg-gradient-gris">
            {(() => {
                if (!integrante || !Array.isArray(integrante)) return null;

                const presidenteIndex = integrante.findIndex(
                  (item: any) => item?.tipo_cargo?.valor?.trim().toLowerCase() === 'presidencia'
                );
                const presidente = presidenteIndex !== -1 ? integrante[presidenteIndex] : null;
                const resto = presidenteIndex !== -1
                  ? integrante.filter((_: any, i: number) => i !== presidenteIndex)
                  : integrante;

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <br />
                    {presidente && (
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        {renderCard(presidente, 'mesa-presidente')}
                      </div>
                    )}
                    {resto.reduce((resultArray: any[], item: any, index: number) => {
                      const chunkIndex = Math.floor(index / 4);
                      if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [];
                      }
                      resultArray[chunkIndex].push(item);
                      return resultArray;
                    }, []).map((chunk: any[], chunkIndex: number) => (
                      <div key={`mesa-${chunkIndex}`} style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                          {chunk.map((item, itemIndex) => renderCard(item, `mesa-item-${chunkIndex}-${itemIndex}`))}
                      </div>
                    ))}
                  </div>
                );
            })()}
            <br />
            </div>

            

            <div className="que_es_jucopo">
            <div className="columns-24 w-row">
                <div className="w-col w-col-6">
                <img
                    src="/images/img_directiva_2.webp"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 97vw, (max-width: 991px) 48vw, (max-width: 3918px) 49vw, 1920px"
                    srcSet="/images/img_directiva_2-p-500.webp 500w, /images/img_directiva_2-p-800.webp 800w, /images/img_directiva_2-p-1080.webp 1080w, /images/img_directiva_2-p-1600.webp 1600w, /images/img_directiva_2.webp 1920w"
                    alt=""
                    className="img-informacion"
                />
                </div>
                <div className="w-col w-col-6">
                <h1 className="titulo-boletin">¿Qué hace la Directiva?</h1>
                <p className="texto-comunicado">
                    La Directiva organiza y conduce las sesiones del Congreso. Se integra por una
                    presidencia, dos vicepresidencias y las secretarías necesarias. Su labor es mantener
                    el orden, coordinar los debates, registrar las votaciones y dar seguimiento a los
                    acuerdos.
                </p>
                <h1 className="titulo-boletin">Sus funciones son:</h1>
                <p className="texto-comunicado">
                    • Supervisar y asegurar el correcto funcionamiento de las actividades legislativas.<br />
                    • Aplicar con imparcialidad la ley y el reglamento.<br />
                    • Convocar y conducir las sesiones.<br />
                    • Organizar el orden del día.<br />
                    • Dirigir los debates y deliberaciones.<br />
                    • Verificar el quórum.<br />
                    • Mantener el orden en el recinto legislativo.<br />
                    • Dar trámite a los asuntos parlamentarios.<br />
                    • Representar jurídicamente al Poder Legislativo, a través de su presidencia.<br />
                    • Comunicar su integración a otras autoridades.<br />
                    • Garantizar el respeto institucional durante el desarrollo de los trabajos.
                </p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}