'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';
const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Status | RPL',
//   description: 'Check Status Lab RPL',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionContextProvider supabaseClient={supabase} initialSession={null}>
        <html lang='en'>
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </SessionContextProvider>
    </>
  );
}
