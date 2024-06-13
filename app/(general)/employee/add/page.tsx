"use client";
import EmployeeForm from "@/components/form/EmployeeForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { Typography } from "@mui/material";

export default function AddEmployee() {
  const { translations } = useLanguage();
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        {translations?.EmployeePage.createHeader}
      </Typography>
      <ComponentCard>
        <EmployeeForm />
      </ComponentCard>
    </div>
  );
}
