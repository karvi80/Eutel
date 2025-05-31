import Navbar from '@/components/shared/Navbar';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Footer from '@/components/shared/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Eutel',
  description: 'Eutel, your perfect hotel look up and booking',
  icons: {
    icon: '/assets/images/logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <div className="md:w-[90%] w-full flex-center mx-auto md:p-5 p-2">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
