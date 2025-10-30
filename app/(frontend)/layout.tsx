import type { Metadata } from 'next'
import { Providers } from "./providers";
import { getThemeCookie } from '@/lib/cookies'
import './globals.css'
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await getThemeCookie()

  return (
    <html lang="es" className={theme === 'dark' ? 'dark' : ''}>
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
