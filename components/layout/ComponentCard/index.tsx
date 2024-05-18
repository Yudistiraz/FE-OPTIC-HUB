import React from "react";

export default function ComponentCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tw-w-full tw-bg-white tw-rounded-md tw-flex tw-flex-col tw-gap-6 tw-p-4 tw-max-w-full">
      {children}
    </div>
  );
}
