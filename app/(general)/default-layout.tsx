"use client";

import CustomContainer from "@/components/ui/Container";
import CustomDrawer from "@/components/ui/Drawer";
import Header from "@/components/ui/Header";
import SidebarMenu from "@/components/ui/SidebarMenu";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    children;
  }
  const router = useRouter();
  const checkSession = async () => {
    const session = await getSession();

    if (!session) {
      router.push("/signin");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="tw-flex">
      <CustomDrawer
        variant="permanent"
        drawerPaperClass="tw-bg-primary-500 tw-w-[270px] no-scrollbar"
        containerClass="tw-px-4"
      >
        <SidebarMenu />
      </CustomDrawer>

      {/* <Header /> */}
      <CustomContainer>{children}</CustomContainer>
    </div>
  );
}
