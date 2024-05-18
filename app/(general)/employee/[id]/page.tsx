"use client";
import EmployeeForm from "@/components/form/EmployeeForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { getEmployeeById } from "@/services/admin/v1/employee";
import { Typography } from "@mui/material";
import { Fragment } from "react";
import { useQuery } from "react-query";

export default function EmployeeDetail({ params }: { params: { id: string } }) {
  const employeeDetailQuery = useQuery({
    queryKey: ["employee", params.id],
    queryFn: async () => {
      const res = await getEmployeeById(params.id);
      return res.data;
    },
  });
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">
        Employee : {employeeDetailQuery?.data?.name}
      </Typography>
      <ComponentCard>
        <EmployeeForm
          isEdit
          data={employeeDetailQuery?.data}
          isLoading={employeeDetailQuery.isLoading}
        />
      </ComponentCard>
    </div>
  );
}
