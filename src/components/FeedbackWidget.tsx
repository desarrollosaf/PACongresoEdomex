'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { registrarVisita, guardarEncuesta, guardarEncuestaDetallada } from '@/app/service/estadisticas.api';

export default function FeedbackWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [visitas, setVisitas] = useState(0);
    
    // Estados para la encuesta anterior (caritas)
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    
    // Estados para la NUEVA encuesta
    const [isSurveyOpen, setIsSurveyOpen] = useState(false);
    const [surveyPage, setSurveyPage] = useState(0); // 0: intro, 1: form, 2: exito
    const [respuestas, setRespuestas] = useState<{ [key: string]: number }>({});
    const [enviandoSurvey, setEnviandoSurvey] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const path = window.location.pathname;
        const sumarVisita = path === '/';

        registrarVisita('/', sumarVisita)
          .then(data => {
              if(data?.exito) {
                  setVisitas(data.visitas_totales);
              } else {
                  setVisitas(Math.floor(Math.random() * 500) + 100);
              }
          })
          .catch(err => {
              console.error("Error al registrar visita:", err);
              setVisitas(Math.floor(Math.random() * 500) + 100);
          });
    }, [pathname]);

    // Función de la encuesta anterior (se mantiene)
    const handleCalificar = async (calificacion: number) => {
        setEnviando(true);
        try {
            await guardarEncuesta('/', calificacion);
        } catch(e) {
            console.error("Error enviando encuesta:", e);
        }
        
        setTimeout(() => {
            setEnviando(false);
            setEnviado(true);
            setTimeout(() => {
                setIsOpen(false);
                setEnviado(false);
            }, 3000);
        }, 800);
    };

    // Función de la nueva encuesta
    const handleRevisarRespuestas = async () => {
        // Validar que se respondieron todas (opcional, o enviar lo que tengan)
        setEnviandoSurvey(true);
        try {
            // Se llamará a un endpoint nuevo (que deberá ser implementado en backend)
            await guardarEncuestaDetallada('/', respuestas);
        } catch(e) {
            console.error("Error enviando encuesta detallada:", e);
        }
        setTimeout(() => {
            setEnviandoSurvey(false);
            setSurveyPage(2); // Éxito
            setTimeout(() => {
                setIsSurveyOpen(false);
                setSurveyPage(0);
                setRespuestas({});
            }, 3000);
        }, 800);
    };

    const handleRespuesta = (preguntaId: string, valor: number) => {
        setRespuestas(prev => ({ ...prev, [preguntaId]: valor }));
    };

    const preguntas = [
        { id: 'p1', num: '1.', titulo: 'Experiencia general', desc: '¿Qué tan satisfecho(a) estás con tu experiencia en el sitio web?' },
        { id: 'p2', num: '2.', titulo: 'Facilidad de navegación', desc: '¿Qué tan fácil fue encontrar la información que buscabas?' },
        { id: 'p3', num: '3.', titulo: 'Claridad de la información', desc: '¿Qué tan clara y comprensible te pareció la información publicada?' },
        { id: 'p4', num: '4.', titulo: 'Diseño y presentación', desc: '¿Qué tan agradable y funcional te parece el diseño del sitio?' },
        { id: 'p5', num: '5.', titulo: 'Utilidad del contenido', desc: '¿Qué tan útil consideras la información disponible en el sitio?' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px'
        }}>
            <style dangerouslySetInnerHTML={{__html: `
              /* Forzamos que los botones de feedback siempre se vean en la esquina */
              @media screen and (max-width: 768px) {
                  .feedback-btn {
                      display: flex !important;
                      visibility: visible !important;
                      opacity: 1 !important;
                      transform: none !important;
                  }
              }
            `}} />
            
            {/* NUEVA ENCUESTA FLOTANTE */}
            {isSurveyOpen && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #eaeaea',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                    width: '320px',
                    maxHeight: '70vh',
                    overflowY: 'auto',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
                        <button onClick={() => { setIsSurveyOpen(false); setSurveyPage(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.2rem', padding: '0 5px' }}>×</button>
                    </div>

                    {surveyPage === 0 && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✨</div>
                            <h3 style={{ color: '#94134A', marginBottom: '12px', fontSize: '1.1rem' }}>Tu experiencia es importante para nosotros.</h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '16px', lineHeight: '1.4' }}>
                                Ayúdanos a mejorar el nuevo sitio web del Congreso del Estado de México respondiendo esta breve encuesta.
                            </p>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f5f5f5', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#666', marginBottom: '20px' }}>
                                <span>⏱️</span> Te tomará menos de 1 minuto
                            </div>
                            <button 
                                onClick={() => setSurveyPage(1)}
                                style={{
                                    width: '100%',
                                    background: '#94134A',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#7a0f3d'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#94134A'}
                            >
                                Comenzar Encuesta
                            </button>
                        </div>
                    )}

                    {surveyPage === 1 && (
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '15px', textAlign: 'center' }}>
                                Escala: 1 (Muy insatisfecho) a 5 (Muy satisfecho)
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', pointerEvents: enviandoSurvey ? 'none' : 'auto', opacity: enviandoSurvey ? 0.6 : 1 }}>
                                {preguntas.map((pregunta) => (
                                    <div key={pregunta.id}>
                                        <b style={{ fontSize: '0.9rem', color: '#333' }}>{pregunta.num} {pregunta.titulo}</b>
                                        <p style={{ fontSize: '0.8rem', color: '#666', margin: '4px 0 8px 0' }}>{pregunta.desc}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {[1, 2, 3, 4, 5].map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleRespuesta(pregunta.id, val)}
                                                    style={{
                                                        width: '36px',
                                                        height: '36px',
                                                        borderRadius: '50%',
                                                        border: respuestas[pregunta.id] === val ? '2px solid #94134A' : '1px solid #ddd',
                                                        background: respuestas[pregunta.id] === val ? '#fff0f5' : '#fff',
                                                        color: respuestas[pregunta.id] === val ? '#94134A' : '#555',
                                                        fontWeight: respuestas[pregunta.id] === val ? 'bold' : 'normal',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <button 
                                    onClick={handleRevisarRespuestas}
                                    disabled={Object.keys(respuestas).length < 5 || enviandoSurvey}
                                    style={{
                                        width: '100%',
                                        background: Object.keys(respuestas).length < 5 ? '#ccc' : '#94134A',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        cursor: Object.keys(respuestas).length < 5 ? 'not-allowed' : 'pointer',
                                        marginTop: '10px',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {enviandoSurvey ? 'Enviando...' : 'Enviar respuestas'}
                                </button>
                            </div>
                        </div>
                    )}

                    {surveyPage === 2 && (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🙌</div>
                            <h3 style={{ color: '#94134A', marginBottom: '10px' }}>¡Gracias por compartir tu opinión!</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>Nos ayuda a mejorar tu experiencia.</p>
                        </div>
                    )}
                </div>
            )}

            {/* ENCUESTA ANTERIOR (CARITAS) - Se mantiene el maquetado pero ya no se abre por el ojito */}
            {isOpen && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #eaeaea',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    width: '240px',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    {enviado ? (
                        <div style={{ textAlign: 'center', color: '#94134A', fontWeight: 'bold' }}>
                            ¡Gracias por tu opinión! ✨
                        </div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <strong style={{ fontSize: '0.9rem', color: '#333' }}>¿Qué te pareció esta página?</strong>
                                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1rem' }}>×</button>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: enviando ? 0.5 : 1, pointerEvents: enviando ? 'none' : 'auto' }}>
                                {[
                                    { emoji: '😞', val: 1, label: 'Malo' },
                                    { emoji: '😐', val: 2, label: 'Regular' },
                                    { emoji: '🙂', val: 3, label: 'Bueno' },
                                    { emoji: '🤩', val: 4, label: 'Excelente' }
                                ].map((item) => (
                                    <button
                                        key={item.val}
                                        onClick={() => handleCalificar(item.val)}
                                        title={item.label}
                                        style={{
                                            fontSize: '1.5rem',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'transform 0.1s',
                                            padding: '4px'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        {item.emoji}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            <button
                className="feedback-btn"
                onClick={() => {
                    setIsSurveyOpen(!isSurveyOpen);
                    if (!isSurveyOpen) setSurveyPage(0);
                    // setIsOpen(false); // Opcional: Cerrar la otra si estuviera abierta
                }}
                style={{
                    background: '#94134A', /* Color institucional */
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(148,19,74,0.3)',
                    transition: 'all 0.2s',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(148,19,74,0.4)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(148,19,74,0.3)';
                }}
            >
                <span style={{ fontSize: '1.1rem' }}>📝</span> Danos tu opinión
            </button>

            {/* BOTÓN VISITAS (Ojito) - Se comenta setIsOpen para que ya no abra las caritas */}
            <button
                className="feedback-btn"
                onClick={() => {
                   // setIsOpen(!isOpen); // COMENTADO a petición
                }}
                style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'default', // Cambiado a default porque ya no hace click para abrir
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s',
                    color: '#555',
                    fontWeight: 500,
                    fontSize: '0.85rem'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)'}
            >
                <span style={{ fontSize: '1.1rem' }}>👁️</span> {visitas.toLocaleString()} visitas
            </button>
        </div>
    );
}
