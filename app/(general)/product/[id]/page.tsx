"use client";
import ProductForm from "@/components/form/ProductForm";
import { getProductById } from "@/services/admin/v1/product";

import { Typography } from "@mui/material";
import { useQuery } from "react-query";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const productDetailQuery = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const res = await getProductById(params.id);
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">
        Product : {productDetailQuery?.data?.name}
      </Typography>
      <ProductForm
        isEdit
        data={productDetailQuery.data}
        isLoading={productDetailQuery.isLoading}
      />
    </div>
  );
}
