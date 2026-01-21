import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nypost-red': '#cf0a2c',
        'nypost-black': '#1a1a1a',
      },
      fontFamily: {
        'headline': ['Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
