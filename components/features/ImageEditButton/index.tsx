import { Delete, Edit } from "@mui/icons-material";
import React from "react";

interface ImageEditButtonProps {
  onClick: () => void;
  type?: "delete" | "edit";
}

const ImageEditButton = ({
  onClick,
  type = "delete",
}: ImageEditButtonProps) => {
  return (
    <div
      className={`tw-absolute tw-right-0 tw-top-0 tw-w-8 tw-h-8 tw-rounded-md  tw-m-1 tw-flex tw-items-center tw-justify-center tw-cursor-pointer ${
        type === "delete"
          ? "tw-bg-red-500 hover:tw-bg-red-600 tw-duration-100"
          : "tw-bg-blue-500 hover:tw-bg-blue-600 tw-duration-100"
      }`}
      onClick={onClick}
    >
      {type === "delete" ? (
        <Delete className="tw-text-white" />
      ) : (
        <Edit className="tw-text-white" />
      )}
    </div>
  );
};

export default ImageEditButton;
