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
import ComponentCard from "@/components/layout/ComponentCard";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useLanguage } from "@/context/Language";

export default function Product() {
  const { translations } = useLanguage();
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
      toast.success(
        `${translations?.toast?.success?.delete} ${translations?.productPage?.item}`
      );
      setOpenDialog(false);
      resetDialogText();
      setSelectedId("");
      productsQuery.refetch();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.delete} ${translations?.productPage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const onDeleteClick = (name: string, id: string) => {
    resetDialogText();
    setSelectedId(id);
    setDialogTitle(`${translations?.dialogBox?.deleteConfirmation} ${name}?`);
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
      headerName: translations?.productPage?.productTable?.c1,
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
      headerName: translations?.productPage?.productTable?.c2,
      minWidth: 250,
      sortable: false,
      renderCell: (data: any) => {
        return <div className="tw-capitalize">{data?.row?.category?.name}</div>;
      },
      readonly: true,
    },
    {
      field: "price",
      headerName: translations?.productPage?.productTable?.c3,
      minWidth: 250,
      sortable: false,
      renderCell: (data: any) => {
        return `Rp. ${getThousandSeparator(data?.row?.price)}`;
      },
      readonly: true,
    },
    {
      field: "qty",
      headerName: translations?.productPage?.productTable?.c4,
      minWidth: 150,
      sortable: false,
      renderCell: (data: any) => {
        return data?.row?.quantity;
      },
      readonly: true,
    },
    {
      field: "active",
      headerName: translations?.productPage?.productTable?.c5,
      minWidth: 150,
      sortable: false,
      renderCell: (data: any) => {
        return (
          <Fragment>
            <div className="tw-flex tw-items-center tw-h-full">
              <CustomBadge
                status={data?.row?.status === "active" ? true : false}
              />
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
          <div
            className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center"
            id="deleteWrapper"
          >
            <IconButton
              sx={{ "&:hover": { color: "#CF1C0C" }, color: "#EB5757" }}
              onClick={() => {
                onDeleteClick(data?.row?.name, data.row?.id);
              }}
              id="deleteButton"
            >
              <Delete />
            </IconButton>
          </div>
        );
      },
      readonly: true,
    },
  ];

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-w-full">
      <div className="tw-flex">
        <Typography variant="h2">
          {translations?.productPage?.header}
        </Typography>

        <CustomButton
          className="tw-w-[165px] tw-ml-auto tw-uppercase"
          onClick={() => {
            router.push("/product/add");
          }}
        >
          {`${translations?.button?.add} 
          ${translations?.productPage?.item}`}
        </CustomButton>
      </div>

      <ComponentCard>
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
              label={`${translations?.filter?.main} ${translations?.filter?.byCategory}`}
              name="categoryOptions"
              options={convertDataToDropdownOptions(
                productCategoryQuery.data,
                "name",
                "id"
              )}
              value={additionalParams.categoryId || ""}
              placeholder={`${translations?.filter?.main} ${translations?.filter?.byCategory}`}
              allOption={translations?.dropdownOptions?.allCategory}
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
              label={`${translations?.filter?.main} ${translations?.filter?.byStatus}`}
              name="PurchaseOptions"
              options={translations?.dropdownOptions?.statusOptions}
              value={additionalParams.status || ""}
              placeholder={`${translations?.filter?.main} ${translations?.filter?.byStatus}`}
              allOption={translations?.dropdownOptions?.allStatus}
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
              const target = data.target;
              if (
                cell !== "5" &&
                !(target instanceof SVGElement) &&
                target.tagName.toLowerCase() !== "path" &&
                target.id !== "deleteWrapper" &&
                target.id !== "deleteButton"
              ) {
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
      </ComponentCard>

      <CustomDialog open={openDialog} independent maxWidth="xs">
        <ConfirmationDialog
          title={dialogTitle}
          description={dialogMessage}
          applyText={translations?.button?.yes}
          cancelText={translations?.button?.no}
          type={"confirmation"}
          onCancel={onPopUpCancel}
          onApply={onPopUpApply}
        />
      </CustomDialog>
    </div>
  );
}
