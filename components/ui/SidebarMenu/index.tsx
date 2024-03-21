"use client";
import { Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useMemo } from "react";

import ImageLoader from "@/components/ui/ImageLoader";
import { OWNER_SITEMAPS, STAFF_SITEMAPS } from "@/utils/constants";

interface MenuProps {
  name?: string;
  img?: string;
  path: string;
  children?: ReactNode;
}

interface NavigationMenuProps {
  menus: MenuProps[];
}

function SidebarMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();
  // console.log(session?.user);

  // const role = "staff";

  const role = useMemo(() => {
    console.log("a");

    return session?.user.role;
  }, []);

  useEffect(() => {
    console.log(session);
  }, [session]);

  const onMenuClick = (url: string) => {
    router.push(url);
  };

  const NavItem: React.FC<MenuProps> = ({ children, path }) => {
    const isActive = pathname === path;
    return (
      <Typography
        className="group-hover:tw-text-white"
        color={isActive ? "#FFFFFF" : "#A0A5AB"}
      >
        {children}
      </Typography>
    );
  };

  const NavigationMenu: React.FC<NavigationMenuProps> = ({
    menus,
  }: NavigationMenuProps) => {
    return menus.map((item, index) => {
      const isActive = pathname === item.path;
      if (isActive) {
        return (
          <div
            key={index}
            className="tw-py-4 tw-px-4 tw-mb-2 tw-cursor-pointer tw-bg-[#50565C] tw-rounded-2xl tw-flex tw-gap-2"
            onClick={() => onMenuClick(item?.path)}
          >
            {/* <ImageLoader
              isFlat
              src={`/assets/navbar/${item?.img}_active.png`}
              alt={item?.name}
              className="tw-w-[15px] tw-h-[15px]"
            /> */}

            <NavItem path={item.path}>{item.name}</NavItem>
          </div>
        );
      }

      if (!item?.path) {
        return (
          <div key={index} className="tw-py-3 tw-px-2 tw-mb-2">
            <Typography>{item?.name}</Typography>
          </div>
        );
      }

      return (
        <div
          key={index}
          className="tw-py-4 tw-px-4 tw-mb-2 tw-cursor-pointer hover:tw-bg-[#50565C] hover:tw-rounded-2xl tw-group tw-flex tw-gap-2"
          onClick={() => onMenuClick(item?.path)}
        >
          {/* <ImageLoader
            isFlat
            src={`/assets/navbar/${item?.img}_idle.png`}
            alt={item?.name}
            className="tw-w-[15px] tw-h-[15px]"
          /> */}

          <NavItem path={item.path}>{item.name}</NavItem>
        </div>
      );
    });
  };

  return (
    <NavigationMenu
      menus={role === "staff" ? OWNER_SITEMAPS : STAFF_SITEMAPS}
    />
  );
}

export default SidebarMenu;
