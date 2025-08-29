'use client';

import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Pointer } from '@/components/pointer';
import { ThemeProvider } from '@/components/theme-provider';
import '../i18n'; // Import the i18n configuration

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster />
            <Pointer />
        </ThemeProvider>
      </body>
    </html>
  );
}
