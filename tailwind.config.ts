import { url } from "inspector";
import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

interface Utilities{
  ".no-scrollbar": scrollbarWidth
}

interface scrollbarWidth{
  "scrollbar-width": string
}

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
          "user": "url(image/user.svg)",
          "email": "url(image/email.svg)",
          "password": "url(image/password.svg)"
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
      },
      boxShadow:{
        '3xl': 'rgba(80, 80, 80, 0.4) 0 2px 4px,rgba(100, 100, 100, 0.6) 0 7px 13px -3px,rgb(40,40,40) 0 -3px 0 inset',
        '4xl': 'rgba(115, 115, 115, 0.4) 0 4px 8px, rgba(130, 130, 130, 0.6) 0 7px 13px -3px, rgb(40,40,40) 0 -3px 0 inset'
      }
    },
    screens:{
      'sm': '640px',
      'md':'768px',
      'lg':'1024px',
      'desktop': '1202px',
    },
  },
  plugins: [require('daisyui'),
    function({ addUtilities }: PluginAPI){
      const newUtilities = {
        ".no-scrollbar":{
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }
      }

      addUtilities(newUtilities)
    }
  ],
  daisyui: {
    themes: ["emerald", "dracula"],
  },
  darkMode: ['class', '[data-theme="dracula"]']
};
export default config;
