import CustomButton from "@/components/ui/Button";
import { getDashboardSalesReports } from "@/services/admin/v1/dashboard";
import { getThousandSeparator, transformArrayBarChart } from "@/utils/function";
import { Skeleton, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React, { useState } from "react";
import { useQuery } from "react-query";

const SalesBarChart = () => {
  const [range, SetRange] = useState("");
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
        dataSet = transformArrayBarChart(res?.data, "year");
      } else {
        dataSet = transformArrayBarChart(res?.data, "week");
      }

      console.log(dataSet);

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
    <div className="tw-w-full tw-p-4 tw-bg-gray-100 tw-rounded-md tw-flex tw-flex-col tw-gap-8">
      <div className="tw-flex tw-w-full tw-items-center">
        <Typography variant="display4" className="tw-uppercase">
          Sales Report
        </Typography>
        <div className="tw-flex tw-gap-4 tw-ml-auto">
          <CustomButton
            disabled={range === "" && true}
            onClick={() => {
              SetRange("");
            }}
          >
            Weekly
          </CustomButton>
          <CustomButton
            disabled={range === "month" && true}
            onClick={() => {
              SetRange("month");
            }}
          >
            Monthly
          </CustomButton>
          <CustomButton
            disabled={range === "year" && true}
            onClick={() => {
              SetRange("year");
            }}
          >
            Yearly
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
