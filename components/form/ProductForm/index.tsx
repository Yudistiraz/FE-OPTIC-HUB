import { useCustomFormik } from "@/hooks/formik";
import { addProductScheme } from "@/utils/yup";

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
      toast.success("Product Successfully Added");
      router.push("/product");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorMessage =
          (error as any)?.response?.data?.message || "Error Adding Product";
        console.log(errorMessage);

        // toast.error(errorMessage);
      } else {
        toast.error("Error Adding Product");
      }
      // console.log(error);

      // // const errorMessage =
      // //   (error as any)?.response?.data?.message || "Error Adding Product";
      // toast.error("Error Adding Product");
    },
  });

  const productUpdateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      toast.success("Product Successfully Updated");
      router.push("/product");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error Updating Product";
      toast.error(errorMessage);
    },
  });

  const productDeleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      toast.success("Product Successfully Deleted");
      setOpenDialog(false);
      resetDialogText();
      router.push("/product");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error Deleting Product";
      toast.error(errorMessage);
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
    setDialogTitle(`Are you sure you want to Delete ${data?.name} Product?`);
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
    validationSchema: addProductScheme,
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
            />

            <CustomTextField
              label="Product Name"
              placeholder="Input Product Name"
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
              label="Product Price"
              type="text"
              placeholder="Input Product Price"
              startAdornment={<div className="">Rp. </div>}
              helperText={gethelperText(
                formik.touched.price as boolean,
                formik.errors.price as string
              )}
              error={formik.touched.price && !!formik.errors.price}
              {...formik.getFieldProps("price")}
            />

            <CustomTextField
              label="Product Stock"
              type="number"
              placeholder="Input Product Stock"
              helperText={gethelperText(
                formik.touched.quantity as boolean,
                formik.errors.quantity as string
              )}
              error={formik.touched.quantity && !!formik.errors.quantity}
              {...formik.getFieldProps("quantity")}
            />
            <CustomDropdown
              fullWidth
              label="PRODUCT CATEGORY"
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
              placeholder="Choose Product Category"
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
                label="PRODUCT STATUS"
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
                {isEdit ? "Update" : "Add"}
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
                Cancel
              </CustomButton>
              {isEdit && (
                <CustomButton
                  className="tw-w-1/4"
                  variant="redButton"
                  onClick={onDeleteClick}
                  disabled={productUpdateMutation.isLoading}
                >
                  Delete
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
          applyText={"YES"}
          cancelText={"NO"}
          type={"confirmation"}
          onCancel={onPopUpCancel}
          onApply={onPopUpApply}
        />
      </CustomDialog>
    </div>
  );
};

export default ProductForm;
