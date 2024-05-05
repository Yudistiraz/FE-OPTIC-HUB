"use client";

import CustomDropdown from "@/components/ui/Select";
import CustomButton from "@/components/ui/Button";
import CustomDataTable from "@/components/ui/DataTableV2";
import CustomSearchbar from "@/components/ui/Searchbar";

import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserState } from "@/context/User";
import { Fragment } from "react";
import { Delete } from "@mui/icons-material";
import CustomBadge from "@/components/ui/CustomBadge";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { useMutation, useQuery } from "react-query";
import { useFilterState } from "@/hooks/useQuery";
import { deleteProduct, getAllProduct } from "@/services/admin/v1/product";
import { getAllProductCategory } from "@/services/admin/v1/productCategory";
import {
  convertDataToDropdownOptions,
  getThousandSeparator,
} from "@/utils/function";
import { STATUS_OPTIONS } from "@/utils/constants";

export default function Product() {
  const router = useRouter();
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
    selectedId,
    setSelectedId,
  } = useUserState();
  const {
    page,
    setPage,
    search,
    setSearch,
    additionalParams,
    setAdditionalParams,
    totalPages,
    setTotalPages,
  } = useFilterState();

  const productsQuery = useQuery({
    queryKey: ["products", search, page, additionalParams],
    queryFn: async () => {
      const res = await getAllProduct({
        keyword: search,
        categoryId: additionalParams.categoryId || "",
        status: additionalParams.status || "",
        page: page,
        limit: 10,
      });
      setTotalPages(res?.data?.metadata?.totalPages || 1);
      return res.data.data;
    },
    refetchOnWindowFocus: true,
  });

  const productCategoryQuery = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await getAllProductCategory();
      return res.data?.data;
    },
    refetchOnWindowFocus: false,
  });

  const productDeleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      // toast.success("Success Added Admin");
      setOpenDialog(false);
      resetDialogText();
      setSelectedId("");
      productsQuery.refetch();
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Error";
      // toast.error(errorMessage);
    },
  });

  const onDeleteClick = (name: string, id: string) => {
    resetDialogText();
    setSelectedId(id);
    setDialogTitle(`Are you sure you want to Delete ${name} Product?`);
    setOpenDialog(true);
  };

  const onPopUpCancel = () => {
    setOpenDialog(false);
    setSelectedId("");
  };

  const onPopUpApply = () => {
    if (selectedId) {
      productDeleteMutation.mutate(selectedId);
    }
  };

  const productColumn = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.name;
      },
      readonly: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return <div className="tw-capitalize">{data?.row?.category?.name}</div>;
      },
      readonly: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 250,
      sortable: false,
      renderCell: (data: any) => {
        return `Rp. ${getThousandSeparator(data?.row?.price)}`;
      },
      readonly: true,
    },
    {
      field: "qty",
      headerName: "In Stock",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.quantity;
      },
      readonly: true,
    },
    {
      field: "active",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-flex tw-items-center tw-h-full">
              <CustomBadge status={data?.row?.status} />
            </div>
          </Fragment>
        );
      },
      readonly: true,
    },
    {
      field: "delete",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
              <IconButton
                sx={{ "&:hover": { color: "#CF1C0C" }, color: "#EB5757" }}
                onClick={() => {
                  onDeleteClick(data?.row?.name, data.row?.id);
                  console.log(data?.row?.name);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          </Fragment>
        );
      },
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <div className="tw-flex">
        <Typography variant="h2">Product</Typography>

        <CustomButton
          className="tw-w-[165px] tw-ml-auto"
          onClick={() => {
            router.push("/product/add");
          }}
        >
          Add Product
        </CustomButton>
      </div>

      <div className="tw-w-full tw-flex tw-items-center tw-gap-8">
        <div className="tw-w-1/4">
          <CustomSearchbar
            fullWidth
            search={search}
            debounce
            setSearch={(text: string) => {
              setSearch(text);
            }}
          />
        </div>

        <div className="tw-w-1/3">
          <CustomDropdown
            fullWidth
            label="FILTER BY CATEGORY"
            name="categoryOptions"
            options={convertDataToDropdownOptions(
              productCategoryQuery.data,
              "name",
              "id"
            )}
            value={additionalParams.categoryId || ""}
            placeholder="Filter by Category"
            allOption="All Category"
            disabled={productCategoryQuery.isLoading}
            onChange={(e) => {
              setAdditionalParams((prevState) => ({
                ...prevState,
                categoryId: e.value,
              }));
            }}
          />
        </div>

        <div className="tw-w-1/3">
          <CustomDropdown
            fullWidth
            label="FILTER BY STATUS"
            name="PurchaseOptions"
            options={STATUS_OPTIONS}
            value={additionalParams.status || ""}
            placeholder="Filter by Status"
            allOption="All Status"
            onChange={(e) => {
              setAdditionalParams((prevState) => ({
                ...prevState,
                status: e.value,
              }));
            }}
          />
        </div>
      </div>

      {!productsQuery.isLoading && !productCategoryQuery.isLoading && (
        <CustomDataTable
          columns={productColumn}
          rows={productsQuery.data}
          limit={10}
          disableColumnResize={true}
          disableColumnMenu={true}
          onRowClick={(item: any, data: any) => {
            const cell = data.target.getAttribute("data-colindex");
            if (cell < "5" && cell !== null) {
              router.push(`/product/${item?.row?.id}`);
            }
          }}
          onPageChange={(param: number) => {
            setPage(param);
          }}
          page={page}
          totalPage={totalPages}
        />
      )}

      <CustomDialog open={openDialog} independent maxWidth="xs">
        <ConfirmationDialog
          title={dialogTitle}
          description={dialogMessage}
          applyText={"YES"}
          cancelText={"NO"}
          type={"confirmation"}
          onCancel={onPopUpCancel}
          onApply={onPopUpApply}
        />
      </CustomDialog>
    </div>
  );
}
