import Link from 'next/link';

type AgendaItem = {
  id?: string | number;
  fecha_hora?: string;
  fecha_hora_inicio?: string;
  fecha_hora_fin?: string;
  descripcion?: string;
  liga?: string;
  transmision?: boolean;
  estatus_transmision?: boolean;
  sede?: {
    sede?: string;
  };
};

type Props = {
  agenda: AgendaItem[] | null;
};

const extraerYoutubeSrc = (iframeString?: string) => {
  if (!iframeString) return null;

  const match = iframeString.match(/src="([^"]+)"/i);
  return match?.[1] || null;
};

const formatearFechaHora = (fecha?: string) => {
  if (!fecha) return '';

  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return fecha;

  return date.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatearHora = (fecha?: string) => {
  if (!fecha) return '';

  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default function AgendaHomeSection({ agenda }: Props) {
  const agendas = Array.isArray(agenda) ? agenda : [];

  const agendaPrincipal = agendas?.[0];
  const agendaLista = agendas.slice(1, 5);

  const videoSrc =
    extraerYoutubeSrc(agendaPrincipal?.liga) ||
    'https://www.youtube.com/embed/KbfsXJrPXCU?rel=0&controls=1&autoplay=0&mute=0&start=0';

  return (
    <section className="max_width">
      <div>
        <h4 className="heading-5 titulo-seccion">Agenda Parlamentaria del día</h4>
      </div>

      <div className="columns-5 w-row">
        <div className="w-col w-col-6">
          <div
            style={{ paddingTop: '56.17021276595745%' }}
            className="w-embed-youtubevideo youtube"
          >
            <iframe
              src={videoSrc}
              frameBorder={0}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={agendaPrincipal?.descripcion || 'Agenda Parlamentaria'}
            />
          </div>

          <h4>{agendaPrincipal?.descripcion || 'Sin evento destacado'}</h4>
        </div>

        <div className="column-6 w-col w-col-6">
          <div>
            <ol role="list" className="w-list-unstyled">
              {agendaLista.length > 0 ? (
                agendaLista.map((item) => (
                  <li className="list-item" key={item.id}>
                    <div className="div-block-19">
                      <div className="text-block-3">
                        {item.descripcion || 'Sin descripción'}
                      </div>

                      <div>
                        {formatearFechaHora(item.fecha_hora_inicio || item.fecha_hora)}
                        {item.fecha_hora_inicio || item.fecha_hora_fin ? ' | ' : ' | '}
                        {formatearHora(item.fecha_hora_inicio || item.fecha_hora)}
                        {item.fecha_hora_fin
                          ? ` - ${formatearHora(item.fecha_hora_fin)}`
                          : ''}
                        {item.sede?.sede ? ` - ${item.sede.sede}` : ''}
                      </div>

                      {item.liga ? (
                        <a
                          href={extraerYoutubeSrc(item.liga) || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-envivo w-button"
                        >
                          Ir al en vivo
                        </a>
                      ) : (
                        <span className="btn-envivo w-button" style={{ opacity: 0.6 }}>
                          Sin transmisión
                        </span>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-item">
                  <div className="div-block-19">
                    <div className="text-block-3">
                      No hay eventos registrados en la agenda.
                    </div>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>

      <div className="div-block-37">
        <Link href="/agenda" className="btn-envivo w-button">
          Ver todas las sesiones
        </Link>
      </div>
    </section>
  );
}