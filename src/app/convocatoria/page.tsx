import Script from 'next/script';

export const metadata = {
  title: 'Gobierno del Estado | Convocatoria Decreto Art 17',
  description: 'Proceso de Consulta Previa, Libre e Informada',
};

export default function ConvocatoriaPage() {
  return (
    <>
      <link rel="stylesheet" href="/landing/convocatoria/css/normalize.css" />
      <link rel="stylesheet" href="/landing/convocatoria/css/webflow.css" />
      <link
        rel="stylesheet"
        href="/landing/convocatoria/css/gobierno-del-estado-convocatoria-decret.webflow.css"
      />

      <header className="section-2">
        <div className="div-block-8">
          <a href="#" className="w-inline-block">
            <img
              src="/landing/convocatoria/images/Pueblos-y-comunidades-indigenas.png"
              alt=""
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
                alt=""
                className="image-13"
              />
              <p className="hero-titulo-2">del Estado de México</p>
            </div>
          </div>
        </section>
      </section>

      {/* aquí sigues pegando el resto del body convertido a JSX */}

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