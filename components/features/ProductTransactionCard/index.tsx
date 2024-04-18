import {
  getThousandSeparator,
  updateOrderItemQuantity,
} from "@/utils/function";
import { OrderItem } from "@/utils/models";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { IconButton, TextField, Typography } from "@mui/material";
import React from "react";

interface ProductTransactionCardProps {
  data: OrderItem;
  onDelete?: (productIdToDelete: string) => void;
  onChange?: (orderItem: OrderItem) => void;
}

export default function ProductTransactionCard({
  data,
  onDelete = () => {},
  onChange = () => {},
}: ProductTransactionCardProps) {
  return (
    <div className="tw-w-full tw-h-44 tw-bg-white tw-rounded-md tw-p-2 tw-flex tw-items-center tw-gap-2">
      <div className="tw-w-40 tw-h-40 tw-bg-black-400 tw-rounded-md tw-flex-none">
        a
      </div>
      <div className="tw-h-full tw-flex-grow tw-py-2 tw-flex-col tw-flex tw-gap-2">
        <div className="tw-flex tw-items-center tw-h-fit">
          <Typography
            variant="subtitle1"
            className="tw-text-ellipsis tw-overflow-hidden tw-max-w-[60%] tw-line-clamp-1"
          >
            {data?.name}
          </Typography>

          <Typography variant="h2" className="tw-ml-auto tw-text-red-500">
            Rp.{getThousandSeparator(data?.quantity * data?.price)}
          </Typography>
        </div>

        <div className="tw-p-1 tw-rounded-md tw-font-semibold tw-text-xs tw-bg-green-400 tw-text-white tw-w-fit tw-capitalize">
          {data?.category?.name}
        </div>

        <div className="tw-mt-auto tw-flex tw-items-center">
          <Typography variant="subtitle2Reg" className="tw-italic">
            Rp.{getThousandSeparator(data?.price)}
          </Typography>

          <div className="tw-ml-auto tw-flex tw-gap-4 tw-items-center">
            <IconButton
              onClick={() => {
                onDelete(data?.id);
              }}
            >
              <DeleteOutline />
            </IconButton>

            <div className="tw-flex tw-items-center tw-p-1 tw-outline tw-outline-gray-400 tw-outline-1 tw-gap-4 tw-rounded-md tw-mr-1">
              <div
                className={`tw-text-[#9FA1A7] ${
                  data.qty > 1 && "tw-cursor-pointer "
                }`}
                onClick={() => {
                  onChange(
                    updateOrderItemQuantity(data.qty - 1, data, data.quantity)
                  );
                }}
              >
                <Remove />
              </div>
              <TextField
                size="small"
                className="tw-w-8"
                variant="standard"
                type="number"
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                value={data?.qty}
                onChange={(e) => {
                  onChange(
                    updateOrderItemQuantity(
                      parseInt(e.target.value),
                      data,
                      data.quantity
                    )
                  );
                }}
              />
              <div
                className={`tw-text-[#9FA1A7] ${
                  data.qty < data.quantity && "tw-cursor-pointer "
                }`}
                onClick={() => {
                  onChange(
                    updateOrderItemQuantity(data.qty + 1, data, data.quantity)
                  );
                }}
              >
                <Add />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
