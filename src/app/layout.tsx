import "~/styles/globals.css";

import { Montserrat } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import NextAuthProvider from "./components/NextAuthProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Movie app",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} no-scrollbar relative bg-sky-800 font-montserrat text-white`}
      >
        <TRPCReactProvider>
          <NextAuthProvider>
            <div className="min-h-screen p-[7.5rem]">{children}</div>
          </NextAuthProvider>
        </TRPCReactProvider>

        <div className="absolute bottom-0 h-[111px] w-full bg-[url('/assets/Vectors.png')] bg-cover"></div>
      </body>
    </html>
  );
}
