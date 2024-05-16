"use client";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import { Typography } from "@mui/material";

export default function Setting() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <Typography variant="h2">User Setting</Typography>
      <ChangePasswordForm />
    </div>
  );
}
