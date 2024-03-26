"use client";
import EmployeeForm from "@/components/form/employee";
import { Typography } from "@mui/material";

export default function Employee() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">Add Employee</Typography>
      <EmployeeForm />
    </div>
  );
}
