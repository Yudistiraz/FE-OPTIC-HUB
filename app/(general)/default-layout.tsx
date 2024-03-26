"use client";

import CustomContainer from "@/components/ui/Container";
import CustomDrawer from "@/components/ui/Drawer";
import Header from "@/components/ui/Header";
import SidebarMenu from "@/components/ui/SidebarMenu";
import { useUserState } from "@/context/User";
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
  const { hasMounted } = useUserState();
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
        drawerPaperClass="tw-bg-primary-500 tw-w-[270px] no-scrollbar "
        containerClass="tw-w-full tw-px-2"
      >
        {hasMounted && <SidebarMenu />}
      </CustomDrawer>
      {hasMounted && <Header />}

      {hasMounted && (
        <CustomContainer className="tw-pt-32">{children}</CustomContainer>
      )}
    </div>
  );
}
