import type { Metadata } from 'next'
import { Providers } from "./providers";
import { getThemeCookie } from '@/lib/cookies'
import './globals.css'
import { Toaster } from '@/components/ui/toaster';
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'EsApp - Sistema de Gestión de Facturas',
    template: '%s | EsApp Invoice'
  },
  description: 'Sistema moderno de consulta y pago de facturas de servicios públicos. Autenticación JWT, filtros avanzados, búsqueda en tiempo real, soporte multiidioma (ES, EN, FR, DE) y diseño responsive.',

  keywords: [
    'gestión de facturas',
    'pago de servicios',
    'facturas online',
    'Next.js',
    'React',
    'TypeScript',
    'invoice management'
  ],

  authors: [{ name: 'Albert Araya' }],
  creator: 'Albert Araya',

  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'EsApp - Sistema de Gestión de Facturas',
    description: 'Consulta y paga tus facturas de forma rápida y segura',
    siteName: 'EsApp Invoice',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EsApp - Sistema de Gestión de Facturas',
    description: 'Sistema moderno de consulta y pago de facturas',
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
  },

  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
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
