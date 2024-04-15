/** @type {import('tailwindcss').Config} */
import daisyUI from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      primary: '#0E41E9'
    }
  },
  daisyui: {
    themes: [
      {
        primary: {
          primary: '#0E41E9',
          secondary: '#FF5A05',
          accent: '#110F9E',
          neutral: '#EBECFF',
          'base-100': 'white',
          info: '#8996FF',
          success: '#DEFFDB',
          warning: '#fff129',
          error: '#FFDFDB'
        }
      }
    ]
  },
  plugins: [daisyUI]
}
