"use client";
import EmployeeForm from "@/components/form/EmployeeForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { Typography } from "@mui/material";

export default function AddEmployee() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">Add Employee</Typography>
      <ComponentCard>
        <EmployeeForm />
      </ComponentCard>
    </div>
  );
}
