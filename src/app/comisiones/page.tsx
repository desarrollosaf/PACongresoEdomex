import Comisiones from './comisiones';

export default function ComisionesPage() {
  return (
    <section className="max_width">
      <div>
        <h1 className="titulo-centrado">Comisiones y Comites</h1>
        <p className="subtitulo-info-centrado">
          Las comisiones y comités son los órganos de trabajo donde se analizan,
          dictaminan y dan seguimiento a los asuntos legislativos del Congreso.
        </p>
      </div>

<div className="hero-img-comisiones">
  <div className="grid-cc">
    <div>
      <h2 className="numero-de-cc">45</h2>
      <div className="text-centrado-cc">Comisiones</div>
    </div>

    <div>
      <h2 className="numero-de-cc">5</h2>
      <div className="text-centrado-cc">Comités</div>
    </div>
  </div>
</div>

      <div className="div-block-56">
        <h3 className="titulo-centrado">Comisiones Legislativas</h3>

        <Comisiones />

        <div className="div-block-2"></div>
      </div>
    </section>
  );
}
