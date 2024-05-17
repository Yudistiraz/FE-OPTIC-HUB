"use client";
import "@/app/globals.css";
import DefaultLayout from "./default-layout";
import { ToastBar, Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-flex tw-flex-col tw-min-h-screen tw-max-w-screen-2xl">
      <DefaultLayout>{children}</DefaultLayout>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              border: "2px solid #00C306",
              padding: "16px",
              color: "#FFFFFF",
              background: "#0DD414",
            },
            iconTheme: {
              primary: "#00C306",
              secondary: "#FFFAEE",
            },
          },
          error: {
            style: {
              border: "2px solid #D72202",
              padding: "16px",
              color: "#FFFFFF",
              background: "#FF2600",
            },
            iconTheme: {
              primary: "#D72202",
              secondary: "#FFFAEE",
            },
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 0.5s forwards"
                : "custom-exit 0.5s forwards",
            }}
          >
            {({ icon, message }) => (
              <>
                {icon}
                {message}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
