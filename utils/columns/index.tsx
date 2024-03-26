import CustomBadge from "@/components/ui/CustomBadge";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { Fragment } from "react";

export const employeeColumn = [
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
      return `+62 ${data?.row?.phone}`;
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
                console.log(data.id);
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
