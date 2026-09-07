function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-black/10 ${className}`} />;
}

export default function Loading() {
  return (
    <>
      <section className="section-3" style={{ position: "relative" }}>
        <Pulse className="absolute inset-0 rounded-none" />
        <div
          data-w-id="0103c995-5e1d-dcc5-e0e3-47ae2562f79a"
          className="div-block hero-information"
          style={{ position: "relative", width: "100%" }}
        >
          <Pulse className="h-10 w-2/3 max-w-[520px] mx-auto bg-white/40" />
          <Pulse className="h-12 w-full max-w-[420px] mx-auto mt-6 bg-white/40" />
        </div>
      </section>

      <section className="numeralia max_width">
        <div className="div-block-4">
          <Pulse className="h-8 w-64 mx-auto" />
          <Pulse className="h-4 w-96 max-w-full mx-auto mt-3" />
        </div>
        <div>
          <div className="columns w-row">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="column numeralia_columna w-col w-col-3">
                <div className="div-block-5">
                  <Pulse className="h-10 w-16" />
                </div>
                <Pulse className="h-3 w-20 mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max_width seccion-de-diputados">
        <Pulse className="h-64 w-full" />
      </section>

      <section className="max_width">
        <Pulse className="h-8 w-56 mb-4" />
        <Pulse className="h-80 w-full" />
      </section>

      <section className="max_width">
        <Pulse className="h-8 w-56 mx-auto mb-6" />
        <div className="w-layout-grid grid">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Pulse key={i} className="h-24 w-full" />
          ))}
        </div>
      </section>

      <section className="max_width">
        <Pulse className="h-8 w-40 mb-4" />
        <div className="columns-8 w-row" style={{ gap: 16 }}>
          <Pulse className="h-64 w-full" />
          <Pulse className="h-64 w-full" />
        </div>
      </section>

      <section className="max_width">
        <Pulse className="h-8 w-64 mx-auto mb-6" />
        <div className="w-layout-grid grid-2">
          <Pulse className="h-40 w-full" />
          <Pulse className="h-40 w-full" />
        </div>
      </section>
    </>
  );
}
