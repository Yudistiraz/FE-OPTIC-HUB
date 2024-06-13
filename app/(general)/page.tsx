"use client";

import SalesBarChart from "@/components/features/SalesBarChart";
import ComponentCard from "@/components/layout/ComponentCard";
import CustomDataTable from "@/components/ui/DataTableV2";
import { useLanguage } from "@/context/Language";
import { getBestSellerItem } from "@/services/admin/v1/dashboard";
import { getLowStockProduct } from "@/services/admin/v1/product";
import { Skeleton, Typography } from "@mui/material";

import { useQuery } from "react-query";

export default function Home() {
  const { translations } = useLanguage();
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
      headerName: translations?.Dashboard?.BestSellerTable?.c1,
      flex: 1,
      sortable: false,
      readonly: true,
    },
    {
      field: "totalQty",
      headerName: translations?.Dashboard?.BestSellerTable?.c2,
      flex: 1,
      sortable: false,
      readonly: true,
    },
  ];

  const lowStockColumn = [
    {
      field: "name",
      headerName: translations?.Dashboard?.LowStockTable?.c1,
      flex: 1,
      sortable: false,
      readonly: true,
    },
    {
      field: "quantity",
      headerName: translations?.Dashboard?.LowStockTable?.c2,
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
          {translations?.Dashboard?.BestSellerHeader}
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
          {translations?.Dashboard?.LowStockHeader}
        </Typography>

        {isLowStockLoading ? (
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
