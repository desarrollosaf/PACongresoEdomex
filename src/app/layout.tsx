import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/Chatbot/FloatingChat";
import FeedbackWidget from "@/components/FeedbackWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Congreso_Edo_Mex",
  description: "Tu Congreso conectado y transparente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-wf-page="68dd617b668359798a899405" data-wf-site="68dd617a668359798a8993c6" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta property="og:type" content="website"/>
       <meta property="og:image" content="href=https://congresoedomex.gob.mx/storage/images/favicon.svg"/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="1024"/>
        <meta property="og:image:height" content="683"/>
        
        <link href="/css/normalize.css" rel="stylesheet" type="text/css" />
        <link href="/css/webflow.css" rel="stylesheet" type="text/css" />
        <link href="/css/congreso-edo-mex.webflow.css" rel="stylesheet" type="text/css" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
        <link href="/images/webclip.png" rel="apple-touch-icon" />
        <link rel="shortcut icon" href="https://sistema.congresoedomex.gob.mx/storage/images/favicon.svg"></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
      </head>
      <body className="body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FeedbackWidget />
        {/* <FloatingChat /> */}
        <Script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68dd617a668359798a8993c6" strategy="beforeInteractive" crossOrigin="anonymous" />
        <Script src="/js/webflow.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
