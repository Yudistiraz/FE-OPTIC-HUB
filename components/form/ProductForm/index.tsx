"use client";
import { useCustomFormik } from "@/hooks/formik";
import { yupAddProductScheme } from "@/utils/yup";

import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import {
  convertDataToDropdownOptions,
  convertEnumValue,
  gethelperText,
  removeThousandsSeparator,
  removeThousandsSeparatortoString,
} from "@/utils/function";
import CustomDropdown from "@/components/ui/Select";
import CustomSwitch from "@/components/ui/Switch";
import { TProduct } from "@/utils/models";
import { useUserState } from "@/context/User";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { NumericFormat } from "react-number-format";
import ImageUpload from "@/components/ui/ImageUpload";
import { useMutation, useQuery } from "react-query";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "@/services/admin/v1/product";
import { useRouter } from "next/navigation";
import { getAllProductCategory } from "@/services/admin/v1/productCategory";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import LoadingSkeletonForm from "../LoadingSkeletonForm";
import { useLanguage } from "@/context/Language";

interface ProductFormProps {
  isLoading?: boolean;
  isEdit?: boolean;
  data?: TProduct | null;
}

const ProductForm = ({
  isEdit = false,
  data = null,
  isLoading = false,
}: ProductFormProps) => {
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
  } = useUserState();

  const { translations } = useLanguage();
  const productScheme = yupAddProductScheme(translations);
  const router = useRouter();

  const productCategoryQuery = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await getAllProductCategory();
      return res.data?.data;
    },
  });

  const productAddMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.create} ${translations?.productPage?.item}`
      );
      router.push("/product");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.create} ${translations?.productPage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const productUpdateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.update} ${translations?.productPage?.item}`
      );
      router.push("/product");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.update} ${translations?.productPage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const productDeleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.delete} ${translations?.productPage?.item}`
      );
      setOpenDialog(false);
      resetDialogText();
      router.push("/product");
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

  const onPopUpCancel = () => {
    setOpenDialog(false);
  };

  const onPopUpApply = () => {
    if (data?.id) {
      productDeleteMutation.mutate(data.id);
    }
  };

  const onDeleteClick = () => {
    resetDialogText();
    setDialogTitle(
      `${translations?.dialogBox?.deleteConfirmation} ${data?.name}?`
    );
    setOpenDialog(true);
  };

  const formik = useCustomFormik({
    initialValues: {
      id: data?.id || "",
      name: data?.name || "",
      categoryId: data?.categoryId || "",
      price: data?.price || "",
      quantity: data?.quantity || "",
      status: convertEnumValue(data?.status),
      imageUrl: data?.imageUrl || "",
      newImage: null,
    },
    validationSchema: productScheme,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        categoryId: values.categoryId,
        price: removeThousandsSeparator(values.price),
        quantity: values.quantity,
        status: values.status,
        image_url: values.imageUrl,
      };

      let price = removeThousandsSeparatortoString(values.price);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("categoryId", values.categoryId);
      formData.append("price", price);
      formData.append("quantity", values.quantity);
      formData.append(
        "status",
        isEdit && values.status === false ? "inactive" : "active"
      );
      formData.append("imageUrl", values.newImage);

      if (isEdit) {
        productUpdateMutation.mutate({ id: data?.id, data: formData });
      } else {
        productAddMutation.mutate({ data: formData });
      }
    },
    isEnableReinitialize: true,
  });

  const onImageChange = (image: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      formik.setFieldValue("imageUrl", url);
    };
    reader.readAsDataURL(image);
    formik.setFieldValue("newImage", image);
  };

  const onImageClear = () => {
    if (isEdit) {
      formik.setFieldValue("imageUrl", data?.imageUrl);
    } else {
      formik.setFieldValue("imageUrl", null);
    }
    formik.setFieldValue("newImage", null);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSkeletonForm isProductForm />
      ) : (
        <form onSubmit={formik.handleSubmit} className="tw-w-3/4 lg:tw-w-1/2">
          <FormLayout>
            {isEdit && (
              <CustomTextField
                label="ID"
                disabled
                {...formik.getFieldProps("id")}
              />
            )}

            <ImageUpload
              value={formik?.values?.name || ""}
              imageUrl={formik?.values?.imageUrl || ""}
              onImageChange={onImageChange}
              onImageClear={onImageClear}
              newImage={formik?.values?.newImage}
              onEdit={isEdit ? true : false}
              helperText={gethelperText(
                formik.touched.imageUrl as boolean,
                formik.errors.imageUrl as string
              )}
              error={formik.touched.imageUrl && !!formik.errors.imageUrl}
            />

            <CustomTextField
              label={translations?.form?.productForm?.name?.label}
              placeholder={translations?.form?.productForm?.name?.placeHolder}
              helperText={gethelperText(
                formik.touched.name as boolean,
                formik.errors.name as string
              )}
              error={formik.touched.name && !!formik.errors.name}
              {...formik.getFieldProps("name")}
            />

            <NumericFormat
              thousandSeparator=","
              customInput={CustomTextField}
              label={translations?.form?.productForm?.price?.label}
              placeholder={translations?.form?.productForm?.price?.placeHolder}
              type="text"
              startAdornment={<div className="">Rp. </div>}
              helperText={gethelperText(
                formik.touched.price as boolean,
                formik.errors.price as string
              )}
              error={formik.touched.price && !!formik.errors.price}
              {...formik.getFieldProps("price")}
            />

            <CustomTextField
              type="number"
              label={translations?.form?.productForm?.stock?.label}
              placeholder={translations?.form?.productForm?.stock?.placeHolder}
              helperText={gethelperText(
                formik.touched.quantity as boolean,
                formik.errors.quantity as string
              )}
              error={formik.touched.quantity && !!formik.errors.quantity}
              {...formik.getFieldProps("quantity")}
            />

            <CustomDropdown
              fullWidth
              label={translations?.form?.productForm?.category?.label}
              placeholder={
                translations?.form?.productForm?.category?.placeHolder
              }
              name="categoryId"
              options={
                convertDataToDropdownOptions(
                  productCategoryQuery.data,
                  "name",
                  "id"
                ) || ""
              }
              disabled={productCategoryQuery.isLoading}
              value={formik.values.categoryId}
              onChange={(e) => {
                formik.setFieldValue("categoryId", e.value);
              }}
              helperText={gethelperText(
                formik.touched.categoryId as boolean,
                formik.errors.categoryId as string
              )}
              error={formik.touched.categoryId && !!formik.errors.categoryId}
            />

            {isEdit && (
              <CustomSwitch
                label={translations?.form?.productForm?.status?.label}
                name="Status"
                onChange={(value) => {
                  formik.setFieldValue("status", value);
                }}
                value={formik.values.status}
              />
            )}

            <div className="tw-flex tw-gap-4 tw-w-full">
              <CustomButton
                type="submit"
                className="tw-w-1/4"
                disabled={
                  productUpdateMutation.isLoading ||
                  productAddMutation.isLoading
                }
              >
                {isEdit
                  ? translations?.button?.update
                  : translations?.button?.add}
              </CustomButton>
              <CustomButton
                className="tw-w-1/4"
                variant="secondary"
                onClick={() => {
                  router.push("/product");
                }}
                disabled={
                  productUpdateMutation.isLoading ||
                  productAddMutation.isLoading
                }
              >
                {translations?.button?.cancel}
              </CustomButton>
              {isEdit && (
                <CustomButton
                  className="tw-w-1/4"
                  variant="redButton"
                  onClick={onDeleteClick}
                  disabled={productUpdateMutation.isLoading}
                >
                  {translations?.button?.delete}
                </CustomButton>
              )}
            </div>
          </FormLayout>
        </form>
      )}

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
};

export default ProductForm;
