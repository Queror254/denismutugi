import type { Metadata } from "next";
import { NavA } from "@/components/version-a/NavA";

export const metadata: Metadata = {
  title: "Denva International",
};

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavA />
      <main>{children}</main>
    </>
  );
}
