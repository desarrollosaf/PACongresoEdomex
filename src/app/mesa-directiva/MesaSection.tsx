type Props = {
    integrante: any;
};

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

export default function MesaSection({ integrante } : Props) {
  const renderCard = (item?: MesaItem, bgClass = 'bg-morena') => {
    const diputado = item?.integranteLegis?.diputado;
    const foto = diputado?.fotos?.[0]?.path;
    const nombre = [diputado?.nombres, diputado?.apaterno, diputado?.amaterno]
      .filter(Boolean)
      .join(' ');
    const cargo = item?.tipo_cargo?.valor ?? 'Sin cargo';

    return (
      <div className="miembro-card-jucopo">
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

            <div className="bg-gradient-gris">
            <div className="w-layout-grid div-mesa-direciva">
                {renderCard(integrante[0], 'bg-morena')}
                {renderCard(integrante[1], 'bg-pri')}
                {renderCard(integrante[2], 'bg-pt')}
            </div>

            <div className="w-layout-grid div-mesa-direciva">
                {renderCard(integrante[3], 'bg-pan')}
                {renderCard(integrante[4], 'bg-mc')}
                {renderCard(integrante[5], 'bg-morena')}
                {renderCard(integrante[6], 'bg-morena')}
                {renderCard(integrante[7], 'bg-morena')}
                {renderCard(integrante[8], 'bg-morena')}
            </div>
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