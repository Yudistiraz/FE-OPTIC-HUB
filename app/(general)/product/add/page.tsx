"use client";

import ProductForm from "@/components/form/ProductForm";
import { Typography } from "@mui/material";

export default function AddProduct() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Add Product</Typography>
      <ProductForm />
    </div>
  );
}
