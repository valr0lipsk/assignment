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
        teal: {
          500: "#224957",
        },
        green: {
          400: "#2BD17E",
        },
        black: {
          900: "#191919",
        },
        sky: {
          900: "#092C39",
        },
      },
      borderRadius: {
        l10: "0.625rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
