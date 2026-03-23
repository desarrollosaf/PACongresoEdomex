'use client';

import { useState } from 'react';

// Quita etiquetas HTML y espacios sobrantes del texto que viene de la BD
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

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

  // para quitar los espacios de las reds
  const facebook = diputado.facebook?.trim() || '';
  const twitter = diputado.twitter?.trim() || '';
  const instagram = diputado.instagram?.trim() || '';
  const email = diputado.email?.trim() || '';
  const telefono = diputado.telefono?.trim() || '';
  const ext = diputado.ext?.trim() || '';
  const linkweb = diputado.linkweb?.trim() || '';

  // Comunicados vienen del integrante_legislatura (autor_id = integrante_legislatura.id)
  const comunicados = (integrante?.autores_comunicados?.map((ac: any) => ac.comunicado).filter(Boolean) || [])
    .sort((a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  // Comisiones ordenadas por nivel ASC (1 = más alto cargo)
  const comisiones = [...(integrante?.comisiones || [])].sort(
    (a: any, b: any) => (a.tipo_cargo?.nivel ?? 99) - (b.tipo_cargo?.nivel ?? 99)
  );

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
                    {email && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <a
                          href={`mailto:${facebook}`}
                          target="_blank" rel="noreferrer"
                        >
                          <img src="/images/mail_icon.png" loading="lazy" alt="" className="image-4"/>
                        </a>
                        
                        
                        {/* <span>{email}</span><img src="images/mail_icon.png" loading="lazy" alt="" className="image-4"/> */}
                      </div>
                    )}
                    {/* {telefono && (
                      <div>Tel: {telefono} {ext ? `Ext. ${ext}` : ''}</div>
                    )}
                    {linkweb && (
                      <a href={linkweb} target="_blank" rel="noreferrer" style={{ marginTop: '4px', textDecoration: 'underline' }}>Sitio Web</a>
                    )} */}
                  </div>
                </div>
                {(facebook || twitter || instagram) && (
                  <div className="column-5 w-col w-col-6">
                    <div>
                      <p className="paragraph-3">Redes Sociales</p>
                    </div>
                    <div className="social-media" style={{ display: 'flex', gap: '10px' }}>
                      {facebook && (
                        <a
                          href={facebook.startsWith('http') ? facebook : `https://www.facebook.com/${facebook}`}
                          target="_blank" rel="noreferrer"
                        >
                          <img src="/images/facebook_icon.png" loading="lazy" alt="Facebook" className="image-5" />
                        </a>
                      )}
                      {twitter && (
                        <a
                          href={twitter.startsWith('http') ? twitter : `https://x.com/${twitter}`}
                          target="_blank" rel="noreferrer"
                        >
                          <img src="/images/x_icon.png" loading="lazy" alt="X" className="image-6" />
                        </a>
                      )}
                      {instagram && (
                        <a
                          href={instagram.startsWith('http') ? instagram : `https://www.instagram.com/${instagram}`}
                          target="_blank" rel="noreferrer"
                        >
                          <img src="/images/instagram_icon.png" loading="lazy" alt="Instagram" className="image-7" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
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
                    {/* --- Comunicado destacado (el más reciente) --- */}
                    {(() => {
                      const c = comunicados[0];
                      const fotoPath = c?.fotos?.[0]?.path;
                      const imgUrl = fotoPath ? `https://www.congresoedomex.gob.mx/${fotoPath}` : undefined;
                      return (
                        <div className="div-block-44">
                          <div className="columns-14 w-row">
                            {imgUrl && (
                              <div className="w-col w-col-6">
                                <img src={imgUrl} loading="lazy" className="image-28" alt={c.titulo} />
                              </div>
                            )}
                            <div className={imgUrl ? 'w-col w-col-6' : 'w-col w-col-12'}>
                              <h2 className="heading-38">{c.titulo}</h2>
                              {c.texto && (
                                <div
                                  dangerouslySetInnerHTML={{ __html: c.texto }}
                                  style={{ ['--empty-p' as any]: 'none' }}
                                  className="comunicado-texto"
                                />
                              )}
                              <a href="" className="btn-black-str w-button">Abrir Comunicado</a>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* --- El resto en grid --- */}
                    {comunicados.length > 1 && (
                      <div className="w-layout-grid grid-12">
                        {comunicados.slice(1).map((c: any) => {
                          const fotoPath = c?.fotos?.[0]?.path;
                          const imgUrl = fotoPath ? `https://www.congresoedomex.gob.mx/${fotoPath}` : undefined;
                          return (
                            <div key={c.id} className="div-block-43">
                              {imgUrl && (
                                <img src={imgUrl} loading="lazy" className="img-boletin" alt={c.titulo} />
                              )}
                              <h4 className="titulo-comunicado-general">{c.titulo}</h4>
                              <a href="#" className="btn-black-str w-button">Abrir Comunicado</a>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
                    {comisiones.map((ic: any) => {
                      const isPresidencia = ic.tipo_cargo?.nivel === 1;
                      return (
                        <div key={ic.id} className="div-block-42">
                          <img
                            loading="lazy"
                            src={isPresidencia ? '/images/presidenta.png' : '/images/comision-general.png'}
                            alt=""
                            className={isPresidencia ? 'img-comision-top' : 'img-comision-general'}
                          />
                          <div>
                            <div className="texto-comision">{ic.comision?.nombre || 'Comisión'}</div>
                            <div className="texto-bold-comision">{ic.tipo_cargo?.valor || 'Miembro'}</div>
                          </div>
                        </div>
                      );
                    })}
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
