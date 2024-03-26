import "@/app/globals.css";
import type { Metadata } from "next";
import DefaultLayout from "./default-layout";

export const metadata: Metadata = {
  title: "Optic Hub App",
  description: "Admin Optic Hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen">
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
