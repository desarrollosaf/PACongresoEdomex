'use client';

import Script from "next/script";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeedbackWidget from "@/components/FeedbackWidget";
import FloatingChat from "@/components/Chatbot/FloatingChat";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isConvocatoria = pathname.startsWith("/convocatoria");
  const isReconocimiento = pathname.startsWith("/reconocimientodocente");

  return (
    <>
      {!isConvocatoria && !isReconocimiento && <Header />}

      <main className="flex-1">
        {children}
      </main>

      {!isConvocatoria && !isReconocimiento && <Footer />}
      {!isConvocatoria && !isReconocimiento && <FeedbackWidget />}
      {/* {!isConvocatoria && <FloatingChat />} */}

      {!isConvocatoria && !isReconocimiento && (
        <>
          <Script
            src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68dd617a668359798a8993c6"
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
          <Script src="/js/webflow.js" strategy="lazyOnload" />
        </>
      )}
    </>
  );
}