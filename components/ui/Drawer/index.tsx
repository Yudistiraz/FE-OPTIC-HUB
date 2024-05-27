"use client";
import { Drawer, Typography } from "@mui/material";
import { ReactNode } from "react";

import ContainerWrapper from "@/components/ui/Container";

interface CustomDrawerProps {
  // showDrawer: boolean
  // setShowDrawer: (showDrawer: boolean) => void
  children: ReactNode;
  title?: string;
  anchor?: "bottom" | "left" | "right" | "top";
  variant?: "permanent" | "persistent" | "temporary";
  drawerPaperClass?: string;
  containerClass?: string;
  width?: string;
  open?: boolean;
  prioritize?: boolean;
  onClose?: () => void;
}

const CustomDrawer = ({
  anchor = "left",
  children,
  drawerPaperClass = "",
  containerClass = "",
  title = "",
  variant = "temporary",
  width,
  open,
  onClose,
}: CustomDrawerProps) => {
  // const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const drawerWidth = width ? width : "270px"; // Full screen on small screens, 400px on larger screens

  const paperStyle = {
    width: drawerWidth,
  };

  return (
    <Drawer
      classes={{
        paper: drawerPaperClass,
      }}
      className={
        anchor === "top"
          ? `!tw-z-[1000] tw-w-[${drawerWidth}]`
          : `!tw-z-[1200] tw-w-[${drawerWidth}]`
      }
      variant={variant}
      anchor={anchor}
      open={open}
      onClose={() => onClose?.()}
      PaperProps={{ style: paperStyle, variant: "blue" }} // Add the PaperProps with custom style
      disableScrollLock
    >
      <ContainerWrapper className={`tw-h-full ${containerClass}`}>
        {title.length > 0 && (
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
            <Typography variant="h2">{title}</Typography>
            {/* {onClose && <DialogCloseIcon onClick={onClose} />} */}
          </div>
        )}
        {children}
      </ContainerWrapper>
    </Drawer>
  );
};

export default CustomDrawer;
