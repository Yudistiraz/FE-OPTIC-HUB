import ImageLoader from "@/components/ui/ImageLoader";
import { getThousandSeparator } from "@/utils/function";
import { TProduct } from "@/utils/models";
import { Typography } from "@mui/material";
import React from "react";

interface ProductDropdownCardProps {
  onClick?: () => void;
  disabled?: boolean;
  data: TProduct;
}
export default function ProductDropdownCard({
  onClick = () => {},
  disabled = false,
  data,
}: ProductDropdownCardProps) {
  return (
    <div
      className={`tw-w-full tw-flex tw-rounded-md tw-gap-4 tw-p-1 ${
        disabled
          ? "tw-bg-gray-200"
          : "tw-cursor-pointer hover:tw-bg-gray-300 tw-duration-200"
      }`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className="tw-h-24 !tw-w-24 tw-bg-black-300 tw-rounded-md tw-flex-none tw-overflow-hidden">
        <ImageLoader
          src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
          isFlat
        />
      </div>
      <div className="tw-flex-grow tw-flex tw-flex-col tw-truncate tw-overflow-hidden tw-text-ellipsis">
        <Typography
          variant="h1"
          className={`tw-truncate ${disabled && "tw-text-gray-400"}`}
        >
          {data?.name}
        </Typography>
        <Typography
          variant="subtitle2Reg"
          className={`tw-italic ${disabled && "tw-text-gray-400"}`}
        >
          Rp.{getThousandSeparator(data?.price)}
        </Typography>
        <div className="tw-mt-auto tw-flex tw-items-center">
          <div className="tw-p-1 tw-rounded-md tw-font-semibold tw-text-xs tw-bg-green-400 tw-text-white tw-capitalize">
            {data?.category?.name}
          </div>
          <div
            className={`tw-ml-auto tw-mr-1 ${
              disabled && "tw-text-red-800 tw-italic"
            }`}
          >
            {disabled ? "Item Already Selected" : `Stock : ${data?.quantity}`}
          </div>
        </div>
      </div>
    </div>
  );
}
