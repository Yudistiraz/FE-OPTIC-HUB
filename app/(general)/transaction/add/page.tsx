"use client";

import ProductForm from "@/components/form/product";
import TransactionForm from "@/components/form/transaction";
import { Typography } from "@mui/material";

export default function addTransaction() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Add Transaction</Typography>
      <TransactionForm />
    </div>
  );
}
