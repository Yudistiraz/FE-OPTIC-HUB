"use client";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import ComponentCard from "@/components/layout/ComponentCard";
import { useLanguage } from "@/context/Language";
import { Typography } from "@mui/material";

export default function Setting() {
  const { translations } = useLanguage();
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <Typography variant="h2">{translations?.settingPage?.header}</Typography>
      <ComponentCard>
        <ChangePasswordForm />
      </ComponentCard>
    </div>
  );
}
