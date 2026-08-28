/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060A',
          900: '#0A0B12',
          800: '#0F1119',
          700: '#161927',
          600: '#1E2233',
        },
        electric: {
          400: '#5BC0FF',
          500: '#1FA8FF',
          600: '#0A8DE0',
          700: '#006FB8',
        },
        lime: {
          400: '#C5FF4A',
          500: '#A6F032',
        },
        coral: {
          400: '#FF7A59',
          500: '#FF5A36',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(180deg, rgba(5,6,10,0) 0%, rgba(5,6,10,0.85) 75%, rgba(5,6,10,1) 100%), radial-gradient(circle at 20% 10%, rgba(31,168,255,0.18) 0%, transparent 55%), radial-gradient(circle at 80% 30%, rgba(197,255,74,0.10) 0%, transparent 50%)',
        'hero-noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/></svg>\")",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
