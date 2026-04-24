type Props = {
    integrante: any;
    presidente: any;
    miembros: any
};


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

const getNombreCompleto = (item?: JuntaItem) => {
  const diputado = item?.integranteLegis?.diputado;

  return [
    diputado?.nombres,
    diputado?.apaterno,
    diputado?.amaterno,
  ]
    .filter(Boolean)
    .join(' ');
};

const getFoto = (item?: JuntaItem) => {
  const path = item?.integranteLegis?.diputado?.fotos?.[0]?.path;
  return path
    ? `http:/127.0.0.1:8088/${path}`
    : '/images/default-user.png';
};

  const colores = [
    'bg-pvedm',
    'bg-pri',
    'bg-pt',
    'bg-pan',
    'bg-prd',
    'bg-mc',
  ];


export default function JuntaSection({ presidente, miembros, integrante } : Props) {
    return (
    <section className="junta-de-coordinacion-politica max_width">
      <div className="div-block-52">
        <div className="div-block-53">
          <h1 className="titulo-centrado">Junta de Coordinación Política</h1>
          <p className="subtitulo-info-centrado">
            Órgano de dirección política del Congreso del Estado de México,
            encargado de coordinar los trabajos legislativos, promover acuerdos
            entre los distintos grupos parlamentarios y garantizar el
            funcionamiento eficaz y democrático del Poder Legislativo.
          </p>
        </div>
      </div>

      <div className="cuerpo-jucopo">
        <h3 className="titulo-seccion">Integrantes</h3>

        <div>
          <div className="columns-18 w-row">
            <div className="column-22 w-col w-col-4">
              <div className="presidente-card-jucopo">
                <img
                  src={getFoto(presidente)}
                  loading="lazy"
                  alt={getNombreCompleto(presidente) || 'Presidencia de la JUCOPO'}
                  className="img-jucopo bg-morena"
                />
                <div className="cuerpo-info-jucopo">
                  <h3 className="nombre-jucopo">
                    {getNombreCompleto(presidente) || 'Información no disponible'}
                  </h3>
                  <div className="texto-centrado">
                    {presidente?.tipo_cargo?.valor
                      ? `${presidente.tipo_cargo.valor} de la Junta de Coordinación Política`
                      : 'Cargo no disponible'}
                  </div>
                </div>
              </div>
            </div>

            <div className="column-23 w-col w-col-8">
              <div className="w-layout-grid grid-15">
                {miembros.map((item: any, index: any) => (
                  <div className="miembro-card-jucopo" key={index}>
                    <img
                      src={getFoto(item)}
                      loading="lazy"
                      alt={getNombreCompleto(item) || `Integrante ${index + 1}`}
                      className={`img-jucopo ${colores[index] || 'bg-morena'}`}
                    />
                    <div className="cuerpo-info-jucopo">
                      <h3 className="nombre-jucopo">
                        {getNombreCompleto(item) || 'Información no disponible'}
                      </h3>
                      <div className="text-block-24">
                        {item?.tipo_cargo?.valor || 'Cargo no disponible'}
                      </div>
                    </div>
                  </div>
                ))}

                {miembros.length === 0 && (
                  <div className="miembro-card-jucopo">
                    <div className="cuerpo-info-jucopo">
                      <h3 className="nombre-jucopo">No hay integrantes disponibles</h3>
                      <div className="text-block-24">
                        No se pudo cargar la información de la junta.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="que_es_jucopo">
          <h1 className="titulo-seccion">
            ¿Qué hace la Junta de Coordinación Política?
          </h1>
          <p className="texto-comunicado">
            La <strong>Junta de Coordinación Política</strong> sirve para
            <strong> coordinar y conducir la vida política del Congreso</strong>,
            asegurando que el trabajo legislativo se realice mediante el diálogo,
            los acuerdos y la representación equilibrada de los grupos
            parlamentarios.
            <br />
            <br />
            <strong>De manera concreta, su función es:</strong>
            <br />
            Coordinar los trabajos legislativos entre los distintos grupos
            parlamentarios.
            <br />
            Construir acuerdos políticos para el funcionamiento del Congreso.
            <br />
            Definir y ordenar la agenda legislativa.
            <br />
            Proponer la integración de comisiones y comités.
            <br />
            Impulsar decisiones que garanticen gobernabilidad y eficiencia
            legislativa.
            <br />
            Servir como espacio de diálogo y negociación parlamentaria.
          </p>
        </div>
      </div>
    </section>
  );
}