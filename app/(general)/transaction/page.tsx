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
import { useLanguage } from "@/context/Language";
import { formatDateParameter, formateDate3 } from "@/utils/dateFormatter";
import CustomDialog from "@/components/ui/Dialog";
import { useUserState } from "@/context/User";
import ExportDialog from "@/components/features/ExportDialog";

export default function Product() {
  const { translations } = useLanguage();
  const router = useRouter();
  const { openDialog, setOpenDialog } = useUserState();
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
        status: additionalParams?.status,
        startDate: additionalParams?.startDate,
        endDate: additionalParams?.endDate,
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
      headerName: translations?.transactionPage?.transactionTable?.c1,
      width: 200,
      sortable: false,
      readonly: true,
    },
    {
      field: "customerName",
      headerName: translations?.transactionPage?.transactionTable?.c2,
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
      headerName: translations?.transactionPage?.transactionTable?.c3,
      width: 175,
      sortable: false,
      renderCell: (data: any) => {
        return <div className="tw-uppercase">{data?.row?.paymentMethod}</div>;
      },
      readonly: true,
    },
    {
      field: "totalPrice",
      headerName: translations?.transactionPage?.transactionTable?.c5,
      width: 200,
      sortable: false,
      renderCell: (data: any) => {
        return `Rp. ${getThousandSeparator(data?.row?.totalPrice)}`;
      },
      readonly: true,
    },
    {
      field: "isComplete",
      headerName: translations?.transactionPage?.transactionTable?.c4,
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-flex tw-items-center tw-h-full">
              <CustomBadge
                status={data?.row?.status === "complete" ? true : false}
                falseLabel={
                  data?.row?.status === "cancel"
                    ? translations?.dropdownOptions?.transactionStatusOptions[2]
                        ?.label
                    : translations?.dropdownOptions?.transactionStatusOptions[1]
                        ?.label
                }
                falseColor={
                  data?.row?.status === "cancel"
                    ? "tw-bg-danger-500"
                    : "tw-bg-gray-700"
                }
                trueLabel={
                  translations?.dropdownOptions?.transactionStatusOptions[0]
                    ?.label
                }
              />
            </div>
          </Fragment>
        );
      },
      readonly: true,
    },
    {
      field: "date",
      headerName: translations?.transactionPage?.transactionTable?.c6,
      width: 200,
      sortable: false,
      renderCell: (data: any) => {
        return formateDate3(data?.row?.transactionDate);
      },
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <div className="tw-flex tw-items-center">
        <Typography variant="h2">
          {translations?.transactionPage?.header}
        </Typography>

        <div className="tw-ml-auto tw-flex tw-gap-2">
          <CustomButton
            className="tw-w-fit"
            onClick={() => {
              router.push("/transaction/add");
            }}
          >
            {`${translations?.button?.add} 
          ${translations?.transactionPage?.item}`}
          </CustomButton>

          <CustomButton
            className="tw-w-fit"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            {`Export
          ${translations?.transactionPage?.item}`}
          </CustomButton>
        </div>
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
              label={`${translations?.filter?.main} ${translations?.filter?.byTransactionStatus}`}
              name="PurchaseOptions"
              options={TRANSACTION_STATUS_OPTIONS}
              value={additionalParams.status || ""}
              placeholder={`${translations?.filter?.main} ${translations?.filter?.byTransactionStatus}`}
              allOption={translations?.dropdownOptions?.allStatus}
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
              label={`${translations?.filter?.main} ${translations?.filter?.byStartDate}`}
              placeholder={translations?.filter?.byStartDate}
              name="startDate"
              format="DD MMMM YYYY"
              value={additionalParams.startDate}
              onDateChange={(value) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  startDate: formatDateParameter(value),
                }));
              }}
              moreActions={["clear"]}
              disableFuture
            />
          </div>

          <div className="tw-w-full lg:tw-w-1/4">
            <CustomDatePicker
              label={`${translations?.filter?.main} ${translations?.filter?.byEndDate}`}
              placeholder={translations?.filter?.byEndDate}
              name="endDate"
              format="DD MMMM YYYY"
              value={additionalParams.endDate}
              onDateChange={(value) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  endDate: formatDateParameter(value),
                }));
              }}
              disableFuture
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
          onRowClick={(item: any) => {
            router.push(`/transaction/${item?.row?.id}`);
          }}
          onPageChange={(param: number) => {
            setPage(param);
          }}
          page={page}
          totalPage={totalPages}
        />
      </ComponentCard>

      <CustomDialog
        open={openDialog}
        maxWidth="sm"
        independent
        handleClose={() => {
          setOpenDialog(false);
        }}
      >
        <ExportDialog />
      </CustomDialog>
    </div>
  );
}
