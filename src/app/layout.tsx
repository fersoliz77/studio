import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import { I18nProviderClient } from '@/components/i18n-provider-client';
import { headers } from 'next/headers';
import { ThemeProvider } from '@/components/theme-provider';
import { useTranslation } from '@/i18n'; // Import the server-side useTranslation
import { defaultNS } from '@/i18n/config'; // Import defaultNS

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'A personal portfolio website.',
  keywords: ['portfolio', 'web development', 'frontend', 'backend', 'react', 'next.js'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const lang = (await headersList).get('accept-language')?.split(',')[0] || 'en';
  const { i18n } = await useTranslation(lang, defaultNS);

  return (
    <html lang={lang} className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="theme-transition-overlay" className="fixed inset-0 z-[100] pointer-events-none"></div>
          <I18nProviderClient lang={lang} resources={i18n.store.data}>
              {children}
          </I18nProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
