import { Suspense } from 'react';
import TrabajoLegislativo from './trabajolegislativo';

export default function TrabajoLegislativoPage() {
  return (
    <section className="main-legislativo">
      <h2 className="titulo-seccion trabajo-legislativo">
        Trabajo Legislativo
      </h2>

      <Suspense>
        <TrabajoLegislativo />
      </Suspense>
    </section>
  );
}