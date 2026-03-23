'use client';

import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type PerfilProps = {
  diputado: any;
};

export default function PerfilDiputadoView({ diputado }: PerfilProps) {
  const [activeTab, setActiveTab] = useState<'iniciativas' | 'comunicados' | 'comisiones'>('iniciativas');

  const integrante = diputado.integrantes?.[0];
  const partido = integrante?.partido;
  const distrito = integrante?.distrito;
  const foto = diputado.fotos?.[0];
  const fotoUrl = foto?.path ? `https://www.congresoedomex.gob.mx/${foto.path}` : 'images/placeholder-diputado.png';

  const nombreCompleto = `${diputado.nombres ?? ''} ${diputado.apaterno ?? ''} ${diputado.amaterno ?? ''}`.trim();
  const cargo = distrito?.distrito ?? 'Diputado Plurinominal';
  const siglasPartido = partido?.siglas ?? 'S/P';

  // Comunicados
  const comunicados = diputado.autores_comunicados?.map((ac: any) => ac.comunicado) || [];

  // Comisiones
  const comisiones = integrante?.comisiones || [];

  return (
    <section className="main-diputados">
      <section className="section-diputados">
        <div className="perfil-diputado">
          <div className="columns-15 w-row">
            <div className="w-col w-col-4">
              <div className="foto-de-diputado">
                <img src={fotoUrl} loading="lazy" alt={nombreCompleto} className="image-16" />
              </div>
            </div>
            <div className="column-11 w-col w-col-8">
              <div className="informacion-diputado">
                <h4 className="heading-14">{nombreCompleto}</h4>
                <div>{cargo}</div>
                <div className="text-block-19">{siglasPartido}</div>
              </div>
              
              <p className="paragraph-6">
                {diputado.descripcion || 'Sin descripción disponible.'}
              </p>
              
              <div className="columns-4 w-row">
                <div className="w-col w-col-6">
                  <div className="div-block-16" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <p className="paragraph-3">Contacto</p>
                    {diputado.email && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                         {/* <img src="images/mail_icon.png" loading="lazy" alt="Email" className="image-4" style={{ width: '20px' }} /> */}
                        <span>{diputado.email}</span>
                      </div>
                    )}
                    {diputado.telefono && (
                      <div>Tel: {diputado.telefono} {diputado.ext ? `Ext. ${diputado.ext}` : ''}</div>
                    )}
                    {diputado.linkweb && (
                      <a href={diputado.linkweb} target="_blank" rel="noreferrer" style={{ marginTop: '4px', textDecoration: 'underline' }}>Sitio Web</a>
                    )}
                  </div>
                </div>
                <div className="column-5 w-col w-col-6">
                  <div>
                    <p className="paragraph-3">Redes Sociales</p>
                  </div>
                  <div className="social-media" style={{ display: 'flex', gap: '10px' }}>
                    {diputado.facebook && (
                      <a href={diputado.facebook} target="_blank" rel="noreferrer">
                        FB
                        {/* <img src="images/facebook_icon.png" loading="lazy" alt="Facebook" className="image-5" /> */}
                      </a>
                    )}
                    {diputado.twitter && (
                      <a href={diputado.twitter} target="_blank" rel="noreferrer">
                         X
                        {/* <img src="images/x_icon.png" loading="lazy" alt="X" className="image-6" /> */}
                      </a>
                    )}
                    {diputado.instagram && (
                      <a href={diputado.instagram} target="_blank" rel="noreferrer">
                        IG
                        {/* <img src="images/instagram_icon.png" loading="lazy" alt="Instagram" className="image-7" /> */}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-diputados">
        <h4 className="heading-15">Trabajo de {nombreCompleto}</h4>
      </section>
      
      <section className="section-diputados">
        <div className="w-tabs">
          <div className="tabs-menu-3 w-tab-menu">
            <a 
              onClick={() => setActiveTab('iniciativas')} 
              style={{ cursor: 'pointer' }}
              className={`tab-link-iniciativas w-inline-block w-tab-link ${activeTab === 'iniciativas' ? 'w--current' : ''}`}
            >
              <div className="text-block-23">Iniciativas</div>
            </a>
            <a 
              onClick={() => setActiveTab('comunicados')} 
              style={{ cursor: 'pointer' }}
              className={`tab-link-comunicados w-inline-block w-tab-link ${activeTab === 'comunicados' ? 'w--current' : ''}`}
            >
              <div className="text-block-22">Comunicados</div>
            </a>
            <a 
              onClick={() => setActiveTab('comisiones')} 
              style={{ cursor: 'pointer' }}
              className={`tab-link-comisiones w-inline-block w-tab-link ${activeTab === 'comisiones' ? 'w--current' : ''}`}
            >
              <div className="text-block-21">Comisiones</div>
            </a>
          </div>
          <div className="w-tab-content">
            {activeTab === 'iniciativas' && (
              <div className="tab-area w-tab-pane w--tab-active">
                <div className="div-block-67">
                  <div style={{ opacity: 0.6, padding: '2rem 0' }}>
                    Aún no hay iniciativas registradas para este diputado.
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'comunicados' && (
              <div className="tab-pane-comunicados w-tab-pane w--tab-active">
                {comunicados.length === 0 ? (
                  <div style={{ opacity: 0.6, padding: '2rem 0' }}>No hay comunicados disponibles.</div>
                ) : (
                  <div>
                    <div className="w-layout-grid grid-12">
                      {comunicados.map((c: any) => (
                        <div key={c.id} className="div-block-43">
                          {/* Placeholder image for news if photos relation is missing or empty */}
                          <img src="images/140797863-45ff-49ef-abd3-b3e295d21f7b-p-500.jpg" loading="lazy" className="img-boletin" alt="Comunicado" />
                          <h4 className="titulo-comunicado-general">{c.titulo}</h4>
                          <a href="#" className="btn-black-str w-button">Abrir Comunicado</a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'comisiones' && (
              <div className="w-tab-pane w--tab-active">
                {comisiones.length === 0 ? (
                  <div style={{ opacity: 0.6, padding: '2rem 0' }}>No hay comisiones asignadas.</div>
                ) : (
                  <div className="w-layout-grid grid-11">
                    {comisiones.map((ic: any) => (
                      <div key={ic.id} className="div-block-42">
                         {/* Placeholder icon */}
                        <div style={{ width: 40, height: 40, background: '#ccc', borderRadius: '50%', marginBottom: 10 }}></div>
                        <div>
                          <div className="texto-comision">{ic.comision?.nombre || 'Comisión'}</div>
                          <div className="texto-bold-comision">{ic.tipo_cargo?.valor || 'Miembro'}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
