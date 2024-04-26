"use client";
import { Divider, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

import ImageLoader from "@/components/ui/ImageLoader";
import { OWNER_SITEMAPS, STAFF_SITEMAPS } from "@/utils/constants";

import { isSideBarActive } from "@/utils/function";

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

  const role = session?.user.role;

  const onMenuClick = (url: string) => {
    router.push(url);
  };

  const NavItem: React.FC<MenuProps> = ({ children, path }) => {
    return <Typography className="tw-text-white">{children}</Typography>;
  };

  const NavigationMenu: React.FC<NavigationMenuProps> = ({
    menus,
  }: NavigationMenuProps) => {
    return menus.map((item, index) => {
      const isActive = isSideBarActive(pathname, item.path);
      if (isActive) {
        return (
          <div
            key={index}
            className="tw-py-4 tw-px-4 tw-mb-2 tw-cursor-pointer tw-bg-primary-400 tw-rounded-md tw-flex tw-gap-4 tw-items-center"
            onClick={() => onMenuClick(item?.path)}
          >
            <div className="tw-w-6 tw-h-6">
              <ImageLoader
                isFlat
                priority
                src={`/assets/navbar/${item?.img}.svg`}
                alt={item?.name}
              />
            </div>

            <NavItem path={item.path}>
              <Typography
                variant="subtitle2"
                component="span"
                className="tw-text-white"
              >
                {item.name}
              </Typography>
            </NavItem>
          </div>
        );
      }

      return (
        <div
          key={index}
          className="tw-py-4 tw-px-4 tw-mb-2 tw-cursor-pointer tw-group tw-items-center tw-flex tw-gap-4 hover:tw-bg-primary-400 tw-rounded-md tw-duration-75"
          onClick={() => onMenuClick(item?.path)}
        >
          <div className="tw-w-6 tw-h-6">
            <ImageLoader
              isFlat
              priority
              src={`/assets/navbar/${item?.img}.svg`}
              alt={item?.name}
            />
          </div>

          <NavItem path={item.path}>
            <Typography
              variant="subtitle2"
              component="span"
              className="tw-text-white group-hover:tw-mx-4 tw-duration-100"
            >
              {item.name}
            </Typography>
          </NavItem>
        </div>
      );
    });
  };

  return (
    <div className="tw-w-full">
      logo
      <NavigationMenu
        menus={role === "staff" ? OWNER_SITEMAPS : STAFF_SITEMAPS}
      />
      <Divider
        className="tw-my-4"
        sx={{
          borderBottomWidth: 3,
          bgcolor: "white",
          borderColor: "white",
        }}
      />
      <div
        className="tw-py-4 tw-px-4 tw-mb-2 tw-cursor-pointer tw-group tw-bg-primary-400 tw-rounded-md tw-flex tw-gap-4 tw-items-center hover:tw-bg-primary-600 tw-duration-75"
        onClick={() => onMenuClick("/transaction/add")}
      >
        <div className="tw-w-6 tw-h-6">
          <ImageLoader
            isFlat
            priority
            src={`/assets/navbar/add-transaction.svg`}
            alt="add-transaction"
          />
        </div>

        <NavItem path={"/transactions/add"}>
          <Typography
            variant="subtitle2"
            component="span"
            className="tw-text-white group-hover:tw-mx-4 tw-duration-100"
          >
            Buat Transaksi
          </Typography>
        </NavItem>
      </div>
    </div>
  );
}

export default SidebarMenu;
