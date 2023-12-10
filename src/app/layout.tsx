import Header from "@/components/Header";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en">
      <body className="bg-white">
        <Providers session={session}>
          {session && <Header />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
