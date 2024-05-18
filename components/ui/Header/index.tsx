"use client";
import { Menu as HamburgerIcon } from "@mui/icons-material";
import { useScreenSize } from "@/context/MediaQuery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AppBar, IconButton, MenuItem, Typography, Menu } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { useUserState } from "@/context/User";
import CustomDrawer from "../Drawer";
import SidebarMenu from "../SidebarMenu";

const Header = () => {
  const session = useSession();
  const { isMobileScreen, isSmallScreen } = useScreenSize();
  const { sideBarOpen, setSideBarOpen } = useUserState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut({
      callbackUrl: "/signin",
      redirect: true,
    });
  };

  return (
    <Fragment>
      <AppBar className="tw-bg-white tw-shadow-none tw-border tw-border-b-gray-300 tw-m-0">
        <div className="tw-flex tw-w-full tw-px-4 tw-py-4 tw-shadow-md">
          {isMobileScreen && (
            <IconButton
              onClick={() => {
                setSideBarOpen(true);
              }}
            >
              <HamburgerIcon />
            </IconButton>
          )}
          <div className="tw-flex tw-gap-4 tw-items-center tw-ml-auto">
            {session?.data && (
              <div>
                <Typography
                  fontSize="16px"
                  fontWeight={600}
                  lineHeight="21px"
                  className="tw-capitalize"
                  color="#252525"
                >
                  Hi, {session?.data?.user?.name || ""}
                </Typography>
              </div>
            )}

            <div>
              <IconButton onClick={handleMenu} size="small">
                <KeyboardArrowDownIcon />
              </IconButton>

              <Menu
                disableScrollLock={true}
                sx={{ mt: "40px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </AppBar>
      <CustomDrawer
        title=""
        anchor="left"
        width={isSmallScreen ? "200px" : "300px"}
        open={sideBarOpen}
        onClose={() => {
          setSideBarOpen(false);
        }}
        drawerPaperClass="tw-bg-primary-500 tw-w-72 no-scrollbar"
        containerClass="tw-w-full tw-px-2 tw-pt-0"
      >
        <SidebarMenu />
      </CustomDrawer>
    </Fragment>
  );
};

export default Header;
