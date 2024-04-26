/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CustomContainer from "@/components/ui/Container";
import CustomDrawer from "@/components/ui/Drawer";
import Header from "@/components/ui/Header";
import SidebarMenu from "@/components/ui/SidebarMenu";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    children;
  }

  return (
    <div className="tw-flex">
      <CustomDrawer
        variant="permanent"
        drawerPaperClass="tw-bg-primary-500 tw-w-[270px] no-scrollbar "
        containerClass="tw-w-full tw-px-2"
      >
        <SidebarMenu />
      </CustomDrawer>
      <Header />
      <CustomContainer className="tw-pt-32">{children}</CustomContainer>
    </div>
  );
}
