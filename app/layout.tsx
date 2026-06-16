import type { Metadata } from "next";
import "./globals.css";
import { bebasNeue, inter } from "@/lib/fonts";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { NavA } from "@/components/version-a/NavA";

export const metadata: Metadata = {
  title: "Denva International",
  description: "Director. Filmmaker. Photographer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-black cursor-none antialiased">
        <CustomCursor />
        <NavA />
        <main>{children}</main>
      </body>
    </html>
  );
}
