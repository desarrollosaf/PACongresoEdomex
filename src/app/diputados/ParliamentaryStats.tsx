'use client';

import { useEffect, useRef } from 'react';

const PARTIDOS = [
    { img: 'images/morena.png', srcSet: 'images/morena-p-500.png 500w, images/morena.png 839w', sizes: '(max-width: 839px) 100vw, 839px', porcentaje: '52%' },
    { img: 'images/PVEM.png', srcSet: 'images/PVEM-p-500.png 500w, images/PVEM-p-800.png 800w, images/PVEM.png 852w', sizes: '(max-width: 852px) 100vw, 852px', porcentaje: '12%' },
    { img: 'images/PT.png', srcSet: 'images/PT-p-500.png 500w, images/PT.png 852w', sizes: '(max-width: 852px) 100vw, 852px', porcentaje: '10.7%' },
    { img: 'images/PRI.png', srcSet: 'images/PRI-p-500.png 500w, images/PRI-p-800.png 800w, images/PRI.png 825w', sizes: '(max-width: 825px) 100vw, 825px', porcentaje: '9.3%' },
    { img: 'images/Pan.png', srcSet: 'images/Pan-p-500.png 500w, images/Pan.png 840w', sizes: '(max-width: 840px) 100vw, 840px', porcentaje: '8%' },
    { img: 'images/MC.png', srcSet: 'images/MC-p-500.png 500w, images/MC.png 799w', sizes: '(max-width: 799px) 100vw, 799px', porcentaje: '5.3%' },
    { img: 'images/PRD.png', srcSet: 'images/PRD-p-500.png 500w, images/PRD.png 775w', sizes: '(max-width: 775px) 100vw, 775px', porcentaje: '2.7%' },
];

export default function ParliamentaryStats() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

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
        <div className="div-block-36" ref={wrapperRef}>
            <img
                ref={imgRef}
                src="images/grupo-parlamentario-2.png"
                loading="lazy"
                sizes="(max-width: 1666px) 100vw, 1666px"
                alt=""
                srcSet="images/grupo-parlamentario-2-p-500.png 500w, images/grupo-parlamentario-2-p-800.png 800w, images/grupo-parlamentario-2-p-1080.png 1080w, images/grupo-parlamentario-2-p-1600.png 1600w, images/grupo-parlamentario-2.png 1666w"
                className="img-parlamentaria img-parlamentaria-anim"
            />
            <div className="features-wrapper">
                {PARTIDOS.map((p, i) => (
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
                        <div className="features-title">{p.porcentaje}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}