import { Button } from "@mui/material";
import { ReactNode } from "react";

import LoadingCircular from "@/components/ui/LoadingCircular";

type CustomButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "contained"
  | "text"
  | "redButton";

interface CustomButtonProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: CustomButtonVariant;
  className?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

function CustomButton({
  children,
  startIcon,
  endIcon,
  disabled = false,
  isLoading = false,
  variant = "primary",
  className = "",
  type = "button",
  onClick = () => {},
}: CustomButtonProps) {
  const loadingColor = variant === "primary" ? "secondary" : "primary";
  return (
    <Button
      type={type}
      variant={variant}
      className={className}
      onClick={() => onClick()}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
    >
      {isLoading ? <LoadingCircular color={loadingColor} /> : children}
    </Button>
  );
}

export default CustomButton;
