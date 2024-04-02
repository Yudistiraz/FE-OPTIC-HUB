"use client";
import ProductForm from "@/components/form/product";
import { DUMMY_PRODUCT } from "@/utils/constants";
import { findDataById } from "@/utils/function";
import { TProduct } from "@/utils/models";
import { Typography } from "@mui/material";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const data: TProduct | undefined = findDataById(DUMMY_PRODUCT, params.id);
  console.log(data);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Product : {params.id}</Typography>
      <ProductForm isEdit data={data} />
    </div>
  );
}
