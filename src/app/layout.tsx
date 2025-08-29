import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import { I18nProviderClient } from '@/components/i18n-provider-client';
import { headers } from 'next/headers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const lang = headersList.get('accept-language')?.split(',')[0] || 'en';

  return (
    <html lang={lang} className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <I18nProviderClient lang={lang}>
            {children}
        </I18nProviderClient>
      </body>
    </html>
  );
}
