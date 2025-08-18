import type { Metadata } from 'next'
import { Geist, Geist_Mono, Jost } from 'next/font/google'
import './globals.css'
import Background from '@/components/shared/Background'
import ThemeProvider from '@/components/shared/ThemeProvider'
import AppNavbar from '@/components/shared/AppNavbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Rick and Morty Characters',
  description: 'Characters from Rick and Morty',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} antialiased`}>
        <ThemeProvider>
          <Background>
            <AppNavbar />
            {children}
          </Background>
        </ThemeProvider>
      </body>
    </html>
  )
}
