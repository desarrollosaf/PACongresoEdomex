import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Gobierno del Estado | Convocatoria Decreto Art 17',
  description:
    'Proceso de Consulta Previa, Libre e Informada a Pueblos y Comunidades Indígenas y Afromexicanas del Estado de México.',
  openGraph: {
    title: 'Gobierno del Estado | Convocatoria Decreto Art 17',
    description:
      'Proceso de Consulta Previa, Libre e Informada a Pueblos y Comunidades Indígenas y Afromexicanas del Estado de México.',
    url: 'https://congresoedomex.gob.mx/convocatoria',
    siteName: 'Congreso Edo Mex',
    type: 'website',
    images: [
      {
        url: '/landing/convocatoria/images/logos-gob.png',
        width: 1200,
        height: 630,
        alt: 'Convocatoria Congreso del Estado de México',
      },
    ],
  },
  icons: {
    icon: '/landing/convocatoria/images/favicon.ico',
    apple: '/landing/convocatoria/images/webclip.png',
  },
};

const lenguas = [
  { nombre: 'Español', href: '#' },
  { nombre: 'Nahua', href: '#' },
  { nombre: 'Mazahua', href: '#' },
  { nombre: 'Tlahuica', href: '#' },
  { nombre: 'Otomí', href: '#' },
  { nombre: 'Matlatzinca', href: '#' },
];

const asambleasRegionales1 = [
  {
    municipio: 'Acambay de Ruiz Castañeda',
    sede: 'Auditorio Municipal',
    pueblos:
      'Acambay de Ruiz Castañeda, Aculco, Atlacomulco, Chapa de Mota, Jilotepec, Jiquipilco, Jocotitlán, Morelos, Nicolás Romero, Polotitlán, Soyaniquilpan de Juárez, Temascalcingo, Timilpan y Villa del Carbón',
    informativa: '25 de abril de 2026 | 10:00 horas',
    consultiva: '25 de abril de 2026 | 13:00 horas',
  },
  {
    municipio: 'San Felipe del Progreso',
    sede: 'Centro Ceremonial Mazahua',
    pueblos:
      'Almoloya de Juárez, Amanalco, Donato Guerra, El Oro, Ixtapan del Oro, Ixtlahuaca, San Felipe del Progreso, San José del Rincón, Valle de Bravo, Villa de Allende y Villa Victoria',
    informativa: '25 de abril de 2026 | 10:00 horas',
    consultiva: '25 de abril de 2026 | 13:00 horas',
  },
  {
    municipio: 'Temoaya',
    sede: 'Centro Ceremonial Otomí',
    pueblos:
      'Capulhuac, Lerma, Metepec, Ocoyoacac, Otzolotepec, Temoaya, Toluca, Xalatlaco, Xonacatlán y Zinacantepec',
    informativa: '25 de abril de 2026 | 10:00 horas',
    consultiva: '25 de abril de 2026 | 13:00 horas',
  },
  {
    municipio: 'Texcoco',
    sede: 'Centro Cultural Mexiquense',
    pueblos: 'Amecameca, Chalco, Ecatepec de Morelos, Teotihuacán y Texcoco',
    informativa: '25 de abril de 2026 | 10:00 horas',
    consultiva: '25 de abril de 2026 | 13:00 horas',
  },
];

const asambleasRegionales2 = [
  {
    municipio: 'Tejupilco',
    sede: 'Recinto Ferial',
    pueblos:
      'Joquicingo, Malinalco, Ocuilan, Sultepec, Tejupilco, Temascaltepec, Tenango del Valle y Tianguistenco',
    informativa: '25 de abril de 2026 | 10:00 horas',
    consultiva: '25 de abril de 2026 | 13:00 horas',
  },
];

const asambleaGeneral = [
  {
    municipio: 'Toluca',
    sede: 'Congreso del Estado Libre y Soberano de México',
    pueblos: 'N/A',
    informativa: '29 de abril de 2026 | 10:00 horas',
    consultiva: '29 de abril de 2026 | 13:00 horas',
  },
];

