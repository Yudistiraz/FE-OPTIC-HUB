"use client";
import TransactionForm from "@/components/form/TransactionForm";
import { getAllProduct } from "@/services/admin/v1/product";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

export default function addTransaction() {
  const [productSearch, setProductSearch] = useState("");
  // const productsQuery = useQuery({
  //   queryKey: ["products", productSearch],
  //   queryFn: async () => {
  //     const res = await getAllProduct({
  //       search: productSearch,
  //       page: 1,
  //       limit: 999,
  //     });
  //     return res.data.data;
  //   },
  // });

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
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Add Transaction</Typography>
      <TransactionForm
        setProductSearch={setProductSearch}
        productSearch={productSearch}
        productData={data}
        isProductLoading={isLoading}
      />
    </div>
  );
}
