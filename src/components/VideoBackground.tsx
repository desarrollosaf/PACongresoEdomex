"use client";

export default function VideoBackground() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
        src="/videos/videoCongreso.mp4"
      />
    </div>
  );
}
