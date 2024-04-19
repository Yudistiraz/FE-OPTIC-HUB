"use client";

import CustomDropdown from "@/components/ui/Select";
import CustomButton from "@/components/ui/Button";
import CustomDataTable from "@/components/ui/DataTableV2";
import CustomSearchbar from "@/components/ui/Searchbar";

import { DUMMY_EMPLOYEE, STATUS_OPTIONS } from "@/utils/constants";
import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserState } from "@/context/User";
import { Fragment, useState } from "react";
import { Delete } from "@mui/icons-material";
import CustomBadge from "@/components/ui/CustomBadge";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { useFilterState } from "@/hooks/useQuery";
import { useMutation, useQuery } from "react-query";
import { deleteEmployee, getAllEmployee } from "@/services/admin/v1/employee";
import { checkPageValidity } from "@/utils/function";
import { signOut, useSession } from "next-auth/react";

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

  const { page, setPage, search, setSearch } = useFilterState();
  const [selectedId, setSelectedId] = useState("");
  const session = useSession();

  const employeeQuery = useQuery({
    queryKey: ["employee", search, page],
    queryFn: async () => {
      const res = await getAllEmployee({
        search: search,
        page: page,
        limit: 10,
      });
      return res.data.data;
    },
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
        return data?.row?.phone_number;
      },
      readonly: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-flex tw-items-center tw-h-full">
              <CustomBadge
                status={data?.row?.role === "owner" ? true : false}
                trueLabel="Owner"
                falseLabel="Staff"
              />
            </div>
          </Fragment>
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
          <Fragment>
            <div className="tw-flex">
              {data?.row?.status ? "Active" : "Inactive"}
            </div>
          </Fragment>
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
          <Fragment>
            <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
              <IconButton
                sx={{ "&:hover": { color: "#CF1C0C" }, color: "#EB5757" }}
                onClick={() => {
                  onDeleteClick(data?.row?.name, data?.row?.id);
                  console.log(data?.row?.name);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          </Fragment>
        );
      },
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
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

      <div className="tw-w-full tw-flex tw-items-center tw-gap-8">
        <div className="tw-w-1/4">
          <CustomSearchbar
            fullWidth
            search=""
            debounce
            setSearch={() => {
              console.log("ok");
            }}
          />
        </div>

        <div className="tw-w-1/3">
          <CustomDropdown
            fullWidth
            label="FILTER BY ROLE"
            name="PurchaseOptions"
            options={STATUS_OPTIONS}
            value={""}
            placeholder="Filter by Role"
            allOption="All Role"
            onChange={(e) => {
              console.log(e);

              //   setAdditionalParams((prevState) => ({
              //     ...prevState,
              //     type: e.value,
              //   }));
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
          if (cell < "5" && cell !== null) {
            router.push(`/employee/${item?.row?.id}`);
          }
        }}
        onPageChange={(param: number) => {
          //   setPage(param);
        }}
        page={1}
        totalPage={10}
        getRowId={(row: any) => row?.name}
      />

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
