"use client";
import TransactionForm from "@/components/form/TransactionForm";
import { getTransactionById } from "@/services/admin/v1/transaction";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
export default function TransactionDetail({
  params,
}: {
  params: { id: string };
}) {
  const transactionDetailQuery = useQuery({
    queryKey: ["transaction", params.id],
    queryFn: async () => {
      const res = await getTransactionById(params.id);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Transaction : {params.id}</Typography>
      <TransactionForm
        isLoading={transactionDetailQuery.isLoading}
        transactionData={transactionDetailQuery.data}
        isEdit
      />
    </div>
  );
}
