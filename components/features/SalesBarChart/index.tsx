"use client";
import CustomButton from "@/components/ui/Button";
import { useLanguage } from "@/context/Language";
import { getDashboardSalesReports } from "@/services/admin/v1/dashboard";
import { getThousandSeparator, transformArrayBarChart } from "@/utils/function";
import { Skeleton, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useState } from "react";
import { useQuery } from "react-query";

const SalesBarChart = () => {
  const [range, SetRange] = useState("");
  const { translations } = useLanguage();
  const {
    data: salesData,
    isLoading: salesDataIsLoading,
    isRefetching: salesDataIsRefetching,
  } = useQuery(
    ["getDashboardSalesReports", { range }],
    async () => {
      const res = await getDashboardSalesReports({
        period: range,
      });
      let dataSet = [];
      if (range === "month") {
        dataSet = transformArrayBarChart(res?.data, "month");
      } else if (range === "year") {
        dataSet = transformArrayBarChart(res?.data?.yearlyData, "year");
      } else {
        dataSet = transformArrayBarChart(res?.data, "week");
      }

      return dataSet || [];
    },
    {
      refetchOnWindowFocus: true,
      retry: false,
    }
  );

  const valueFormatter = (value: number | null) => {
    if (value) {
      return `Rp. ${getThousandSeparator(value)}`;
    } else {
      return "0";
    }
  };

  return (
    <div className="tw-w-full tw-flex tw-flex-col tw-gap-8">
      <div className="tw-flex tw-w-full tw-items-center">
        <Typography variant="display4" className="tw-uppercase">
          {translations?.Dashboard?.GraphSalesHeader}
        </Typography>
        <div className="tw-flex tw-gap-4 tw-ml-auto">
          <CustomButton
            disabled={range === "" && true}
            onClick={() => {
              SetRange("");
            }}
          >
            {translations?.Dashboard?.GraphOptions?.weekly}
          </CustomButton>
          <CustomButton
            disabled={range === "month" && true}
            onClick={() => {
              SetRange("month");
            }}
          >
            {translations?.Dashboard?.GraphOptions?.monthly}
          </CustomButton>
          <CustomButton
            disabled={range === "year" && true}
            onClick={() => {
              SetRange("year");
            }}
          >
            {translations?.Dashboard?.GraphOptions?.yearly}
          </CustomButton>
        </div>
      </div>
      {salesDataIsLoading && salesDataIsRefetching ? (
        <Skeleton className="tw-w-full tw-h-[280px]" variant="rounded" />
      ) : (
        <BarChart
          dataset={salesData || [{ time: "No Data", sales: 0 }]}
          xAxis={[{ scaleType: "band", dataKey: "time" }]}
          series={[
            {
              dataKey: "sales",
              label: "Sales : ",
              valueFormatter,
              color: "#232323",
            },
          ]}
          height={280}
          margin={{
            left: 80,
          }}
          sx={{
            "& .MuiBarElement-root": {
              borderRadius: "20px",
              // eslint-disable-next-line quotes
              fill: "url('#customGradient')",
            },
          }}
          slotProps={{
            legend: { hidden: true },
            bar: { clipPath: `inset(0px round 5px 5px 0px 0px)` },
          }}
        >
          <defs>
            <linearGradient id="customGradient" gradientTransform="rotate(90)">
              <stop offset="45%" stopColor="#3671FB" />
              <stop offset="95%" stopColor="#457EFF" />
            </linearGradient>
          </defs>
        </BarChart>
      )}
    </div>
  );
};

export default SalesBarChart;
