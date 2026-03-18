export default function Footer() {
  return (
    <section className="section-4">
      <div className="columns-7 w-row">
        <div className="w-col w-col-4">
          <div className="text-block-8">
            Plaza Hidalgo s/n, Col. Centro Toluca de Lerdo, Estado de México<br />
            Conmutador (722) 279-6400
          </div>
        </div>
        <div className="column-10 w-col w-col-4">
          <img src="/images/logo-animado.gif" loading="lazy" alt="Logo Animado" className="image-11" />
        </div>
        <div className="w-col w-col-4">
          <div className="social-media">
            <a href="https://www.facebook.com/CongresoEdomex" target="_blank" rel="noreferrer" className="w-inline-block">
              <img src="/images/facebook_icon.png" loading="lazy" alt="Facebook" className="image-5" />
            </a>
            <a href="https://x.com/CongresoEdomex" target="_blank" rel="noreferrer" className="w-inline-block">
              <img src="/images/x_icon.png" loading="lazy" alt="X" className="image-6" />
            </a>
            <a href="https://www.instagram.com/congresoedomex" target="_blank" rel="noreferrer" className="w-inline-block">
              <img src="/images/instagram_icon.png" loading="lazy" alt="Instagram" className="image-7" />
            </a>
            <a href="https://www.tiktok.com/@congresoedomex" target="_blank" rel="noreferrer" className="w-inline-block">
              <img 
                src="/images/tiktok_icono.png" 
                loading="lazy" 
                sizes="(max-width: 479px) 100vw, (max-width: 763px) 97vw, (max-width: 767px) 741px, 31vw" 
                srcSet="/images/tiktok_icono-p-500.png 500w, /images/tiktok_icono.png 741w" 
                alt="TikTok" 
                className="image-7" 
              />
            </a>
            <a href="https://www.youtube.com/@CongresoEdomex" target="_blank" rel="noreferrer" className="w-inline-block">
              <img src="/images/youtube_icon.png" loading="lazy" alt="YouTube" className="image-8 youtube-icono" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
