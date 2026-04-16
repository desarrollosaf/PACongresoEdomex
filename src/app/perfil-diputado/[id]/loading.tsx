export default function LoadingPerfil() {
  return (
    <section className="main-diputados" style={{ animation: 'pulse 1.5s infinite' }}>
      <section className="section-diputados">
        <div className="perfil-diputado">
          <div className="columns-15 w-row">
            {/* Foto Skeleton */}
            <div className="w-col w-col-4">
              <div className="foto-de-diputado" style={{ display: 'flex', justifyContent: 'center' }}>
                <div 
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px', 
                    aspectRatio: '3/4', 
                    backgroundColor: '#e0e0e0', 
                    borderRadius: '8px' 
                  }} 
                />
              </div>
            </div>
            
            {/* Información Skeleton */}
            <div className="column-11 w-col w-col-8">
              <div className="informacion-diputado" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ height: '30px', backgroundColor: '#e0e0e0', width: '60%', borderRadius: '4px' }} />
                <div style={{ height: '20px', backgroundColor: '#e0e0e0', width: '40%', borderRadius: '4px' }} />
                <div style={{ height: '20px', backgroundColor: '#e0e0e0', width: '20%', borderRadius: '4px' }} />
              </div>
              
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '100%', borderRadius: '4px' }} />
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '90%', borderRadius: '4px' }} />
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '95%', borderRadius: '4px' }} />
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '80%', borderRadius: '4px' }} />
              </div>
              
              <div className="columns-4 w-row" style={{ marginTop: '30px' }}>
                <div className="w-col w-col-6">
                  <div style={{ height: '20px', backgroundColor: '#e0e0e0', width: '50%', borderRadius: '4px', marginBottom: '10px' }} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ height: '30px', width: '30px', backgroundColor: '#e0e0e0', borderRadius: '50%' }} />
                    <div style={{ height: '30px', width: '30px', backgroundColor: '#e0e0e0', borderRadius: '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Título de Trabajo Skeleton */}
      <section className="section-diputados" style={{ marginTop: '20px' }}>
         <div style={{ height: '25px', backgroundColor: '#e0e0e0', width: '40%', borderRadius: '4px' }} />
      </section>

      {/* Tabs Skeleton */}
      <section className="section-diputados">
        <div className="w-tabs">
          <div className="tabs-menu-3 w-tab-menu" style={{ gap: '10px' }}>
            <div style={{ height: '40px', backgroundColor: '#e0e0e0', width: '120px', borderRadius: '4px' }} />
            <div style={{ height: '40px', backgroundColor: '#e0e0e0', width: '120px', borderRadius: '4px' }} />
            <div style={{ height: '40px', backgroundColor: '#e0e0e0', width: '120px', borderRadius: '4px' }} />
          </div>
          <div className="w-tab-content" style={{ marginTop: '20px' }}>
             <div style={{ height: '200px', backgroundColor: '#e0e0e0', width: '100%', borderRadius: '8px' }} />
          </div>
        </div>
      </section>

      {/* Manejo de Animación inline */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { opacity: 0.8; }
        }
      `}} />
    </section>
  );
}
