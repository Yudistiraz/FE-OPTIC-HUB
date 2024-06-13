"use client";
import ProductForm from "@/components/form/ProductForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { getProductById } from "@/services/admin/v1/product";

import { Typography } from "@mui/material";
import { useQuery } from "react-query";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { translations } = useLanguage();
  const productDetailQuery = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const res = await getProductById(params.id);
      return res.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        {translations?.productPage?.item} : {productDetailQuery?.data?.name}
      </Typography>
      <ComponentCard>
        <ProductForm
          isEdit
          data={productDetailQuery.data}
          isLoading={productDetailQuery.isLoading}
        />
      </ComponentCard>
    </div>
  );
}
