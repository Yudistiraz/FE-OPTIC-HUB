"use client";

import CustomDropdown from "@/components/ui/Select";
import CustomButton from "@/components/ui/Button";
import CustomDataTable from "@/components/ui/DataTableV2";
import CustomSearchbar from "@/components/ui/Searchbar";

import { EMPLOYEE_OPTIONS, STATUS_OPTIONS } from "@/utils/constants";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserState } from "@/context/User";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import CustomBadge from "@/components/ui/CustomBadge";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { useFilterState } from "@/hooks/useQuery";
import { useMutation, useQuery } from "react-query";
import { deleteEmployee, getAllEmployee } from "@/services/admin/v1/employee";
import { checkPageValidity } from "@/utils/function";
import { signOut, useSession } from "next-auth/react";
import ComponentCard from "@/components/layout/ComponentCard";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useLanguage } from "@/context/Language";

export default function Employee() {
  const { translations } = useLanguage();
  const router = useRouter();
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
  } = useUserState();

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
  const [selectedId, setSelectedId] = useState("");
  const session = useSession();

  const employeeQuery = useQuery({
    queryKey: ["employee", search, page, additionalParams],
    queryFn: async () => {
      const res = await getAllEmployee({
        keyword: search,
        page: page,
        role: additionalParams.role,
        status: additionalParams.status,
        limit: 10,
      });
      setTotalPages(res?.data?.metadata?.totalPages || 1);
      return res.data.data;
    },
    refetchOnWindowFocus: true,
  });

  const employeeDeleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.delete} ${translations?.EmployeePage?.item}`
      );
      setOpenDialog(false);
      resetDialogText();
      employeeQuery.refetch();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.delete} ${translations?.EmployeePage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const onDeleteClick = (name: string, id: string) => {
    resetDialogText();
    setSelectedId(id);
    setDialogTitle(`${translations?.dialogBox?.deleteConfirmation} ${name}?`);
    setOpenDialog(true);
  };

  const onPopUpCancel = () => {
    setOpenDialog(false);
    setSelectedId("");
  };

  const onPopUpApply = () => {
    if (selectedId) {
      employeeDeleteMutation.mutate(selectedId);
    }
  };

  const employeeColumn = [
    {
      field: "name",
      headerName: translations?.EmployeePage?.employeeTable?.c1,
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.name;
      },
      readonly: true,
    },
    {
      field: "email",
      headerName: translations?.EmployeePage?.employeeTable?.c2,
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.email;
      },
      readonly: true,
    },
    {
      field: "phoneNumber",
      headerName: translations?.EmployeePage?.employeeTable?.c3,
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return `+62${data?.row?.phone_number}`;
      },
      readonly: true,
    },
    {
      field: "role",
      headerName: translations?.EmployeePage?.employeeTable?.c4,
      width: 100,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <div className="tw-flex tw-items-center tw-h-full tw-capitalize">
            {data?.row?.role !== "staff"
              ? translations?.dropdownOptions.roleOptions[0].label
              : translations?.dropdownOptions.roleOptions[1].label}
          </div>
        );
      },
      readonly: true,
    },
    {
      field: "status",
      headerName: translations?.EmployeePage?.employeeTable?.c5,
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <div className="tw-flex tw-items-center tw-h-full">
            <CustomBadge
              status={data?.row?.status === "active" ? true : false}
            />
          </div>
        );
      },
      readonly: true,
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <div
            className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center"
            id="deleteWrapper"
          >
            <IconButton
              sx={{ "&:hover": { color: "#CF1C0C" }, color: "#EB5757" }}
              onClick={() => {
                onDeleteClick(data?.row?.name, data?.row?.id);
                console.log(data?.row?.name);
              }}
              id="deleteButton"
              disabled={
                data?.row?.id === session?.data?.user?.id ? true : false
              }
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <div className="tw-flex">
        <Typography variant="h2">
          {translations?.EmployeePage?.header}
        </Typography>

        <CustomButton
          className="tw-w-[165px] tw-ml-auto tw-uppercase"
          onClick={() => {
            router.push("/employee/add");
          }}
        >
          {`${translations?.button?.add} 
          ${translations?.EmployeePage?.item}`}
        </CustomButton>
      </div>

      <ComponentCard>
        <div className="tw-w-full tw-flex tw-items-center tw-gap-8">
          <div className="tw-w-1/3">
            <CustomSearchbar
              fullWidth
              search={search}
              debounce
              setSearch={(text: string) => {
                setSearch(text);
              }}
            />
          </div>

          <div className="tw-w-1/3">
            <CustomDropdown
              fullWidth
              label={`${translations?.filter?.main} ${translations?.filter?.byRole}`}
              name="employeeRole"
              options={translations?.dropdownOptions?.roleOptions}
              value={additionalParams.role || ""}
              placeholder="Filter by Role"
              allOption={translations?.dropdownOptions?.allRole}
              onChange={(e) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  role: e.value,
                }));
              }}
            />
          </div>

          <div className="tw-w-1/3">
            <CustomDropdown
              fullWidth
              label={`${translations?.filter?.main} ${translations?.filter?.byStatus}`}
              name="employeeStatus"
              options={translations?.dropdownOptions?.statusOptions}
              value={additionalParams.status || ""}
              placeholder={`${translations?.filter?.main} ${translations?.filter?.byStatus}`}
              allOption={translations?.dropdownOptions?.allStatus}
              onChange={(e) => {
                setAdditionalParams((prevState) => ({
                  ...prevState,
                  status: e.value,
                }));
              }}
            />
          </div>
        </div>
        <CustomDataTable
          columns={employeeColumn}
          rows={employeeQuery?.data}
          limit={10}
          disableColumnResize={true}
          disableColumnMenu={true}
          onRowClick={(item: any, data: any) => {
            const cell = data.target.getAttribute("data-colindex");
            const target = data.target;
            if (
              cell !== "5" &&
              !(target instanceof SVGElement) &&
              target.tagName.toLowerCase() !== "path" &&
              target.id !== "deleteWrapper" &&
              target.id !== "deleteButton"
            ) {
              router.push(`/employee/${item?.row?.id}`);
            }
          }}
          onPageChange={(param: number) => {
            setPage(param);
          }}
          page={page}
          totalPage={totalPages}
        />
      </ComponentCard>

      <CustomDialog open={openDialog} independent maxWidth="xs">
        <ConfirmationDialog
          title={dialogTitle}
          description={dialogMessage}
          applyText={translations?.button?.yes}
          cancelText={translations?.button?.no}
          type={"confirmation"}
          onCancel={onPopUpCancel}
          onApply={onPopUpApply}
        />
      </CustomDialog>
    </div>
  );
}
