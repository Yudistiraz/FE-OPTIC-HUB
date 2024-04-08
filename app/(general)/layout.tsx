"use client";
import "@/app/globals.css";
import DefaultLayout from "./default-layout";

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
