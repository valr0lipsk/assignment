import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('/background.svg')",
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      colors: {
        pink: {
          500: "#FF31A1",
        },
        black: {
          900: "#191919",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
