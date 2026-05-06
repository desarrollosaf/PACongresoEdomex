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
            <h1 className="titulo-centrado">Mesa Directiva</h1>
            {/* <p className="subtitulo-info-centrado">
                Grupo de legisladoras y legisladores que trabajan durante los periodos de receso de la
                Legislatura. Puede convocar a todas y todos los legisladores a un periodo extraordinario
                para resolver asuntos que lo ameriten.
            </p> */}
            </div>
        </div>

        <div className="cuerpo-jucopo">
            <h3 className="titulo-centrado">Integrantes</h3>

            <style dangerouslySetInnerHTML={{__html: `
              .secretarios-container-custom {
                display: grid !important;
                gap: 20px !important;
                width: 100% !important;
                justify-items: center !important;
                align-items: stretch !important;
                margin-bottom: 20px !important;
              }
              @media screen and (min-width: 992px) {
                .secretarios-container-custom {
                  grid-template-columns: repeat(4, 1fr) !important;
                }
              }
              @media screen and (min-width: 768px) and (max-width: 991px) {
                .secretarios-container-custom {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              @media screen and (max-width: 767px) {
                .secretarios-container-custom {
                  grid-template-columns: 1fr !important;
                }
              }
            `}} />

            <div className="bg-gradient-gris">
            {(() => {
                if (!integrante || !Array.isArray(integrante)) return null;
                
                const normalizeString = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                const secretarios = integrante.filter((item: any) => {
                  const cargo = item?.tipo_cargo?.valor || '';
                  return normalizeString(cargo).includes('secretari');
                });
                const otros = integrante.filter((item: any) => {
                  const cargo = item?.tipo_cargo?.valor || '';
                  return !normalizeString(cargo).includes('secretari');
                });

                return (
                  <>
                    {otros.reduce((resultArray: any[], item: any, index: number) => {
                      const chunkIndex = Math.floor(index / 3);
                      if (!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [];
                      }
                      resultArray[chunkIndex].push(item);
                      return resultArray;
                    }, []).map((chunk: any[], chunkIndex: number) => (
                      <div key={`otros-${chunkIndex}`} className="w-layout-grid div-mesa-direciva">
                          {chunk.map((item, itemIndex) => renderCard(item, `otros-item-${chunkIndex}-${itemIndex}`))}
                      </div>
                    ))}

                    {secretarios.length > 0 && (
                      <div className="secretarios-container-custom">
                          {secretarios.map((item, index) => renderCard(item, `sec-${index}`))}
                      </div>
                    )}
                  </>
                );
            })()}
            <br />
            </div>

            <div className="que_es_jucopo">
            <div className="columns-21 w-row">
                <div className="w-col w-col-6">
                <h1 className="titulo-seccion">¿Que hace la Mesa Directiva?</h1>
                </div>
                <div className="w-col w-col-6">
                <p className="texto-comunicado">
                    Atiende los asuntos del Congreso mexiquense durante los periodos de receso; es decir,
                    entre un periodo ordinario y otro. Debido a que tiene atribuciones limitadas, puede
                    convocar a todas y todos los legisladores a un periodo extraordinario para resolver
                    asuntos cuya importancia lo requiera.
                </p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}