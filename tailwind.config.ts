import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/client/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        background: '#1F2336',
        special1: '#5A4BD1',
        special2: '#9478F3',
        special3: '#F0BAFF',
        special4: '#2B2C38',
        special5: '#2C2C4F',
      },
    },
  },
};
export default config;
