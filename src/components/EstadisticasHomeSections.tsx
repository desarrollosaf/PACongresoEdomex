type Props = {
  estadisticas: any;
};

export default function EstadisticasHomeSection({ estadisticas } : Props) {
    return (
        <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e90" className="columns w-row">
            <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e91" className="column numeralia_columna w-col w-col-3">
              <div data-w-id="c1fc9fc7-cb97-4374-627a-4e26bfd7443a" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block"> { estadisticas.data.iniciativas.aprobadas }</div>
              </div>
              <div className="descripcion_dato">Iniciativas aprobadas.</div>
            </div>
            <div data-w-id="7bd2727f-f0fc-56ea-a56c-ce85e6db2e92" className="numeralia_columna w-col w-col-3">
              <div data-w-id="5b28ed8c-d17f-f3f8-73e9-899b7f5bc0b4" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">{ estadisticas.data.iniciativas.en_estudio }</div>
              </div>
              <div className="descripcion_dato">Iniciativas en estudio.</div>
            </div>
            <div data-w-id="34f38003-5772-2810-9f35-1c3b67f58025" className="numeralia_columna w-col w-col-3">
              <div data-w-id="7d17229f-77ef-63ea-2cfd-c4ee6aff966d" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">{ estadisticas.data.puntos_acuerdo.total }</div>
              </div>
              <div className="descripcion_dato">Puntos de acuerdo.</div>
            </div>
            <div data-w-id="af7be9bb-144f-dc65-90c9-24c8f7af929a" className="numeralia_columna w-col w-col-3">
              <div data-w-id="b99290fd-c327-f819-16b9-c78bc4212308" className="div-block-5">
                <div className="text-block color_oro">+</div>
                <div className="text-block">{ estadisticas.data.minutas.aprobadas }</div>
              </div>
              <div className="descripcion_dato">Minutas.</div>
            </div>
          </div>
    )

}