import Link from "next/link";

export default function Header() {
  return (
    <header className="section-2">
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
        <div className="div-block-9">
          <div data-hover="true" data-delay="100" className="w-dropdown">
            <div className="w-dropdown-toggle">
              <div className="w-icon-dropdown-toggle"></div>
              <div className="menu-option">Tu Congreso</div>
            </div>
            <nav className="dropdown-list w-dropdown-list">
              <Link href="/que-es-el-congreso" className="link-nav-menu w-dropdown-link">¿Que es el Congreso?</Link>
              <Link href="/dependencias" className="link-nav-menu w-dropdown-link">Dependencias</Link>
            </nav>
          </div>
          <div data-hover="true" data-delay="100" className="w-dropdown">
            <div className="w-dropdown-toggle">
              <div className="w-icon-dropdown-toggle"></div>
              <div className="menu-option">Legislatura</div>
            </div>
            <nav className="dropdown-list w-dropdown-list">
              <Link href="/diputados" className="link-nav-menu w-dropdown-link">Integrantes</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Grupos Parlamentarios</Link>
              <Link href="/mesa-directiva" className="link-nav-menu w-dropdown-link">Diputación Permanente</Link>
              <Link href="/junta-de-coordinacion-politica" className="link-nav-menu w-dropdown-link">Junta de Coordinación Política</Link>
              <Link href="/comisiones" className="link-nav-menu w-dropdown-link">Comisiones y Comités</Link>
            </nav>
          </div>
          <Link href="/trabajo-legislativo" className="link-block-3 w-inline-block">
            <div className="menu-option">Actividad Legislativa</div>
          </Link>
          <div data-hover="true" data-delay="100" className="w-dropdown">
            <div className="w-dropdown-toggle">
              <div className="w-icon-dropdown-toggle"></div>
              <div className="menu-option">Transparencia</div>
            </div>
            <nav className="dropdown-list w-dropdown-list">
              <Link href="/unidad-de-informacion" className="w-dropdown-link">Unidad de Información</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Transparencia Proactiva</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Gaceta Parlamentaria</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Declaraciones Patrimoniales</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Fiscalización Superior</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Remuneraciones</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Solicitudes de Información</Link>
            </nav>
          </div>
          <div data-hover="true" data-delay="100" className="w-dropdown">
            <div className="w-dropdown-toggle">
              <div className="w-icon-dropdown-toggle"></div>
              <div className="menu-option">Comunicación</div>
            </div>
            <nav className="dropdown-list w-dropdown-list">
              <Link href="#" className="link-nav-menu w-dropdown-link">Comunicados</Link>
              <Link href="#" className="link-nav-menu w-dropdown-link">Síntesis informativa</Link>
              <a href="https://dialogo.congresoedomex.gob.mx/" target="_blank" rel="noreferrer" className="link-nav-menu w-dropdown-link">Diálogo</a>
              <Link href="#" className="link-nav-menu w-dropdown-link">Notas Hora x Hora</Link>
            </nav>
          </div>
          <div data-hover="true" data-delay="100" className="w-dropdown">
            <div className="w-dropdown-toggle">
              <div className="w-icon-dropdown-toggle"></div>
              <div className="menu-option">Contacto</div>
            </div>
            <nav className="dropdown-list w-dropdown-list">
              <Link href="#" className="link-nav-menu w-dropdown-link">Directorio Telefónico</Link>
            </nav>
          </div>
        </div>
        <img src="/images/menu_24dp_96134B_FILL0_wght400_GRAD0_opsz24.png" loading="lazy" alt="" className="image-12" />
      </div>
    </header>
  );
}
