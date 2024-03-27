"use client";

import CustomDropdown from "@/components/ui/Select";
import CustomButton from "@/components/ui/Button";
import CustomDataTable from "@/components/ui/DataTableV2";
import CustomSearchbar from "@/components/ui/Searchbar";
import { employeeColumn } from "@/utils/columns";
import { DUMMY_EMPLOYEE, STATUS_OPTIONS } from "@/utils/constants";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Employee() {
  const router = useRouter();
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <div className="tw-flex">
        <Typography variant="h2">Employee</Typography>

        <CustomButton
          className="tw-w-[165px] tw-ml-auto"
          onClick={() => {
            router.push("/employee/add");
          }}
        >
          Add Employee
        </CustomButton>
      </div>

      <div className="tw-w-full tw-flex tw-items-center tw-gap-8">
        <div className="tw-w-1/4">
          <CustomSearchbar
            fullWidth
            search=""
            debounce
            setSearch={() => {
              console.log("ok");
            }}
          />
        </div>

        <div className="tw-w-1/3">
          <CustomDropdown
            fullWidth
            label="FILTER BY ROLE"
            name="PurchaseOptions"
            options={STATUS_OPTIONS}
            value={""}
            placeholder="Filter by Role"
            allOption="All Role"
            onChange={(e) => {
              console.log(e);

              //   setAdditionalParams((prevState) => ({
              //     ...prevState,
              //     type: e.value,
              //   }));
            }}
          />
        </div>
      </div>

      <CustomDataTable
        columns={employeeColumn}
        rows={DUMMY_EMPLOYEE}
        limit={10}
        disableColumnResize={true}
        disableColumnMenu={true}
        onRowClick={(item: any, data: any) => {
          const cell = data.target.getAttribute("data-colindex");
          if (cell < "5" && cell !== null) {
            router.push(`/employee/${item?.row?.id}`);
          }
        }}
        onPageChange={(param: number) => {
          //   setPage(param);
        }}
        page={1}
        totalPage={10}
      />
    </div>
  );
}
