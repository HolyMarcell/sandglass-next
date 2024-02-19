import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        bggrad1: '#020024',
        bggrad2: '#023718',
        bggrad3: '#045336',
        topnavBg: '#06a26a',

      },
      gridTemplateColumns: {
        mainlayout: '0px 1fr 0px', // until we get real content
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
