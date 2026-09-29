'use client';

import { useEffect, useRef } from 'react';
import DiagramaParlamentario from '@/components/DiagramaParlamentario';

// Orden, colores e imágenes de cada grupo parlamentario. El conteo de
// diputados NO va aquí: se llena en tiempo de render con lo que venga de
// la API (o con CONTEOS_RESPALDO si la API falla o viene vacía).
const PARTIDOS_BASE = [
    { id: 'morena', nombre: 'Morena', clase: '', img: 'images/morena.png', srcSet: 'images/morena-p-500.png 500w, images/morena.png 839w', sizes: '(max-width: 839px) 100vw, 839px', color: '#9b2d25' },
    { id: 'pvem', nombre: 'PVEM', clase: 'btn-pvem', img: 'images/PVEM.png', srcSet: 'images/PVEM-p-500.png 500w, images/PVEM-p-800.png 800w, images/PVEM.png 852w', sizes: '(max-width: 852px) 100vw, 852px', color: '#7aae52' },
    { id: 'pt', nombre: 'PT', clase: 'btn-pt', img: 'images/PT.png', srcSet: 'images/PT-p-500.png 500w, images/PT.png 852w', sizes: '(max-width: 852px) 100vw, 852px', color: '#9b1010' },
    { id: 'pri', nombre: 'PRI', clase: 'btn-pri', img: 'images/PRI.png', srcSet: 'images/PRI-p-500.png 500w, images/PRI-p-800.png 800w, images/PRI.png 825w', sizes: '(max-width: 825px) 100vw, 825px', color: '#ce1b28' },
    { id: 'pan', nombre: 'PAN', clase: 'btn-pan', img: 'images/Pan.png', srcSet: 'images/Pan-p-500.png 500w, images/Pan.png 840w', sizes: '(max-width: 840px) 100vw, 840px', color: '#233ea2' },
    { id: 'mc', nombre: 'MC', clase: 'btn-mc', img: 'images/MC.png', srcSet: 'images/MC-p-500.png 500w, images/MC.png 799w', sizes: '(max-width: 799px) 100vw, 799px', color: '#d68128' },
    { id: 'prd', nombre: 'PRD', clase: 'btn-prd', img: 'images/PRD.png', srcSet: 'images/PRD-p-500.png 500w, images/PRD.png 775w', sizes: '(max-width: 775px) 100vw, 775px', color: '#eec730' },
    { id: 'indep', nombre: 'Indep.', clase: 'btn-indep', img: 'images/indep.svg', srcSet: '', sizes: '', color: '#454545' },
];

// Respaldo, NO la fuente: conteos fijos usados solo si el fetch a la API
// falla o devuelve vacío, para no renderizar un hemiciclo sin puntos.
const CONTEOS_RESPALDO: Record<string, number> = {
    morena: 39,
    pvem: 9,
    pt: 8,
    pri: 6,
    pan: 6,
    mc: 5,
    prd: 2,
    indep: 0,
};

function calcularPorcentaje(diputados: number, totalDiputados: number): string {
    if (totalDiputados <= 0) return '0%';
    const conDecimal = ((diputados / totalDiputados) * 100).toFixed(1);
    const valor = conDecimal.endsWith('.0') ? conDecimal.slice(0, -2) : conDecimal;
    return `${valor}%`;
}

interface ParlamentaryStatsProps {
    onSelectPartido?: (id: string) => void;
    partidoSeleccionado?: string | null;
    conteosPorPartido?: Record<string, number>;
}

export default function ParlamentaryStats({ onSelectPartido, partidoSeleccionado, conteosPorPartido }: ParlamentaryStatsProps = {}) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const totalDesdeApi = conteosPorPartido
        ? Object.values(conteosPorPartido).reduce((acc, n) => acc + n, 0)
        : 0;
    const conteos = totalDesdeApi > 0 ? conteosPorPartido! : CONTEOS_RESPALDO;

    const PARTIDOS = PARTIDOS_BASE.map((p) => ({ ...p, diputados: conteos[p.id] ?? 0 }));
    const totalDiputados = PARTIDOS.reduce((acc, p) => acc + p.diputados, 0);

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
            <div ref={imgRef} className="img-parlamentaria img-parlamentaria-anim">
                <DiagramaParlamentario grupos={PARTIDOS} />
            </div>
            <div className="features-wrapper">
                {PARTIDOS.filter(p => p.diputados > 0).map((p, i) => (
                    <div
                        key={p.img}
                        className={`features-block features-block-anim ${i % 2 === 0 ? 'sube' : 'no-sube'}`}
                    >
                        <img
                            src={p.img}
                            loading="lazy"
                            sizes={p.sizes}
                            srcSet={p.srcSet}
                            alt=""
                            className="image-23"
                        />
                        <div className="features-title">{calcularPorcentaje(p.diputados, totalDiputados)}</div>
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