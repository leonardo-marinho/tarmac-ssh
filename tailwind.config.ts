import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{tsx}', './src/client/components/**/*.{tsx}'],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
};
export default config;
