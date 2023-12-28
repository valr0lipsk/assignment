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
        className={`${montserrat.variable} no-scrollbar bg-[url('/assets/background.png')] bg-cover bg-bottom font-montserrat text-white`}
      >
        <TRPCReactProvider>
          <NextAuthProvider>
            <div className="h-screen p-[7.5rem]">{children}</div>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
