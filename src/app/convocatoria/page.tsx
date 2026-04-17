export default function ConvocatoriaPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        margin: 0,
        padding: 0,
        zIndex: 9999,
        background: "#fff",
      }}
    >
      <iframe
        src="/landing/convocatoria/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "0",
          display: "block",
        }}
      />
    </div>
  );
}