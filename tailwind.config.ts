import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: {addUtilities: Function}) {
      const newUtilities = {
        '.h-webkit-fill-available': {
          'height': '-webkit-fill-available',
        },
        '.w-webkit-fill-available': {
          'width': '-webkit-fill-available',
        },
        '.h-600': {
          'height': '600px',
        },
        '.min-h-600': {
          'min-height': '600px',
        }
      };

      addUtilities(newUtilities);
    },
  ],
}
export default config
