import type { Metadata } from "next";
import { NavB } from "@/components/version-b/NavB";

export const metadata: Metadata = {
  title: "Denva International",
};

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavB />
      <main>{children}</main>
    </>
  );
}
