import { Poppins, Inter, Lato } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-poppins',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-inter',
})

export const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})
