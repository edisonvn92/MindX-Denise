/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '280px',
      md: '672px',
      lg: '1120px',
      xl: '1280px',
    },
    colors: {
      'mx-brand': {
        50: '#FFEAEB',
        100: '#FFBCBF',
        200: '#FF8E92',
        300: '#FF6066',
        400: '#FF323A',
        500: '#E31F26',
        600: '#C10F15',
        700: '#9F0208',
        800: '#7D0005',
        900: '#5B0003',
      },
      'mx-gray': {
        50: '#F8F8F8',
        100: '#E3E3E3',
        200: '#CFCFCF',
        300: '#BBBBBB',
        400: '#A6A6A6',
        500: '#929292',
        600: '#7E7E7E',
        700: '#696969',
        800: '#58595B',
        900: '#2C2B2B',
      },
      'mx-red': {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
      },
      'mx-yellow': {
        50: '#FEFCE8',
        100: '#FEF9C3',
        200: '#FEF08A',
        300: '#FDE047',
        400: '#FACC15',
        500: '#EAB308',
        600: '#CA8A04',
        700: '#A16207',
        800: '#854D0E',
        900: '#713F12',
      },
      'mx-green': {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
      },
      'mx-blue': {
        50: '#EFF6FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E',
      },
      'mx-white': '#FFF',
      'transparent-white': {
        '00': 'rgba(255, 255, 255, 0)',
        100: 'rgba(255, 255, 255, 0.10)',
        200: 'rgba(255, 255, 255, 0.20)',
        300: 'rgba(255, 255, 255, 0.30)',
        400: 'rgba(255, 255, 255, 0.40)',
        500: 'rgba(255, 255, 255, 0.50)',
        600: 'rgba(255, 255, 255, 0.60)',
        700: 'rgba(255, 255, 255, 0.70)',
        800: 'rgba(255, 255, 255, 0.80)',
        900: 'rgba(255, 255, 255, 0.90)',
      },
      'mx-black': '#000',
      'transparent-black': {
        '00': 'rgba(0, 0, 0, 0.00)',
        100: 'rgba(0, 0, 0, 0.10)',
        200: 'rgba(0, 0, 0, 0.20)',
        300: 'rgba(0, 0, 0, 0.30)',
        400: 'rgba(0, 0, 0, 0.40)',
        500: 'rgba(0, 0, 0, 0.50)',
        600: 'rgba(0, 0, 0, 0.60)',
        700: 'rgba(0, 0, 0, 0.70)',
        800: 'rgba(0, 0, 0, 0.80)',
        900: 'rgba(0, 0, 0, 0.90)',
      },
    },
    boxShadow: {
      'mx-light01': '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
      'mx-light02': '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
      'mx-light03': '0px 4px 8px 0px rgba(0, 0, 0, 0.15)',
      'mx-light04': '0px 6px 10px 0px rgba(0, 0, 0, 0.15)',
      'mx-light05': '0px 8px 12px 0px rgba(0, 0, 0, 0.15)',
    },
    fontWeight: {
      light: '300',
      regular: '400',
      semibold: '600',
      bold: '700',
    },
    extend: {
      aspectRatio: {
        '4/5': '4 / 5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
