export default function ComisionesPage() {
  return (
    <section className="max_width">
      <div>
        <h1 className="titulo-centrado">Comisiones y Comites</h1>
        <p className="subtitulo-info-centrado">
          Las comisiones y comités son los órganos de trabajo donde se
          analizan, dictaminan y dan seguimiento a los asuntos legislativos del Congreso.
        </p>
      </div>

      <div className="hero-img-comisiones">
        <div className="columns-19 w-row">
          <div className="column-24 w-col w-col-6">
            <h2 className="numero-de-cc">45</h2>
            <div className="text-centrado-cc">Comisiones</div>
          </div>
          <div className="column-25 w-col w-col-6">
            <h2 className="numero-de-cc">5</h2>
            <div className="text-centrado-cc">Comités</div>
          </div>
        </div>
      </div>

      <div className="div-block-56">
        <h3 className="titulo-centrado">Comisiones Legislativas</h3>

        <form action="/search" className="search w-form">
          <label htmlFor="search" className="field-label">
            Encuentra de manera fácil y rápida la información que necesitas.
          </label>

          <div className="div-block-3">
            <input
              className="search-input-3 w-input"
              maxLength={256}
              name="query"
              placeholder="Buscar"
              type="search"
              id="search"
              required
            />
            <input
              type="submit"
              className="search-button-3 w-button"
              value="Buscar"
            />
          </div>
        </form>

        <div className="w-layout-grid grid-comisionesycomitespermanentes">

          <div className="div-block-55">
            <h3 className="titulo-centrado-peque-o">
              Apoyo y Atención a las Personas Migrantes
            </h3>
            <div className="texto-presidente-cc">
              Presidencia (nombre de la diputada o diputado)
            </div>
            <a href="#" className="btn-nav-boletin w-button">Acceder</a>
          </div>

          <div className="div-block-55">
            <h3 className="titulo-centrado-peque-o">Asuntos Indígenas</h3>
            <div className="texto-presidente-cc">
              Presidencia (nombre de la diputada o diputado)
            </div>
            <a href="#" className="btn-var-2 w-button">Acceder</a>
          </div>

          <div className="div-block-55">
            <h3 className="titulo-centrado-peque-o">Asuntos Internacionales</h3>
            <div className="texto-presidente-cc">
              Presidencia (nombre de la diputada o diputado)
            </div>
            <a href="#" className="btn-var-2 w-button">Acceder</a>
          </div>

          {/* 👉 Aquí puedes seguir pegando los demás bloques igual */}

        </div>

        <h3 className="titulo-centrado">Comisiones Especiales</h3>

        <div className="w-layout-grid grid-comisionesycomitespermanentes">
          <div className="div-block-55">
            <h3 className="titulo-centrado-peque-o">
              Comisión Especial de Estudios Legislativos y Prácticas Parlamentarias
            </h3>
            <div className="texto-presidente-cc">
              Presidencia (nombre de la diputada o diputado)
            </div>
            <a href="#" className="btn-nav-boletin w-button">Acceder</a>
          </div>
        </div>

        <div className="div-block-54">
          <h3 className="titulo-centrado">Comités Permanentes</h3>

          <div className="w-layout-grid grid-comisionesycomitespermanentes">

            <div className="div-block-55">
              <h3 className="titulo-centrado-peque-o">Administración</h3>
              <div className="texto-presidente-cc">
                Presidente: <br />
                <strong>Dip. José Francisco Vázquez Rodríguez</strong>
              </div>
              <a href="#" className="btn-var-2 w-button">Acceder</a>
            </div>

            <div className="div-block-55">
              <h3 className="titulo-centrado-peque-o">Comunicación Social</h3>
              <div className="texto-presidente-cc">
                Presidente:<br />
                <strong>Dip. Esteban Juárez Hernández</strong>
              </div>
              <a href="#" className="btn-var-2 w-button">Acceder</a>
            </div>

          </div>
        </div>

        <div className="div-block-2"></div>
      </div>
    </section>
  );
}