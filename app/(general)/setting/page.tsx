"use client";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { Typography } from "@mui/material";

export default function Setting() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">User Setting</Typography>
      <ComponentCard>
        <ChangePasswordForm />
      </ComponentCard>
    </div>
  );
}
