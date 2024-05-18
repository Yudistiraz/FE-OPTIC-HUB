"use client";

import ProductForm from "@/components/form/ProductForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { Typography } from "@mui/material";

export default function AddProduct() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">Add Product</Typography>
      <ComponentCard>
        <ProductForm />
      </ComponentCard>
    </div>
  );
}
