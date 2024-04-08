"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AppBar, IconButton, MenuItem, Typography, Menu } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

import CustomContainer from "@/components/ui/Container";

const drawerWidth = 270;

const Header = () => {
  const session = useSession();

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
    <AppBar
      className="tw-bg-white tw-shadow-none tw-border tw-border-b-gray-300 tw-p-0"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        height: "80px",
      }}
    >
      <CustomContainer className="tw-py-[20px] tw-flex tw-justify-between">
        <div>{/* breadcrumb here */}</div>

        <div className="tw-flex tw-gap-4 tw-items-center">
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
      </CustomContainer>
    </AppBar>
  );
};

export default Header;
