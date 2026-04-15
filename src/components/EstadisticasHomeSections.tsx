type Props = {
  estadisticas: any;
};

export default function EstadisticasHomeSection({ estadisticas }: Props) {
  return (
    <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e90" className="columns w-row">
      <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
        <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
          <div className="text-block color_oro">+</div>
          <div className="text-block"> 75</div>
        </div>
        <div className="descripcion_dato">Diputados.</div>
      </div>

      <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
        <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
          <div className="text-block color_oro">+</div>
          <div className="text-block">
            {
              estadisticas.data.iniciativas.aprobadas +
              estadisticas.data.puntos_acuerdo.total +
              estadisticas.data.minutas.aprobadas
            }
          </div>
        </div>
        <div className="descripcion_dato">Asuntos aprobados.</div>
      </div>
      <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
        <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
          <div className="text-block color_oro">+</div>
          <div className="text-block"> {  estadisticas.data.totales_generales.total_comisiones}</div>
        </div>
        <div className="descripcion_dato">Reuniones de comisión.</div>
      </div>
      <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
        <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
          <div className="text-block color_oro">+</div>
          <div className="text-block">  {  estadisticas.data.totales_generales.total_sesiones}</div>
        </div>
        <div className="descripcion_dato">Sesiones.</div>
      </div>
    </div>
  )

}