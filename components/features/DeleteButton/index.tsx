import { Delete } from "@mui/icons-material";
import React from "react";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <div
      className="tw-absolute tw-right-0 tw-top-0 tw-w-8 tw-h-8 tw-rounded-md tw-bg-red-500 tw-m-1 tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-bg-red-600 tw-duration-100 "
      onClick={onDelete}
    >
      <Delete className="tw-text-white" />
    </div>
  );
};

export default DeleteButton;
