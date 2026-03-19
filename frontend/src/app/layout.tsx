import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "D' Pavel Coffee Experience",
  description: 'Neuro-gastronomic coffee platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div id="dev-overlay-remover" />
        <Header />
        <main>
          {children}
        </main>
        
        {/* Dynamic Dev Overlay Remover */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const remove = () => {
              const selectors = ['nextjs-portal', '[data-nextjs-toast]', '.nextjs-static-indicator-container'];
              selectors.forEach(s => {
                document.querySelectorAll(s).forEach(el => el.remove());
              });
            };
            remove();
            const observer = new MutationObserver(remove);
            observer.observe(document.documentElement, { childList: true, subtree: true });
          })();
        `}} />
      </body>
    </html>
  );
}
