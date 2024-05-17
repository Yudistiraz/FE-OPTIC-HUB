"use client";

import CustomDropdown from "@/components/ui/Select";
import CustomButton from "@/components/ui/Button";
import CustomDataTable from "@/components/ui/DataTableV2";
import CustomSearchbar from "@/components/ui/Searchbar";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { Fragment, useEffect } from "react";

import CustomBadge from "@/components/ui/CustomBadge";

import { useQuery } from "react-query";
import { useFilterState } from "@/hooks/useQuery";

import { getThousandSeparator } from "@/utils/function";
import { TRANSACTION_STATUS_OPTIONS } from "@/utils/constants";
import { getAllTransaction } from "@/services/admin/v1/transaction";
import CustomDatePicker from "@/components/ui/DatePicker";
import ComponentCard from "@/components/layout/ComponentCard";

export default function Product() {
  const router = useRouter();
  const {
    page,
    setPage,
    search,
    setSearch,
    additionalParams,
    setAdditionalParams,
    totalPages,
    setTotalPages,
  } = useFilterState();

  const transactionQuery = useQuery({
    queryKey: ["transactions", search, page, additionalParams],
    queryFn: async () => {
      const res = await getAllTransaction({
        keyword: search,
        page: page,
        status: additionalParams.status,
        limit: 10,
      });
      setTotalPages(res?.data?.metadata?.totalPages || 1);
      return res.data.data;
    },
    refetchOnWindowFocus: true,
  });

  const transactionColumn = [
    {
      field: "userName",
      headerName: "Employee Name",
      width: 250,

      sortable: false,
      readonly: true,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.prescription?.customerName;
      },
      readonly: true,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.paymentMethod;
      },
      readonly: true,
    },
    {
      field: "isComplete",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-flex tw-items-center tw-h-full">
              <CustomBadge
                status={data?.row?.status === "complete" ? true : false}
                falseLabel={
                  data?.row?.status === "cancel" ? "Cancelled" : "Ongoing"
                }
                falseColor={
                  data?.row?.status === "cancel"
                    ? "tw-bg-danger-500"
                    : "tw-bg-gray-700"
                }
                trueLabel="Completed"
              />
            </div>
          </Fragment>
        );
      },
      readonly: true,
    },
    {
      field: "totalPrice",
      headerName: "Total Transaction",
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return `Rp. ${getThousandSeparator(data?.row?.totalPrice)}`;
      },
      readonly: true,
    },
  ];

  useEffect(() => {
    console.log(additionalParams);
  }, [additionalParams]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <div className="tw-flex">
        <Typography variant="h2">Transaction</Typography>

        <CustomButton
          className="tw-w-fit tw-ml-auto"
          onClick={() => {
            router.push("/transaction/add");
          }}
        >
          Add Transaction
        </CustomButton>
      </div>

      <ComponentCard>
        <div className="tw-w-full tw-flex lg:tw-flex-row tw-flex-col tw-items-center tw-gap-2">
          <div className="tw-w-full lg:tw-w-1/4">
            <CustomSearchbar
              fullWidth
              search={search}
              debounce
              setSearch={(text: string) => {
                setSearch(text);
              }}
            />
          </div>

          <div className="tw-w-full lg:tw-w-1/4">
            <CustomDropdown
              fullWidth
              label="FILTER BY TRANSACTION STATUS"
              name="PurchaseOptions"
              options={TRANSACTION_STATUS_OPTIONS}
              value={additionalParams.status || ""}
              placeholder="Filter by Transaction Status"
              allOption="All Status"
              onChange={(e) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  status: e.value,
                }));
              }}
            />
          </div>

          <div className="tw-w-full lg:tw-w-1/4">
            <CustomDatePicker
              label="START DATE"
              placeholder="Start Date"
              name="startDate"
              format="DD MMMM YYYY"
              value={additionalParams.startDate}
              onDateChange={(value) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  startDate: value,
                }));
              }}
              moreActions={["clear"]}
            />
          </div>

          <div className="tw-w-full lg:tw-w-1/4">
            <CustomDatePicker
              label="END DATE"
              placeholder="End Date"
              name="endDate"
              format="DD MMMM YYYY"
              value={additionalParams.endDate}
              onDateChange={(value) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  endDate: value,
                }));
              }}
              moreActions={["clear"]}
            />
          </div>
        </div>

        <CustomDataTable
          columns={transactionColumn}
          rows={transactionQuery?.data}
          limit={10}
          disableColumnResize={true}
          disableColumnMenu={true}
          onRowClick={(item: any, data: any) => {
            const cell = data.target.getAttribute("data-colindex");
            if (cell < "5" && cell !== null) {
              router.push(`/transaction/${item?.row?.id}`);
            }
          }}
          onPageChange={(param: number) => {
            setPage(param);
          }}
          page={page}
          totalPage={totalPages}
        />
      </ComponentCard>
    </div>
  );
}
