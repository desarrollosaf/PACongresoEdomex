import NotasSection from './NotasSection';

export const metadata = {
  title: 'Notas hora por hora | Congreso del Estado de México',
  description: 'Monitoreo de medios: Notas hora por hora del Congreso del Estado de México.',
};

export default function NotasHoraPorHoraPage() {
  return (
    <>
      <section>
        <div className="div-hero">
          <br />
          <h1 className="titulo-seccion">Notas hora por hora</h1>
          <p className="subtitulo-info-centrado">
            Seguimiento en tiempo real a las notas y menciones del Congreso del Estado de México en medios de comunicación.
          </p>
        </div>
      </section>

      <NotasSection />
    </>
  );
}
