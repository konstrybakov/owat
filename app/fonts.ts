import localFont from 'next/font/local'

export const FontSerif = localFont({
  src: './fonts/Zodiak-Variable.ttf',
  display: 'swap',
  variable: '--font-serif'
})

export const FontSans = localFont({
  src: './fonts/PlusJakartaSans-Variable.ttf',
  display: 'swap',
  variable: '--font-sans'
})
