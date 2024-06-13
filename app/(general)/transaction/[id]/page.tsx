"use client";
import TransactionForm from "@/components/form/TransactionForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { getTransactionById } from "@/services/admin/v1/transaction";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
export default function TransactionDetail({
  params,
}: {
  params: { id: string };
}) {
  const { translations } = useLanguage();
  const transactionDetailQuery = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: async () => {
      const res = await getTransactionById(params.id);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        {translations?.transactionPage?.item} : {params.id}
      </Typography>
      <ComponentCard>
        <TransactionForm
          isLoading={transactionDetailQuery.isLoading}
          transactionData={transactionDetailQuery.data}
          isEdit
        />
      </ComponentCard>
    </div>
  );
}
