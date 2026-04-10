'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type DropdownKey = 'congreso' | 'legislatura' | 'transparencia' | 'comunicacion' | 'contacto' | null;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<DropdownKey>(null);
  const [menuOpen, setMenuOpen] = useState(false); // ← estado del menú móvil
  const headerRef = useRef<HTMLElement>(null);

  // Cerrar dropdown al cambiar de ruta
  useEffect(() => {
    setOpen(null);
    setMenuOpen(false); // ← también cerrar menú móvil al navegar
  }, [pathname]);

  // Cerrar al hacer click fuera del header
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (key: DropdownKey) => setOpen(prev => prev === key ? null : key);

  const Dropdown = ({ id, label, children }: { id: DropdownKey; label: string; children: React.ReactNode }) => (
    <div className={`w-dropdown${open === id ? ' w--open' : ''}`}>
      <div className="w-dropdown-toggle" onClick={() => toggle(id)} style={{ cursor: 'pointer' }}>
        <div className="w-icon-dropdown-toggle"></div>
        <div className="menu-option">{label}</div>
      </div>
      {open === id && (
        <nav className="dropdown-list w-dropdown-list w--open" onClick={() => setOpen(null)}>
          {children}
        </nav>
      )}
    </div>
  );

  return (
    <header className="section-2" ref={headerRef}>
      <div className="div-block-8">
        <Link href="/" aria-current="page" className="w-inline-block w--current">
          <img
            src="/images/congreso_logo_horizontal.png"
            loading="lazy"
            sizes="(max-width: 5195px) 100vw, 5195px"
            srcSet="/images/congreso_logo_horizontal-p-500.png 500w, /images/congreso_logo_horizontal-p-800.png 800w, /images/congreso_logo_horizontal-p-1080.png 1080w, /images/congreso_logo_horizontal-p-1600.png 1600w, /images/congreso_logo_horizontal-p-2000.png 2000w, /images/congreso_logo_horizontal-p-2600.png 2600w, /images/congreso_logo_horizontal-p-3200.png 3200w, /images/congreso_logo_horizontal.png 5195w"
            alt="Logo"
            className="image"
          />
        </Link>

        {/* Menú desktop — se oculta en móvil con CSS */}
        <div className={`div-block-9 ${menuOpen ? 'menu-movil-abierto' : ''}`}>
          <Dropdown id="congreso" label="Tu Congreso">
            <Link href="/que-es-el-congreso" className="link-nav-menu w-dropdown-link">¿Que es el Congreso?</Link>
            <Link href="/dependencias" className="link-nav-menu w-dropdown-link">Dependencias</Link>
          </Dropdown>

          <Dropdown id="legislatura" label="Legislatura">
            <Link href="/diputados" className="link-nav-menu w-dropdown-link">Integrantes</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Grupos Parlamentarios</Link>
            <Link href="/mesa-directiva" className="link-nav-menu w-dropdown-link">Diputación Permanente</Link>
            <Link href="/junta-de-coordinacion-politica" className="link-nav-menu w-dropdown-link">Junta de Coordinación Política</Link>
            <Link href="/comisiones" className="link-nav-menu w-dropdown-link">Comisiones y Comités</Link>
          </Dropdown>

          <Link href="/trabajo-legislativo" className="link-block-3 w-inline-block" onClick={() => setOpen(null)}>
            <div className="menu-option">Actividad Legislativa</div>
          </Link>

          <Dropdown id="transparencia" label="Transparencia">
            <Link href="/unidad-de-informacion" className="w-dropdown-link">Unidad de Información</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Transparencia Proactiva</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Gaceta Parlamentaria</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Declaraciones Patrimoniales</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Fiscalización Superior</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Remuneraciones</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Solicitudes de Información</Link>
          </Dropdown>

          <Dropdown id="comunicacion" label="Comunicación">
            <Link href="#" className="link-nav-menu w-dropdown-link">Comunicados</Link>
            <Link href="#" className="link-nav-menu w-dropdown-link">Síntesis informativa</Link>
            <a href="https://dialogo.congresoedomex.gob.mx/" target="_blank" rel="noreferrer" className="link-nav-menu w-dropdown-link">Diálogo</a>
            <Link href="#" className="link-nav-menu w-dropdown-link">Notas Hora x Hora</Link>
          </Dropdown>

          <Dropdown id="contacto" label="Contacto">
            <Link href="#" className="link-nav-menu w-dropdown-link">Directorio Telefónico</Link>
          </Dropdown>
        </div>

        {/* Botón hamburguesa — solo visible en móvil */}
        <img
          src="/images/menu_24dp_96134B_FILL0_wght400_GRAD0_opsz24.png"
          loading="lazy"
          alt="Menú"
          className="image-12"
          onClick={() => setMenuOpen(prev => !prev)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </header>
  );
}