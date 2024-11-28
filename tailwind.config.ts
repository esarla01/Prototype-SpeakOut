import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'row-span-1',
    'row-span-2',
    'row-span-3',
  ],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      beige: '#fcfaf1',
      primaryturquoise: '#74CFA9',
      primarygreen: {
        100: '#1db5ad',
        200: '#1a9c95',
        300: '#178781',
        400: '#14736e',
        500: '#105e5a',
        600: '#0f5250',
        700: '#0a3837',
        800: '#062423',
        900: '#041716',
      },
      primarylightblue: '#7595FF',
      primarydarkblue: '#38218A',
      primarydarkbluehover: '#2F1C72',
      primarypink: '#FFAFC7',
      primaryred: '#AB1826',
      red: {
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      secondary1: '#750688',
      secondary2: '#E50000',
      secondary3: '#FF8D00',
      secondary4: '#FFEE00',
      secondary5: '#007B3A',
      secondary6: '#AC1AAB',
      secondary7: '#73D1EA',
      secondary8: '#750688',
      secondary9: '#613915',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'error-icon': 'url(/images/exclamation-circle.svg)',
      },
      backgroundPosition: {
        'input-error-pos': 'right calc(.375em + .1875rem) center'
      },
      backgroundSize: {
        'input-error-size': 'calc(.75em + .375rem) calc(.75em + .375rem)'
      },
      padding: {
        'input-error': '0.25rem calc(1.5em + .75rem) 0.25rem 0.5rem'
      },
      maxWidth: {
        'layout-body': 'calc(100vw - 16rem)'
      }
    },
  },
  plugins: [],
}
export default config