function TablaHeader() {
  return (
    <div className="columns-8 w-row">
      <div className="w-col w-col-2">
        <p className="texto-segunda-bold">Municipio</p>
      </div>
      <div className="w-col w-col-2">
        <p className="texto-segunda-bold">Sede</p>
      </div>
      <div className="w-col w-col-4">
        <p className="texto-segunda-bold">
          Pueblos y Comunidades Indígenas y Afromexicanas
        </p>
      </div>
      <div className="w-col w-col-2">
        <p className="texto-segunda-bold">Etapa Informativa</p>
      </div>
      <div className="w-col w-col-2">
        <p className="texto-segunda-bold">Etapa Consultiva</p>
      </div>
    </div>
  );
}

function TablaRows({
  items,
}: {
  items: {
    municipio: string;
    sede: string;
    pueblos: string;
    informativa: string;
    consultiva: string;
  }[];
}) {
  return (
    <>
      {items.map((item, index) => (
        <div className="w-row" key={`${item.municipio}-${index}`}>
          <div className="w-col w-col-2">
            <p className="paragraph-table-bold">{item.municipio}</p>
          </div>
          <div className="w-col w-col-2">
            <p className="paragraph-table">{item.sede}</p>
          </div>
          <div className="w-col w-col-4">
            <p className="paragraph-table">{item.pueblos}</p>
          </div>
          <div className="w-col w-col-2">
            <p className="paragraph-table">{item.informativa}</p>
          </div>
          <div className="w-col w-col-2">
            <p className="paragraph-table">{item.consultiva}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function ConvocatoriaPage() {
  return (
    <>
      <link
        rel="stylesheet"
        href="/landing/convocatoria/css/normalize.css"
      />
      <link rel="stylesheet" href="/landing/convocatoria/css/webflow.css" />
      <link
        rel="stylesheet"
        href="/landing/convocatoria/css/gobierno-del-estado-convocatoria-decret.webflow.css"
      />

      <div className="body">
        <header className="section-2">
          <div className="div-block-8">
            <a href="/" className="w-inline-block">
              <img
                sizes="100vw"
                srcSet="
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-500.png 500w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-800.png 800w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-1080.png 1080w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-1600.png 1600w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-2000.png 2000w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-2600.png 2600w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas-p-3200.png 3200w,
                  /landing/convocatoria/images/Pueblos-y-comunidades-indigenas.png 3807w
                "
                alt="Pueblos y comunidades indígenas"
                src="/landing/convocatoria/images/Pueblos-y-comunidades-indigenas.png"
                loading="lazy"
                className="image"
              />
            </a>

            <img
              src="/landing/convocatoria/images/logos-gob.png"
              loading="lazy"
              alt="Logos Gobierno"
              className="image-14"
            />
          </div>
        </header>

        <section>
          <section className="section-hero">
            <div className="justificacion-hero">
              <div className="div-block-16">
                <p className="hero-sub">
                  Proceso de Consulta Previa, Libre e Informada a
                </p>
                <p className="hero-titulo">
                  Pueblos y Comunidades Indígenas y Afromexicanas
                </p>
              </div>

              <div className="div-block-15">
                <img
                  src="/landing/convocatoria/images/iconos.png"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="
                    /landing/convocatoria/images/iconos.png 500w,
                    /landing/convocatoria/images/iconos.png 800w,
                    /landing/convocatoria/images/iconos.png 1080w,
                    /landing/convocatoria/images/iconos.png 1600w,
                    /landing/convocatoria/images/iconos.png 2000w,
                    /landing/convocatoria/images/iconos.png 2600w,
                    /landing/convocatoria/images/iconos.png 2782w
                  "
                  alt="Íconos"
                  className="image-13"
                />
                <p className="hero-titulo-2">del Estado de México</p>
              </div>

              <p className="texto-general-base"></p>
            </div>
          </section>
        </section>

        <section className="section-bases-copy">
          <div className="justificacion">
            <h2 className="no-base-centrado">
              Descarga la convocatoria en tu lengua
            </h2>
          </div>

          <div className="div-block-17">
            {lenguas.map((lengua) => (
              <a
                key={lengua.nombre}
                href={lengua.href}
                className="btn-lengua w-button"
              >
                {lengua.nombre}
              </a>
            ))}
          </div>
        </section>

        <section className="section-bases-copy">
          <div className="justificacion">
            <p className="texto-general-base">
              Con fundamento en los artículos 1, 2, y 133 de la Constitución
              Política de los Estados Unidos Mexicanos; los artículos 1 y 6 del
              Convenio 169 de la Organización Internacional del Trabajo (OIT)
              sobre Pueblos Indígenas y Tribales en Países Independientes; los
              artículos 18 y 19 de la Declaración de las Naciones Unidas sobre
              los Derechos de los Pueblos Indígenas; el artículo XXIII de la
              Declaración Americana sobre Derechos de los Pueblos Indígenas; los
              artículos 17, párrafos primero, quinto y sexto, 38 párrafo primero
              y 61 fracciones IV y LVI de la Constitución Política del Estado
              Libre y Soberano de México; los artículos 4 y 30 de la Ley
              Orgánica del Poder Legislativo del Estado Libre y Soberano de
              México; los artículos 1 y 9 fracción II, inciso a), de la Ley de
              Derechos y Cultura Indígena del Estado de México. A las
              autoridades e instituciones representativas de los pueblos y
              comunidades indígenas y afromexicanas del Estado de México, a
              participar en el:
            </p>
            <p className="texto-general-base"></p>
          </div>
        </section>

        <section className="section-bases">
          <div className="justificacion">
            <h2 className="no-base-centrado">
              EL CONGRESO DEL ESTADO LIBRE Y SOBERANO DE MÉXICO CONVOCA
            </h2>
            <p className="texto-general-base">
              A las autoridades e instituciones representativas de los pueblos y
              comunidades indígenas y afromexicanas del Estado de México, a
              participar en el:
              <br />
              <br />
            </p>
            <p className="texto-general-base">
              <strong>
                PROCESO DE CONSULTA LIBRE, PREVIA E INFORMADA SOBRE EL PROYECTO
                DE DECRETO POR EL QUE SE REFORMA EL ARTÍCULO 17 DE LA
                CONSTITUCIÓN POLÍTICA DEL ESTADO LIBRE Y SOBERANO DE MÉXICO, EN
                MATERIA DE PUEBLOS Y COMUNIDADES INDÍGENAS Y AFROMEXICANAS,
                PRESENTADO POR LAS COMISIONES LEGISLATIVAS UNIDAS DE GOBERNACIÓN
                Y PUNTOS CONSTITUCIONALES, Y DE ASUNTOS INDÍGENAS DE LA “LXII”
                LEGISLATURA DEL ESTADO DE MÉXICO.
                <br />
                <br />
              </strong>
            </p>
          </div>

          <p className="texto-general-base">
            El proceso de Consulta a pueblos y comunidades indígenas y
            afromexicanas se realizará a través de asambleas de la misma
            naturaleza, contemplando la celebración de{' '}
            <strong>
              cinco Asambleas Regionales Informativas y Consultivas el 25 de
              abril de 2026, así como una Asamblea General el 29 de abril de
              2026
            </strong>
            , bajo las siguientes bases:
          </p>
        </section>

        <section className="section-bases">
          <h1 className="section-tittle">Bases</h1>

          <div className="justificacion">
            <h2 className="no-base">
              <strong>Justificación:</strong>
            </h2>
            <p className="texto-general-base">
              El 30 de septiembre de 2024 se publicó en el Diario Oficial de la
              Federación el Decreto por el que se reforman, adicionan y derogan
              diversas disposiciones del artículo 2º de la Constitución Política
              de los Estados Unidos Mexicanos, en materia de pueblos y
              comunidades indígenas y afromexicanas.
              <br />
              <br />
              En dicho Decreto, particularmente en su artículo Quinto
              Transitorio, se establece la obligación de las autoridades de los
              tres órdenes de gobierno, en el ámbito de sus respectivas
              competencias, de realizar las adecuaciones normativas necesarias
              para garantizar el ejercicio de la libre determinación y autonomía
              de los pueblos y comunidades indígenas y afromexicanas, en el
              marco de la unidad nacional, así como su reconocimiento como
              sujetos de derecho público y el respeto irrestricto a sus
              derechos.
              <br />
              <br />
              En cumplimiento a este mandato constitucional, durante la “LXII”
              Legislatura del Estado de México se presentaron las iniciativas de
              reforma en la materia siguientes:
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">1</h2>
            <p className="texto-segunda">
              Las candidatas y los candidatos a obtener el Pergamino y la
              Medalla al Reconocimiento Docente 2026, deberán ser maestras o
              maestros pertenecientes a las instituciones de educación pública y
              particulares con autorización o con reconocimiento de validez
              oficial de estudios, quienes se distingan por su labor educativa y
              su compromiso social, a través de actividades o acciones que
              representen el enaltecimiento de la formación de alumnas y alumnos
              del Estado de México.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">2</h2>
            <p className="texto-segunda">
              Iniciativa de Decreto por el que se reforman diversas
              disposiciones de la Constitución Política del Estado Libre y
              Soberano de México, presentada por la Diputada Leticia Mejía
              García del Grupo Parlamentario del Partido Revolucionario
              Institucional.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">3</h2>
            <p className="texto-segunda">
              Iniciativa con Proyecto de Decreto de reforma Constitucional,
              presentada por las y los integrantes del Grupo Parlamentario del
              Partido Movimiento Ciudadano.
            </p>
          </div>

          <p className="texto-general-base">
            Dichas propuestas fueron turnadas a las Comisiones Unidas de
            Gobernación y Puntos Constitucionales y de Asuntos Indígenas para su
            estudio y en su caso dictaminación. Como resultado de su análisis,
            se integró el{' '}
            <strong>
              Proyecto de Decreto por el que se reforma el artículo 17 de la
              Constitución Política del Estado Libre y Soberano de México
            </strong>
            .
            <br />
            <br />
            No obstante, en atención a la naturaleza de las disposiciones
            propuestas y de conformidad con lo previsto en el artículo 2º,
            apartado A, fracción XIII de la Constitución Política de los Estados
            Unidos Mexicanos, que reconoce el derecho de los pueblos y
            comunidades indígenas a ser consultados respecto de las medidas
            legislativas o administrativas susceptibles de causar afectaciones o
            impactos significativos en su vida o en su entorno, resulta
            procedente someter dicho Proyecto de Decreto a un proceso de
            consulta, a efecto de obtener su consentimiento o, en su caso,
            alcanzar acuerdos, conforme a los principios que garanticen el
            respeto y ejercicio efectivo de sus derechos.
            <br />
            <br />
            En este contexto, el 8 de abril del año en curso, las Comisiones
            Legislativas Unidas de Gobernación y Puntos Constitucionales y de
            Asuntos Indígenas aprobaron el Acuerdo mediante el cual se determina
            someter a consulta libre, previa e informada a los pueblos y
            comunidades indígenas y afromexicanas el referido Proyecto de
            Decreto. Asimismo, se facultó a las Presidencias de las Comisiones
            Legislativas de Gobernación y Puntos Constitucionales; de Asuntos
            Indígenas; y de Desarrollo y Bienestar Social para organizar y
            llevar a cabo dicho proceso de consulta.
            <br />
            <br />
            Para el Congreso del Estado Libre y Soberano de México, los pueblos
            y comunidades indígenas y afromexicanas, como sujetos de derecho
            público con personalidad jurídica y patrimonio propio, constituyen
            un pilar fundamental de la identidad cultural, social y política del
            país. En el Estado de México, la presencia de <strong>los</strong>{' '}
            pueblos originarios mazahuas, otomíes, nahuas, matlazincas y
            tlahuicas refleja la riqueza étnica y cultural de la entidad, así
            como los retos estructurales que enfrentan para el pleno ejercicio
            de sus derechos.
            <br />
            <br />
            El Proyecto de Decreto referido tiene como propósito, de manera
            general, fortalecer el reconocimiento de sus sistemas normativos, así
            como garantizar su derecho a ser consultados sobre las medidas
            legislativas o administrativas que puedan afectarles, conforme a
            principios que aseguren el respeto y ejercicio efectivo de sus
            derechos.
            <br />
            <br />
            Para ello, en el Estado de México se privilegia el diálogo con los
            pueblos y comunidades indígenas y afromexicanas, bajo los principios
            de libre determinación, participación, buena fe, interculturalidad,
            colectividad e igualdad entre mujeres y hombres, mediante mecanismos
            culturalmente adecuados que permitan incorporar su visión y asegurar
            su participación plena y efectiva, en concordancia con el enfoque de
            democracia participativa previsto en el Plan de Desarrollo del
            Estado de México <strong>2023-2029.</strong>
            <br />
            <br />
            En razón de lo anterior, el Congreso del Estado Libre y Soberano de
            México considera indispensable llevar a cabo un proceso de diálogo
            abierto, directo y constructivo con los pueblos y comunidades
            indígenas y afromexicanas.
          </p>
        </section>

        <section className="section-bases">
          <div className="justificacion">
            <h2 className="no-base">
              <strong>
                DE LA CONSULTA LIBRE, PREVIA E INFORMADA A LOS PUEBLOS Y
                COMUNIDADES INDÍGENAS Y AFROMEXICANAS
              </strong>
            </h2>
            <p className="texto-general-base"></p>
          </div>

          <h2 className="no-base_b">
            <strong>A. Objeto de la consulta:</strong>
            <br />
            La Consulta tendrá por objeto:
          </h2>

          <div className="div-block-13">
            <h2 className="no-base">1</h2>
            <p className="texto-segunda">
              Someter a consideración de los pueblos y comunidades indígenas y
              afromexicanas el{' '}
              <strong>
                Proyecto de Decreto por el que se reforma el artículo 17 de la
                Constitución Política del Estado Libre y Soberano de México
              </strong>
              , en materia de pueblos y comunidades indígenas y afromexicanas,
              presentado por las Comisiones Legislativas Unidas de Gobernación y
              Puntos Constitucionales y de Asuntos Indígenas de la “LXII”
              Legislatura del Estado de México.
            </p>
          </div>

          <h2 className="no-base_b">
            <strong>B. Materia de la consulta</strong>
            <br />
            Será materia de la consulta:
          </h2>

          <p className="texto-general-base"></p>

          <div className="div-block-13">
            <h2 className="no-base">1</h2>
            <p className="texto-segunda">
              El contenido del{' '}
              <strong>
                Proyecto de Decreto por el que se reforma el artículo 17 de la
                Constitución Política del Estado Libre y Soberano de México
              </strong>
              , en materia de pueblos y comunidades indígenas y afromexicanas,
              presentado por las Comisiones Unidas de Gobernación y Puntos
              Constitucionales y de Asuntos Indígenas de la “LXII” Legislatura
              del Estado de México.
            </p>
          </div>

          <h2 className="no-base_b">
            <strong>C. Identificación de los actores del Proceso de Consulta</strong>
          </h2>

          <div className="div-block-13">
            <h2 className="no-base">i</h2>
            <p className="texto-segunda">
              Autoridad Responsable. - El Congreso del Estado de México, por
              conducto de las Presidencias de las Comisiones Unidas de
              Gobernación y Puntos Constitucionales, Asuntos Indígenas, y de
              Desarrollo y Bienestar Social.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">ii</h2>
            <p className="texto-segunda">
              Sujeto Consultado.- Los Pueblos y Comunidades Indígenas y
              Afromexicanas del Estado de México.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">iv</h2>
            <p className="texto-segunda">
              Observador Independiente.- Se invitará como observador
              independiente a la Comisión Estatal de Derechos Humanos del Estado
              de México, asegurando de tal manera que el proceso se lleve a cabo
              en estricto apego a la legislación internacional, federal y local,
              en materia del ejercicio al derecho a una Consulta Libre, Previa e
              Informada de los pueblos y comunidades indígenas y afromexicanas.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">v</h2>
            <p className="texto-segunda">
              Observador Independiente.- Se invitará como observador
              independiente a la Comisión Estatal de Derechos Humanos del Estado
              de México, asegurando de tal manera que el proceso se lleve a cabo
              en estricto apego a la legislación internacional, federal y local,
              en materia del ejercicio al derecho a una Consulta Libre, Previa e
              Informada de los pueblos y comunidades indígenas y afromexicanas.
            </p>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">vi</h2>
            <p className="texto-segunda">
              Comité Técnico Asesor.- Se integrará por representantes del
              Congreso del Estado de México, las instancias del Gobierno del
              Estado de México que, por razón de su competencia legal, atienden
              a los pueblos y comunidades indígenas y afromexicanas, quienes
              proporcionarán la información que requiera o solicite el sujeto
              consultado.
              <br />
              <br />
              Siendo estas, las Comisiones Legislativas Unidas de Gobernación y
              Puntos Constitucionales, de Asuntos Indígenas, y de Desarrollo y
              Bienestar Social, así como la Secretaría General de Gobierno, la
              Secretaría de Bienestar, la Consejería Jurídica, y el Consejo
              Estatal para el Desarrollo Integral de los Pueblos Indígenas del
              Estado de México, además de las que por razón de integración sean
              requeridas por el sujeto consultado.
            </p>
          </div>

          <h2 className="no-base_b">
            <strong>D. El procedimiento de consulta</strong>
            <br />
            La consulta se desahogará a través de las siguientes etapas:
          </h2>

          <div className="div-block-13">
            <h2 className="no-base">A)</h2>
            <div>
              <p className="texto-segunda-titulo">
                <strong>Actividades y Acuerdos Previos:</strong>
              </p>
              <p className="texto-segunda">
                Para llevar a cabo el Proceso de Consulta y a fin de ofrecer las
                mejores <strong> </strong>condiciones de cercanía y comunicación
                con las comunidades a consultar, se han configurado 5 regiones
                en las que se realizarán las Asambleas Regionales Informativas y
                Consultivas.
                <br />
                Asimismo, se elaboró un Protocolo de la Consulta Libre, Previa e
                Informada para este Proceso de Consulta, que contiene las reglas
                y principios mínimos que deberán observar las partes durante todo
                el proceso, el cual puede ser consultado las páginas
                electrónicas: cedipiem.gob.mx y congresoedomex.gob.mx.
              </p>
            </div>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">B)</h2>
            <div>
              <p className="texto-segunda-titulo">
                <strong>Etapa informativa:</strong>
              </p>
              <p className="texto-segunda">
                A partir de la publicación de la presente convocatoria en el
                Periódico Oficial “Gaceta del Gobierno”, la Autoridad
                responsable y el Órgano Técnico proporcionarán, por todos los
                medios de comunicación y difusión, la información disponible del
                Proyecto de Decreto a los pueblos y comunidades indígenas y
                afromexicanas a consultar.
                <br />
                <br />
                Asimismo, se realizarán <strong>5 Asambleas Regionales Informativas el día 25 de abril de 2026, a partir de las 10:00 horas</strong>, en
                los lugares que más adelante se detallan, en las que
                participarán las personas representantes de los pueblos y
                comunidades indígenas y afromexicanas; <strong>de igual forma, se llevará a cabo una Asamblea General el día 29 de abril de 2026, en el mismo horario</strong>.
                <br />
                <br />
                De igual manera, se deberán prever los mecanismos necesarios
                durante las asambleas, a fin de asegurar una participación
                efectiva, culturalmente adecuada y conforme a los estándares
                constitucionales.
                <br />
                <br />
                La información que se proporcionará, contendrá los siguientes
                aspectos:
                <br />
                <br />
                i. Objetivos del proceso de consulta, así como metodología de la
                Asamblea Regional Consultiva, e
                <br />
                ii. <strong>Contenido</strong> del{' '}
                <strong>
                  “Proyecto de Decreto por el que se reforma el artículo 17 de
                  la Constitución Política del Estado Libre y Soberano de
                  México, en materia de pueblos y comunidades indígenas y
                  afromexicanas”
                </strong>
                , presentado por las Comisiones <strong>Legislativas</strong>{' '}
                Unidas de Gobernación y Puntos Constitucionales y de Asuntos
                Indígenas de la “LXII” Legislatura del Estado de México.
              </p>

              <p className="texto-segunda">
                El Proyecto de Decreto, la convocatoria y los materiales
                informativos serán traducidos de manera verbal y/o escrita a las
                lenguas indígenas correspondientes.
              </p>
            </div>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">C)</h2>
            <div>
              <p className="texto-segunda-titulo">
                <strong>Etapa deliberativa:</strong>
              </p>
              <p className="texto-segunda">
                Concluidas las Asambleas Regionales Informativas, se dará inicio
                a la etapa deliberativa. En esta etapa, las personas
                representantes de los pueblos y comunidades indígenas y
                afromexicanas analizarán y reflexionarán sobre el contenido del{' '}
                <strong>
                  “Proyecto de Decreto por el que se reforma el artículo 17 de
                  la Constitución Política del Estado Libre y Soberano de
                  México, en materia de pueblos y comunidades indígenas y
                  afromexicanas”
                </strong>
                .
                <br />
                <br />
                Esta deliberación se hará con pleno respeto a sus instituciones
                y formas propias de tomas de decisiones, de conformidad con sus
                sistemas normativos indígenas.
                <br />
                <br />
                Para garantizar la comprensión y participación de las personas
                asistentes, se deberán prever las medidas necesarias que aseguren
                la accesibilidad lingüística en las lenguas indígenas
                correspondientes.
                <br />
                <br />
                La autoridad responsable y otras instancias externas no
                interferirán en este período de reflexión y análisis,
                garantizando que la deliberación ocurra en un marco de absoluta
                libertad y responsabilidad.
              </p>
            </div>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">D)</h2>
            <div>
              <p className="texto-segunda-titulo">
                <strong>Etapa Consultiva:</strong>
              </p>
              <p className="texto-segunda">
                La etapa consultiva se desahogará a través de <strong>5</strong>{' '}
                <strong>
                  Asambleas Regionales Consultivas que se celebrarán el día 25
                  de abril de 2026, a partir de las 13:00 horas
                </strong>
                , así como de{' '}
                <strong>
                  una Asamblea General que tendrá lugar el día 29 de abril de
                  2026, en el mismo horario
                </strong>
                .
                <br />
                <br />
                Cada una de las Asambleas Regionales, y la Asamblea General,
                contemplarán la realización de una etapa consultiva en la que se
                recibirán las propuestas, sugerencias, observaciones y
                contenidos normativos específicos, generados en las mesas de
                trabajo o que por separado deseen formular los participantes.
                <br />
                <br />
                Dada la naturaleza de la medida sometida a consulta, en cada
                Asamblea Regional, y en la Asamblea General, se levantarán las
                actas correspondientes que contendrán las principales
                consideraciones vertidas.
                <br />
                <br />
                Es importante enfatizar que es deber de la Autoridad Responsable
                atender las propuestas, sugerencias, observaciones y contenidos
                normativos o, en su caso, explicar las razones por las que no
                sean consideradas, cumpliendo con el deber de acomodo y
                razonabilidad.
              </p>
            </div>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">E)</h2>
            <div>
              <p className="texto-segunda-titulo">Etapa de Seguimiento:</p>
              <p className="texto-segunda">
                Una vez obtenidos los resultados, el personal del Congreso del
                Estado Libre y Soberano de México y/o del Consejo Estatal para
                el Desarrollo Integral de los Pueblos Indígenas del Estado de
                México integrará y remitirá la información y los datos recabados
                del procedimiento de consulta a las Presidencias de las
                Comisiones Legislativas Unidas de Gobernación y Puntos
                Constitucionales, Asuntos Indígenas y Desarrollo y Bienestar
                Social de la “LXII” Legislatura del Estado de México.
                <br />
                <br />
                Las referidas Presidencias darán el seguimiento correspondiente
                para la determinación que en derecho proceda, en el marco del
                proceso legislativo aplicable.
              </p>
            </div>
          </div>

          <div className="div-block-13">
            <h2 className="no-base">F)</h2>
            <div className="div-block-14">
              <p className="texto-segunda-titulo">
                <strong>
                  Otros mecanismos de recepción de propuestas y planteamientos
                </strong>
              </p>
              <p className="texto-segunda">
                Las autoridades y representantes de los pueblos y comunidades
                indígenas y afromexicanas, así como los ciudadanos pertenecientes
                a dichas comunidades podrán remitir sus propuestas, opiniones,
                sugerencias o planteamientos a los siguientes correos
                electrónicos:{' '}
                <a href="mailto:consultapia2026@congresoesomex.gob.mx">
                  consultapia2026@congresoesomex.gob.mx
                </a>{' '}
                y{' '}
                <a href="mailto:cedipiem_ve@edomex.gob.mx">
                  cedipiem_ve@edomex.gob.mx
                </a>
                .
                <br />
                <br />
                De igual manera, podrán presentarlos de forma directa en las
                oficinas del Consejo Estatal para el Desarrollo Integral de los
                Pueblos Indígenas del Estado de México, o bien, ante las
                Presidencias de las Comisiones Legislativas Unidas de
                Gobernación y Puntos Constitucionales, de Asuntos Indígenas o de
                Desarrollo y Bienestar Social, en la sede del Congreso del
                Estado Libre y Soberano de México.
              </p>
            </div>
          </div>

          <h2 className="no-base_b">
            <strong>E. Sedes y fechas de la Consulta Indígena:</strong>
            <br />
            Las Asambleas Regionales Informativas y Consultivas, así como la
            Asamblea General a los pueblos indígenas se realizarán en los
            siguientes lugares y fechas:
          </h2>

          <h2 className="no-base-centrado">
            ASAMBLEAS REGIONALES INFORMATIVAS Y CONSULTIVAS
          </h2>
          <TablaHeader />
          <TablaRows items={asambleasRegionales1} />

          <h2 className="no-base-centrado">
            <strong>ASAMBLEAS REGIONALES INFORMATIVAS Y CONSULTIVAS</strong>
          </h2>
          <TablaHeader />
          <TablaRows items={asambleasRegionales2} />

          <h2 className="no-base-centrado">
            <strong>ASAMBLEA GENERAL</strong>
          </h2>
          <TablaHeader />
          <TablaRows items={asambleaGeneral} />

          <p className="texto-general-base">
            La ubicación de los lugares en donde se desahogarán cada una de las
            Asambleas Regionales en cada una de las sedes, será publicada en la
            página web del Congreso del Estado de México y se garantizará la más
            amplia difusión a través de todos los medios de comunicación y
            difusión estatales.
          </p>

          <p className="texto-segunda-titulo">
            II. <strong>INFORMACIÓN Y ENLACES:</strong>
          </p>

          <p className="texto-general-base">
            Para mayor información respecto del proceso de Consulta libre,
            previa e informada, podrán acudir a las oficinas del Consejo Estatal
            para el Desarrollo Integral de los Pueblos Indígenas del Estado de
            México, ubicadas en calle Nigromante núm. 305, Col. La Merced, C.P.
            50080, Toluca, Estado de México.
            <br />
            <br />
            <strong>correo electrónico:</strong> cedipiem_ve@edomex.gob.mx,
            <br />
            <strong>teléfono:</strong> (722) 213 58 94 y 213-58-95
            <br />
            <br />
            <strong>Toluca, Estado de México a -- de abril de 2026</strong>
          </p>
        </section>

        <section className="section-5">
          <div className="columns-7 w-row">
            <div className="w-col w-col-2"></div>
            <div className="column-10 w-col w-col-8">
              <h1 className="footer-text">
                Comisión de Educación, Cultura, Ciencia, Tecnología e Innovación
              </h1>
              <p className="aviso-privacidad">
                <a href="#" className="link-2">
                  Aviso de privacidad
                </a>
              </p>
            </div>
            <div className="w-col w-col-2"></div>
          </div>
        </section>
      </div>

      <Script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=69e002b078925b4fd9c128a1"
        strategy="beforeInteractive"
      />
      <Script
        src="/landing/convocatoria/js/webflow.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.prod.website-files.com/gsap/3.14.2/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}