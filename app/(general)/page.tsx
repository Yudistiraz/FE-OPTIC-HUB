"use client";

import SalesBarChart from "@/components/features/SalesBarChart";
import CustomDataTable from "@/components/ui/DataTableV2";
import { getBestSellerItem } from "@/services/admin/v1/dashboard";
import { Skeleton, Typography } from "@mui/material";
import { useQuery } from "react-query";

export default function Home() {
  const { data: bestSellerItem, isLoading: isBestSellerItemLoading } = useQuery(
    ["getBestSellerItem"],
    async () => {
      const res = await getBestSellerItem();
      return res?.data || [];
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const bestSellerColumn = [
    {
      field: "name",
      headerName: "ITEM NAME",
      flex: 1,
      sortable: false,
      readonly: true,
    },
    {
      field: "totalQty",
      headerName: "TOTAL SOLD",
      flex: 1,
      sortable: false,
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-8">
      <SalesBarChart />

      <div className="tw-w-full tw-p-4 tw-bg-white tw-rounded-md tw-flex tw-flex-col tw-gap-8">
        <Typography variant="display4" className="tw-uppercase">
          Best seller item
        </Typography>

        {isBestSellerItemLoading ? (
          <Skeleton variant="rounded" className="tw-w-full tw-h-80" />
        ) : (
          <CustomDataTable
            disableColumnResize={true}
            disableColumnMenu={true}
            columns={bestSellerColumn}
            rows={bestSellerItem || []}
            height={300}
            getRowId={(row: any) => row.productId}
            hidePagination
          />
        )}
      </div>
    </div>
  );
}
