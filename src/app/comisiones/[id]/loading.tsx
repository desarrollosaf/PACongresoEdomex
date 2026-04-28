export default function LoadingComision() {
  return (
    <section className="max_width" style={{ animation: "pulse 1.5s infinite" }}>
      {/* Hero header skeleton */}
      <div className="body_comites">
        <div className="columns-20 w-row">
          {/* Left: título y descripción */}
          <div className="w-col w-col-6">
            <div
              style={{
                height: "14px",
                backgroundColor: "#e0e0e0",
                width: "30%",
                borderRadius: "4px",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                height: "38px",
                backgroundColor: "#e0e0e0",
                width: "80%",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            />
            <div
              style={{
                height: "16px",
                backgroundColor: "#e0e0e0",
                width: "95%",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            />
            <div
              style={{
                height: "16px",
                backgroundColor: "#e0e0e0",
                width: "85%",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            />
            <div
              style={{
                height: "16px",
                backgroundColor: "#e0e0e0",
                width: "70%",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Right: imagen placeholder */}
          <div className="column-26 w-col w-col-6">
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                backgroundColor: "#e0e0e0",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="body_comites">
        <div className="w-tabs">
          {/* Tab buttons */}
          <div className="tabs-menu-3 w-tab-menu" style={{ gap: "8px" }}>
            {[120, 110, 120, 100, 110].map((w, i) => (
              <div
                key={i}
                style={{
                  height: "40px",
                  backgroundColor: i === 0 ? "#c8c8c8" : "#e0e0e0",
                  width: `${w}px`,
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>

          {/* Tab content: grid de integrantes */}
          <div className="w-tab-content" style={{ marginTop: "24px" }}>
            {/* Título de sección */}
            <div
              style={{
                height: "28px",
                backgroundColor: "#e0e0e0",
                width: "25%",
                borderRadius: "4px",
                marginBottom: "24px",
              }}
            />

            {/* Grid de cards de integrantes */}
            <div className="w-layout-grid grid-integrante-cc">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="integrante-comision">
                  {/* Foto */}
                  <div
                    className="image-15"
                    style={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "8px",
                    }}
                  />

                  {/* Nombre y cargo */}
                  <div
                    className="info-diputado-basica"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "18px",
                        backgroundColor: "#e0e0e0",
                        width: "80%",
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      style={{
                        height: "14px",
                        backgroundColor: "#e0e0e0",
                        width: "50%",
                        borderRadius: "4px",
                      }}
                    />
                  </div>

                  {/* Botón */}
                  <div
                    style={{
                      height: "36px",
                      backgroundColor: "#e0e0e0",
                      width: "100px",
                      borderRadius: "6px",
                      marginTop: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animación pulse inline */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse {
            0%   { opacity: 0.8; }
            50%  { opacity: 0.4; }
            100% { opacity: 0.8; }
          }
        `,
        }}
      />
    </section>
  );
}
