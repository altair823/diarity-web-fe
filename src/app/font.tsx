import localFont from 'next/font/local'

const koFont = localFont({
  src: [
    {
      path: './fonts/IncheonMICE-Light.woff2',
      style: 'normal',
      weight: '300',
    },
    {
      path: './fonts/IncheonMICE-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: './fonts/IncheonMICE-Bold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--font-ko',
})

const enFont = localFont({
  src: [
    {
      path: './fonts/K2D-Medium.ttf',
      style: 'normal',
      weight: '500',
    },
    {
      path: './fonts/K2D-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
  ],
  variable: '--font-en',
})

export { koFont, enFont }
