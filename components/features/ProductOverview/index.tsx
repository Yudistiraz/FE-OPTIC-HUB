import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import ProductTransactionCard from "../ProductTransactionCard";
import { deleteProductFromArray } from "@/utils/function";
import { OrderItem } from "@/utils/models";
import { useLanguage } from "@/context/Language";

interface ProductOverviewProps {
  productData: OrderItem[];
  onDeleteProduct: (productData: any) => void;
  onOrderItemChange: (OrderItem: OrderItem) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function ProductOverview({
  productData,
  onDeleteProduct = () => {},
  onOrderItemChange = () => {},
  error = false,
  helperText = "",
  disabled = false,
}: ProductOverviewProps) {
  const { translations } = useLanguage();
  return (
    <div className="tw-w-full tw-min-h-48 tw-bg-gray-200 tw-rounded-md tw-overflow-hidden tw-p-2 tw-flex tw-gap-2 tw-flex-col">
      {productData?.length > 0 ? (
        <Fragment>
          {productData.map((product: OrderItem) => (
            <ProductTransactionCard
              data={product}
              onDelete={(productId: string) => {
                const originalArray = [...productData];
                deleteProductFromArray(productId, originalArray);
                onDeleteProduct(originalArray);
              }}
              onChange={(orderItemData: OrderItem) => {
                onOrderItemChange(orderItemData);
              }}
              key={product.id}
              disabled={disabled}
            />
          ))}
        </Fragment>
      ) : (
        <div className="tw-w-full tw-min-h-40 tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center">
          <SentimentVeryDissatisfied className="tw-text-gray-400" />
          <Typography variant="subtitle1Reg" className="tw-text-gray-400">
            {translations?.ProductOverview?.zeroMessage}
          </Typography>
        </div>
      )}
      {error && (
        <Typography variant="helperText" className="text-danger tw-italic">
          {helperText}
        </Typography>
      )}
    </div>
  );
}
