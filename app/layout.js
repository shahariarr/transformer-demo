import './common.css';
import './globals.css';
import UIProvider from '@/components/UIProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Chatbot from '@/components/Chatbot';
import Dialog from '@/components/Dialog';
import Search from '@/components/Search';
import Motion from '@/components/Motion';
import LinkInterceptor from '@/components/LinkInterceptor';

export const metadata = {
  title: {
    default: 'BPEL | Heavy-Duty Transformers, Substations & Power Engineering',
    template: '%s | BPEL'
  },
  description: 'BPEL - Leading heavy power transformer manufacturing, medium-voltage substations, and electrical power engineering infrastructure.',
  icons: { icon: { url: '/assets/images/logo.png', type: 'image/png' } }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1E3C'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Reveal animations hide content until scripts run; without JS everything stays visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UIProvider>
          <a className="skip" href="#main">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
          <Chatbot />
          <Dialog />
          <Search />
          <Motion />
          <LinkInterceptor />
        </UIProvider>
      </body>
    </html>
  );
}
