"use client";

import SalesBarChart from "@/components/features/SalesBarChart";
import ComponentCard from "@/components/layout/ComponentCard";
import CustomDataTable from "@/components/ui/DataTableV2";
import { getBestSellerItem } from "@/services/admin/v1/dashboard";
import { getLowStockProduct } from "@/services/admin/v1/product";
import { Skeleton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

  const { data: lowStockItem, isLoading: isLowStockLoading } = useQuery(
    ["getLowStockItem"],
    async () => {
      const res = await getLowStockProduct();
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

  const lowStockColumn = [
    {
      field: "name",
      headerName: "ITEM NAME",
      flex: 1,
      sortable: false,
      readonly: true,
    },
    {
      field: "quantity",
      headerName: "STOCK LEFT",
      flex: 1,
      sortable: false,
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-8 tw-w-full">
      <ComponentCard>
        <SalesBarChart />
      </ComponentCard>

      <ComponentCard>
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
      </ComponentCard>

      <ComponentCard>
        <Typography variant="display4" className="tw-uppercase">
          Low Stock Products
        </Typography>

        {isBestSellerItemLoading ? (
          <Skeleton variant="rounded" className="tw-w-full tw-h-80" />
        ) : (
          <CustomDataTable
            disableColumnResize={true}
            disableColumnMenu={true}
            columns={lowStockColumn}
            rows={lowStockItem || []}
            height={300}
            getRowId={(row: any) => row.name}
            hidePagination
          />
        )}
      </ComponentCard>
    </div>
  );
}
