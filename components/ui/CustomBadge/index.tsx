import { useLanguage } from "@/context/Language";
import { Typography } from "@mui/material";
import React, { Fragment } from "react";

interface CustomBadgeProps {
  status?: boolean;
  trueLabel?: string;
  falseLabel?: string;
  trueColor?: string;
  falseColor?: string;
  textClasses?: string;
}

export default function CustomBadge({
  status = true,
  trueLabel = "",
  falseLabel = "",
  trueColor = "tw-bg-primary-500",
  falseColor = "tw-bg-gray-700",
  textClasses = "",
}: CustomBadgeProps) {
  const { translations } = useLanguage();
  return (
    <Fragment>
      <div
        className={`tw-rounded tw-h-6 tw-w-24 tw-flex tw-items-center tw-justify-center ${
          status ? trueColor : falseColor
        }`}
      >
        <Typography
          variant="customBadgeText"
          className={`${textClasses} tw-text-white`}
        >
          {status
            ? trueLabel || translations?.badgeText?.active
            : falseLabel || translations?.badgeText?.inactive}
        </Typography>
      </div>
    </Fragment>
  );
}

//tw-w-20 tw-h-fit tw-flex tw-items-center tw-justify-center tw-p-1
