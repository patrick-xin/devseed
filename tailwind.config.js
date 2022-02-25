const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#292929',
        grey: '#1c1c1c',
        snow: '#e5e5e5',
      },
      zIndex: {
        100: 100,
        120: 120,
        140: 140,
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.teal-glow': {
          textShadow: '0px 0px 8px rgba(108,227,212,0.6)',
        },
        '.pink-glow': {
          textShadow: '0px 0px 8px rgba(186,45,126,0.6);',
        },
        '.yellow-glow': {
          textShadow: '0px 0px 8px rgba(254,211,24,0.6)',
        },
        '.green-glow': {
          textShadow: '0px 0px 8px rgba(128,211,77,0.6)',
        },
        '.white-glow': {
          textShadow: '0px 0px 6px rgba(255,255,255,0.6)',
        },
        '.light-blue-glow': {
          textShadow: '0px 0px 8px rgba(198, 208, 235, 0.6)',
        },
        '.red-glow': {
          textShadow: '0px 0px 8px rgba(253, 52, 88, 0.6)',
        },
        '.purple-glow': {
          textShadow: '0px 0px 8px rgba(147, 51, 234, 0.7)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }),
  ],
}
