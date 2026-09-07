'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [mensaje, setMensaje] = useState('Estamos preparando todo…');

  useEffect(() => {
    const timer = setTimeout(() => {
      setMensaje('Esto puede tardar unos segundos…');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen">
      <style>{`
        @keyframes splashFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes splashLogoIn {
          0% { opacity: 0; transform: translateY(16px) scale(0.94); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes splashTextIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashOrbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.06); }
        }
        @keyframes splashSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes splashPulseSoft {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }

        .splash-screen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #fffdfb;
          animation: splashFadeIn 0.4s ease-out;
        }

        .splash-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.16;
          animation: splashOrbDrift 9s ease-in-out infinite;
        }

        .splash-orb-gold {
          width: 460px;
          height: 460px;
          top: -140px;
          left: -120px;
          background: #d9b077;
        }

        .splash-orb-wine {
          width: 420px;
          height: 420px;
          bottom: -150px;
          right: -110px;
          background: #96134b;
          animation-delay: 1.5s;
        }

        .splash-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 26px;
          padding: 0 24px;
          text-align: center;
        }

        .splash-logo-wrap {
          animation: splashLogoIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
          filter: drop-shadow(0 10px 24px rgba(60, 40, 20, 0.08));
        }

        .splash-logo {
          width: min(340px, 74vw);
          height: auto;
          display: block;
        }

        .splash-divider {
          width: 46px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #bb945c, #96134b);
          animation: splashTextIn 0.6s ease-out 0.2s both;
        }

        .splash-tagline {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          letter-spacing: 0.03em;
          color: #6b6b6f;
          animation: splashTextIn 0.6s ease-out 0.32s both;
        }

        .splash-status-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 4px;
          animation: splashTextIn 0.6s ease-out 0.46s both;
        }

        .splash-spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(150, 19, 75, 0.15);
          border-top-color: #96134b;
          animation: splashSpin 0.85s linear infinite;
        }

        .splash-status {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #96134b;
          animation: splashPulseSoft 1.8s ease-in-out infinite, splashTextIn 0.4s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-screen, .splash-orb, .splash-logo-wrap, .splash-divider,
          .splash-tagline, .splash-status-group, .splash-spinner, .splash-status {
            animation: none !important;
          }
        }
      `}</style>

      <div className="splash-orb splash-orb-gold" />
      <div className="splash-orb splash-orb-wine" />

      <div className="splash-content">
        <div className="splash-logo-wrap">
          <img
            src="/images/congreso_logo_horizontal.png"
            alt="Congreso del Estado de México"
            className="splash-logo"
          />
        </div>
        <div className="splash-divider" />
        <p className="splash-tagline">Tu Congreso conectado y transparente</p>
        <div className="splash-status-group">
          <span className="splash-spinner" />
          <span key={mensaje} className="splash-status">{mensaje}</span>
        </div>
      </div>
    </div>
  );
}
