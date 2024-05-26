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

export default function Employee() {
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
      // toast.success("Success Added Admin");
      setOpenDialog(false);
      resetDialogText();
      if (selectedId) {
        if (selectedId === session?.data?.user?.id) {
          signOut();
        } else {
          employeeQuery.refetch();
        }
      }
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Error";
      // toast.error(errorMessage);
    },
  });

  const onDeleteClick = (name: string, id: string) => {
    resetDialogText();
    setSelectedId(id);
    setDialogTitle(`Are you sure you want to Delete ${name} Employee?`);
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
      headerName: "NAME",
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
      headerName: "EMAIL",
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.email;
      },
      readonly: true,
    },
    {
      field: "phoneNumber",
      headerName: "PHONE NUMBER",
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return `+62${data?.row?.phone_number}`;
      },
      readonly: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <div className="tw-flex tw-items-center tw-h-full tw-capitalize">
            {data?.row?.role}
          </div>
        );
      },
      readonly: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <div className="tw-flex tw-items-center tw-h-full">
            <CustomBadge
              status={data?.row?.status === "active" ? true : false}
              trueLabel="Active"
              falseLabel="Inactive"
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
        <Typography variant="h2">Employee</Typography>

        <CustomButton
          className="tw-w-[165px] tw-ml-auto"
          onClick={() => {
            router.push("/employee/add");
          }}
        >
          Add Employee
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
              label="FILTER BY ROLE"
              name="PurchaseOptions"
              options={EMPLOYEE_OPTIONS}
              value={additionalParams.role || ""}
              placeholder="Filter by Role"
              allOption="All Role"
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
              label="FILTER BY STATUS"
              name="PurchaseOptions"
              options={STATUS_OPTIONS}
              value={additionalParams.status || ""}
              placeholder="Filter by Status"
              allOption="All Status"
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
          applyText={"YES"}
          cancelText={"NO"}
          type={"confirmation"}
          onCancel={onPopUpCancel}
          onApply={onPopUpApply}
        />
      </CustomDialog>
    </div>
  );
}
