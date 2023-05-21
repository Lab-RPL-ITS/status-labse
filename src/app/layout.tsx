import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider} from '@supabase/auth-helpers-react'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Status | RPL',
  description: 'Check Status Lab RPL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <>
     <SessionContextProvider supabaseClient={supabase} initialSession={null}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SessionContextProvider>
    </>
  )
}
