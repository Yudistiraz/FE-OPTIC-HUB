import CustomButton from "@/components/ui/Button";
import CustomDatePicker from "@/components/ui/DatePicker";
import { useLanguage } from "@/context/Language";
import { exportTransaction } from "@/services/admin/v1/transaction";
import { formatDateParameter } from "@/utils/dateFormatter";
import { getThousandSeparator, joinOrderItemToString } from "@/utils/function";
import { TTransaction } from "@/utils/models";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import * as XLSX from "xlsx";

export default function ExportDialog() {
  const { translations } = useLanguage();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const exportTransactionQuery = useQuery({
    queryKey: ["export-transactions"],
    queryFn: async () => {
      let param: { startDate?: string; endDate?: string } = {};

      if (startDate.length > 0) {
        param.startDate = startDate;
      }

      if (endDate.length > 0) {
        param.endDate = endDate;
      }

      const res = await exportTransaction(param);

      const headers = [
        "ID",
        "DATE",
        "EMPLOYEE NAME",
        "CUSTOMER NAME",
        "CUSTOMER PHONE NUMBER",
        "CUSTOMER EMAIL",
        "WITH PRESCRIPTION",
        "ITEMS",
        "STATUS",
        "PAYMENT METHOD",
        "SUBTOTAL",
        "TAX",
        "TOTAL PRICE",
      ];
      const rows = res.data?.map((transaction: TTransaction) => [
        transaction?.id,
        transaction?.transactionDate,
        transaction?.userName,
        transaction?.prescription?.customerName,
        transaction?.prescription?.customerPhone,
        transaction?.prescription?.customerEmail,
        transaction?.withPrescription ? "Yes" : "No",
        joinOrderItemToString(transaction?.orderItems),
        transaction?.status,
        transaction?.paymentMethod,
        `Rp. ${getThousandSeparator(transaction?.subTotal)}`,
        `Rp. ${getThousandSeparator(transaction?.tax)}`,
        `Rp. ${getThousandSeparator(transaction?.totalPrice)}`,
      ]);

      const rowsWithHeaders = [headers, ...rows];
      const worksheet = XLSX.utils.aoa_to_sheet(rowsWithHeaders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction");
      XLSX.writeFile(workbook, "Transaction.xlsx");

      return res.data;
    },
    enabled: false,
  });

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-p-4 tw-gap-6">
      <Typography variant="title1">Export Transaction</Typography>
      <div className="tw-flex tw-w-full tw-flex-col tw-gap-2">
        <div className="tw-w-full tw-flex tw-gap-4">
          <CustomDatePicker
            label={`${translations?.filter?.byStartDate}`}
            placeholder={translations?.filter?.byStartDate}
            name="startDate"
            format="DD MMMM YYYY"
            value={startDate}
            onDateChange={(value) => {
              setStartDate(formatDateParameter(value));
            }}
            moreActions={["clear"]}
            fullWidth
            orientation="landscape"
            popperHeight="300px"
            disableFuture
          />
          <CustomDatePicker
            label={`${translations?.filter?.byEndDate}`}
            placeholder={translations?.filter?.byEndDate}
            name="endDate"
            format="DD MMMM YYYY"
            value={endDate}
            onDateChange={(value) => {
              setEndDate(formatDateParameter(value));
            }}
            moreActions={["clear"]}
            fullWidth
            orientation="landscape"
            popperHeight="300px"
            disableFuture
          />
        </div>
        <Typography variant="body2" sx={{ fontStyle: "italic", color: "gray" }}>
          *Leave Empty To Export All Data
        </Typography>
      </div>
      <CustomButton
        onClick={() => {
          exportTransactionQuery.refetch();
        }}
        disabled={exportTransactionQuery.isLoading}
      >
        {`Export
          ${translations?.transactionPage?.item}`}
      </CustomButton>
    </div>
  );
}
