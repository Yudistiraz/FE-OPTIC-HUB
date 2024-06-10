"use client";

import ProductForm from "@/components/form/ProductForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { Typography } from "@mui/material";

export default function AddProduct() {
  const { translations } = useLanguage();
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        {translations?.productPage?.createHeader}
      </Typography>
      <ComponentCard>
        <ProductForm />
      </ComponentCard>
    </div>
  );
}
