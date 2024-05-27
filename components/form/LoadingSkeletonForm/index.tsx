import FormLayout from "@/components/ui/FormLayout";
import { Divider, Skeleton, Typography } from "@mui/material";
import React from "react";

interface LoadingSkeletonFormProps {
  isProductForm?: boolean;
  isEmployeeForm?: boolean;
  isTransactionForm?: boolean;
}

export default function LoadingSkeletonForm({
  isProductForm = false,
  isEmployeeForm = false,
  isTransactionForm = false,
}: LoadingSkeletonFormProps) {
  if (isProductForm) {
    return (
      <div className="tw-w-3/4 lg:tw-w-1/2">
        <FormLayout>
          <Skeleton variant="textField" />
          <Skeleton variant="textField" className="tw-w-40 tw-h-40" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
        </FormLayout>
      </div>
    );
  }

  if (isEmployeeForm) {
    return (
      <div className="tw-w-3/4 lg:tw-w-1/2">
        <FormLayout>
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
          <Skeleton variant="textField" />
        </FormLayout>
      </div>
    );
  }

  if (isTransactionForm) {
    return (
      <div className="tw-w-3/4 lg:tw-w-1/2 tw-flex tw-flex-col tw-gap-4">
        <Skeleton variant="textField" />

        <div className="tw-flex tw-gap-6">
          <Skeleton variant="textField" />

          <Skeleton variant="textField" />
        </div>

        <div className="tw-w-full tw-flex tw-items-center tw-gap-4">
          <Typography variant="subtitle1">Customer's Detail</Typography>
          <Divider
            flexItem
            className="tw-my-4 tw-flex-grow"
            sx={{
              borderBottomWidth: 3,
              bgcolor: "black",
              borderColor: "black",
            }}
          />
        </div>

        <Skeleton variant="textField" />

        <div className="tw-flex tw-gap-6 tw-items-start">
          <Skeleton variant="textField" />

          <Skeleton variant="textField" />
        </div>

        <div className="tw-w-full tw-flex tw-items-center tw-gap-4">
          <Typography variant="subtitle1">Transaction's Detail</Typography>
          <Divider
            flexItem
            className="tw-my-4 tw-flex-grow"
            sx={{
              borderBottomWidth: 3,
              bgcolor: "black",
              borderColor: "black",
            }}
          />
        </div>

        <Skeleton variant="textField" />

        <Skeleton variant="textField" className="tw-h-36" />

        <Skeleton variant="textField" />
        <Skeleton variant="textField" className="tw-h-36" />
      </div>
    );
  }
  return (
    <div className="tw-grid tw-place-items-center tw-grid-cols-1 tw-gap-6">
      <Skeleton className="tw-m-4" />
    </div>
  );
}
