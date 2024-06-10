"use client";
import TransactionForm from "@/components/form/TransactionForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { getAllProduct } from "@/services/admin/v1/product";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

export default function addTransaction() {
  const { translations } = useLanguage();
  const [productSearch, setProductSearch] = useState("");
  const { data, isLoading } = useQuery(
    ["products", productSearch],
    async () => {
      const res = await getAllProduct({
        keyword: productSearch,
        page: 1,
        limit: 999,
      });
      return res?.data?.data || [];
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        {translations?.transactionPage?.createHeader}
      </Typography>
      <ComponentCard>
        <TransactionForm
          setProductSearch={setProductSearch}
          productSearch={productSearch}
          productData={data}
          isProductLoading={isLoading}
        />
      </ComponentCard>
    </div>
  );
}
