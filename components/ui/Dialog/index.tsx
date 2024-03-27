import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

import DialogCloseIcon from "@/components/features/DialogCloseIcon";

interface CustomDialogProps {
  open: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  fullScreen?: boolean;
  handleClose?: () => void;
  children: ReactNode;
  title?: string;
  actionNode?: ReactNode;
  isCenter?: boolean;
  independent?: boolean;
  transparent?: boolean;
}

function CustomDialog({
  maxWidth = "sm",
  open = false,
  fullWidth = true,
  fullScreen = false,
  handleClose,
  children,
  title,
  actionNode,
  isCenter = false,
  independent = false,
  transparent = false,
}: CustomDialogProps) {
  const transparentClass = transparent
    ? "!tw-bg-transparent !tw-shadow-none"
    : "";

  return (
    <Dialog
      PaperProps={{
        style: {
          // backgroundColor: transparent ? 'transparent' : 'white',
          boxShadow: transparent
            ? "none"
            : " 0px 9px 46px 8px rgba(0,0,0,0.12)",
        },
      }}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      {!independent && <DialogCloseIcon onClick={handleClose} />}

      {title && <DialogTitle className="!tw-text-center">{title}</DialogTitle>}
      <DialogContent
        className={`!tw-py-2 ${
          isCenter && "!tw-flex tw-mx-auto"
        } ${transparentClass}`}
      >
        {children}
      </DialogContent>
      {actionNode && <DialogActions>{actionNode}</DialogActions>}
    </Dialog>
  );
}

export default CustomDialog;
