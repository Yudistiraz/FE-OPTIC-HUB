"use client";
import EmployeeForm from "@/components/form/employee";
import { DUMMY_EMPLOYEE } from "@/utils/constants";
import { findDataById } from "@/utils/function";
import { TEmployee } from "@/utils/models";
import { Typography } from "@mui/material";

export default function EmployeeDetail({ params }: { params: { id: string } }) {
  const data: TEmployee | undefined = findDataById(DUMMY_EMPLOYEE, params.id);
  console.log(data);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Employee : {params.id}</Typography>
      <EmployeeForm isEdit data={data} />
    </div>
  );
}
