"use client";
import "@/app/globals.css";
import { ToastBar, Toaster } from "react-hot-toast";
import { Fragment } from "react";
import Head from "next/head";
import Header from "@/components/ui/Header";
import { useScreenSize } from "@/context/MediaQuery";
import CustomDrawer from "@/components/ui/Drawer";
import SidebarMenu from "@/components/ui/SidebarMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileScreen } = useScreenSize();
  return (
    <Fragment>
      <div className="tw-relative tw-flex tw-flex-col tw-min-h-screen tw-bg-gray-200">
        <Head>
          <title>Optic Hub</title>
          <meta name="Optic Hub" content="Optic Hub" />
        </Head>

        <Header />

        {!isMobileScreen && (
          <CustomDrawer
            variant="permanent"
            drawerPaperClass="tw-bg-primary-500 tw-w-[270px] no-scrollbar"
            containerClass="tw-px-2 tw-pt-0"
          >
            <SidebarMenu />
          </CustomDrawer>
        )}

        <div className="tw-pt-32 tw-mb-8">
          <div className="tw-flex tw-flex-col tw-grow tw-px-4 lg:tw-pl-72">
            {children}
          </div>
        </div>
      </div>
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
    </Fragment>
  );
}
