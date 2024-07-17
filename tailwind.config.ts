import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      padding: {
        '30%': '30%',
        "6px": "6px"
      },
      translate: {
        "72px":"72px"
      },
      colors:{
        "sidebar": "rgb( 7, 9, 18)"
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["emerald", "night"],
  },
  darkMode: ['class', '[data-theme="night"]']
};
export default config;
