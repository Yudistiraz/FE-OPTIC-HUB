/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CustomDrawer from "@/components/ui/Drawer";
import Header from "@/components/ui/Header";
import SidebarMenu from "@/components/ui/SidebarMenu";
import { useScreenSize } from "@/context/MediaQuery";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    children;
  }
  const { isMobileScreen } = useScreenSize();
  return (
    <div className="tw-flex tw-w-full">
      <Header />

      {!isMobileScreen && (
        <CustomDrawer
          variant="permanent"
          drawerPaperClass="tw-bg-primary-500 tw-w-[270px] no-scrollbar "
          containerClass="tw-w-full tw-px-2"
        >
          <SidebarMenu />
        </CustomDrawer>
      )}

      <div className="tw-pt-32 tw-px-4 tw-pb-10 tw-w-full">
        <div className="tw-max-w-full">{children}</div>
      </div>
    </div>
  );
}
