import { Typography } from "@mui/material";
import React from "react";

import CustomButton from "@/components/ui/Button";
import ImageLoader from "@/components/ui/ImageLoader";
import { useScreenSize } from "@/context/MediaQuery";

interface ConfirmationDialogProps {
  title: string;
  description: string;

  onApply?: (() => void) | null | undefined;
  onCancel?: (() => void) | null | undefined;
  applyText?: string;
  cancelText?: string;
  type?: "confirmation" | "success" | "alert";
  isLoading?: boolean;
}

const ConfirmationDialog = ({
  title,
  description,

  isLoading = false,
  type = "alert",
  onApply = null,
  onCancel = null,
  applyText = "Yes",
  cancelText = "No",
}: ConfirmationDialogProps) => {
  const { isExtraSmallScreen } = useScreenSize();

  const getImageSrc = (type: string) => {
    switch (type) {
      case "confirmation":
        return "/assets/icons/confirmation.webp";
      case "success":
        return "/assets/icons/success.webp";
      case "alert":
        return "/assets/icons/alert.webp";
      default:
        return "/assets/icons/alert.webp";
    }
  };

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-6 tw-items-center tw-p-6">
      <div className="tw-w-[60px] tw-h-[60px]">
        <ImageLoader alt="user" src={getImageSrc(type)} />
      </div>
      <div
        className={`tw-text-center ${
          isExtraSmallScreen ? "tw-w-full" : "tw-w-3/4"
        } tw-flex tw-flex-col tw-gap-2`}
      >
        <Typography variant="subtitle2" className="tw-font-scheme">
          {title}
        </Typography>
        <Typography variant="subtitle2Reg">{description}</Typography>
      </div>
      <div className="tw-flex tw-gap-4">
        {onCancel && (
          <CustomButton
            className="tw-w-[100px]"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </CustomButton>
        )}
        {onApply && (
          <CustomButton
            className="tw-w-[100px]"
            variant="secondary"
            onClick={onApply}
            disabled={isLoading}
          >
            {applyText}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default ConfirmationDialog;
