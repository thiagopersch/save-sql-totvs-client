import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      sm: {
        max: '640px',
      },
      md: {
        max: '768px',
      },
      lg: {
        max: '1024px',
      },
      xl: {
        max: '1280px',
      },
      '2xl': {
        max: '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
