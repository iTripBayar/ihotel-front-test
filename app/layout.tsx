'use client';

import './globals.css';
import { Montserrat } from 'next/font/google';
import { AppCtxProvider } from '@/contexts/app';
import AuthProvider from '@/contexts/auth';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'iHotel',
//   description: 'Generated by create next app',
// };

const inter = Montserrat({ subsets: ['latin'] });

// import type { Metadata } from 'next';

// export default async function RootLayout({
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppCtxProvider>
      <AuthProvider>
        <html lang='en'>
          <head>
            <link rel='icon' type='image/x-icon' href='/favicon.png'></link>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, maximum-scale=1'
            ></meta>
          </head>
          <body className={`relative overscroll-none ${inter.className}`}>
            {children}
          </body>
        </html>
      </AuthProvider>
    </AppCtxProvider>
  );
}
