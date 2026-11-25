'use client';

import { useEffect, useRef } from 'react';
import { COLOR_SIN_PARTIDO, type GrupoParlamentario } from './grupos';

// Geometría de la gráfica de curules (unidades del viewBox)
const FILAS = 4;
const RADIO = 20.5;
const PASO_X = 109;
const PASO_Y = 101;

interface ParlamentaryStatsProps {
    grupos: GrupoParlamentario[];
    sinPartido: number;
    onSelectPartido?: (id: string) => void;
    partidoSeleccionado?: string | null;
}

export default function ParlamentaryStats({ grupos, sinPartido, onSelectPartido, partidoSeleccionado }: ParlamentaryStatsProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<SVGSVGElement>(null);

    // Una curul por diputado, agrupadas por partido y al final las que no tienen partido
    const curules = grupos.flatMap((g) =>
        Array.from({ length: g.total }, () => ({ color: g.color, nombre: g.nombre }))
    );
    for (let i = 0; i < sinPartido; i++) {
        curules.push({ color: COLOR_SIN_PARTIDO, nombre: 'Sin partido' });
    }
    const columnas = Math.ceil(curules.length / FILAS);
    const descripcion = grupos
        .map((g) => `${g.nombre}: ${g.total}`)
        .concat(sinPartido > 0 ? `Sin partido: ${sinPartido}` : [])
        .join(', ');

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            /* Los que SUBEN (índice par) */
            .features-block-anim.sube {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .features-block-anim.sube.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .features-block-anim.sube.hidden {
                opacity: 0;
                transform: translateY(40px);
            }

            /* Los que NO SUBEN (índice impar) */
            .features-block-anim.no-sube {
                opacity: 0;
                transition: opacity 0.6s ease;
                transform: translateY(0);
            }
            .features-block-anim.no-sube.visible {
                opacity: 1;
            }
            .features-block-anim.no-sube.hidden {
                opacity: 0;
            }

            /* Parallax imagen */
            .img-parlamentaria-anim {
                will-change: transform;
                transition: transform 0.1s linear;
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    // Parallax en la imagen
    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const handleScroll = () => {
            const rect = img.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.bottom > 0 && rect.top < windowHeight) {
                const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
                const offset = (scrolled - 0.5) * 80;
                img.style.transform = `translateY(${offset}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fade + stagger escalonado con sube/no-sube alternado
    useEffect(() => {
        const blocks = wrapperRef.current?.querySelectorAll<HTMLElement>('.features-block-anim');
        if (!blocks) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const block = entry.target as HTMLElement;
                    const index = Array.from(blocks).indexOf(block);

                    if (entry.isIntersecting) {
                        block.classList.remove('hidden');
                        setTimeout(() => {
                            block.classList.add('visible');
                        }, index * 120); // stagger de 120ms entre cada logo
                    } else {
                        block.classList.remove('visible');
                        block.classList.add('hidden');
                    }
                });
            },
            { threshold: 0.2 }
        );

        blocks.forEach((block) => observer.observe(block));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="div-block-36" ref={wrapperRef} style={{ width: '100%' }}>
            {curules.length > 0 && (
                <svg
                    ref={imgRef}
                    viewBox={`0 0 ${(columnas - 1) * PASO_X + RADIO * 2} ${(FILAS - 1) * PASO_Y + RADIO * 2}`}
                    role="img"
                    aria-label={`Integración del Congreso por partido. ${descripcion}`}
                    className="img-parlamentaria img-parlamentaria-anim"
                    style={{ width: '100%', height: 'auto' }}
                >
                    {curules.map((c, i) => (
                        <circle
                            key={i}
                            cx={RADIO + Math.floor(i / FILAS) * PASO_X}
                            cy={RADIO + (i % FILAS) * PASO_Y}
                            r={RADIO}
                            fill={c.color}
                        >
                            <title>{c.nombre}</title>
                        </circle>
                    ))}
                </svg>
            )}
            <div className="features-wrapper">
                {grupos.map((p, i) => (
                    <div
                        key={p.id}
                        className={`features-block features-block-anim ${i % 2 === 0 ? 'sube' : 'no-sube'}`}
                    >
                        {p.logo && (
                            <img
                                src={p.logo}
                                loading="lazy"
                                sizes={p.sizes}
                                srcSet={p.srcSet}
                                alt=""
                                className="image-23"
                            />
                        )}
                        {p.porcentaje && <div className="features-title">{p.porcentaje}</div>}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onSelectPartido) {
                                    onSelectPartido(p.id);
                                } else {
                                    window.location.href = `?partido=${p.id}`;
                                }
                            }}
                            className={`button grupo_parlamentario btn-grupo-parlamentario w-button ${p.clase}`}
                            style={{ 
                                marginTop: '15px',
                                opacity: partidoSeleccionado && partidoSeleccionado !== p.id ? 0.6 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {p.nombre}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}