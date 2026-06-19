/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold:           'hsl(38, 61%, 73%)',
        'davys-grey':   'hsl(0, 0%, 33%)',
        'quick-silver': 'hsl(0, 0%, 65%)',
        smoky: {
          1: 'hsl(0, 0%, 9%)',
          2: 'hsl(0, 0%, 11%)',
          3: 'hsl(0, 0%, 13%)',
        },
        eerie: {
          1: 'hsl(210, 4%, 9%)',
          2: 'hsl(210, 4%, 11%)',
          3: 'hsl(210, 4%, 13%)',
          4: 'hsl(210, 4%, 15%)',
        },
      },
      fontFamily: {
        forum:  ['Forum', 'Georgia', 'serif'],
        body:   ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        rotate: 'rotate 6s linear infinite',
      },
      keyframes: {
        rotate: { '100%': { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
};
