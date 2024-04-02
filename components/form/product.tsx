import { useCustomFormik } from "@/hooks/formik";
import { addProductScheme } from "@/utils/yup";

import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import { gethelperText } from "@/utils/function";
import CustomDropdown from "@/components/ui/Select";
import { EMPLOYEE_OPTIONS } from "@/utils/constants";
import CustomSwitch from "@/components/ui/Switch";
import { TProduct } from "@/utils/models";
import { useUserState } from "@/context/User";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { NumericFormat } from "react-number-format";
import ImageUpload from "@/components/ui/ImageUpload";

interface ProductFormProps {
  isEdit?: boolean;
  data?: TProduct | null;
}

const ProductForm = ({ isEdit = false, data = null }: ProductFormProps) => {
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
  } = useUserState();

  const onPopUpCancel = () => {
    setOpenDialog(false);
  };

  const onPopUpApply = () => {
    console.log(data?.id);
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
      categoryID: data?.categoryID || "",
      price: data?.price || "",
      quantity: data?.quantity || "",
      status: data?.status || true,
      imageUrl: data?.imageUrl || "",
      newImage: null,
    },
    validationSchema: addProductScheme,
    onSubmit: async (values) => {
      console.log(values);
    },
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
      <form onSubmit={formik.handleSubmit} className="!tw-w-1/2">
        <FormLayout>
          {isEdit && (
            <CustomTextField
              label="ID"
              disabled
              {...formik.getFieldProps("id")}
            />
          )}

          <ImageUpload
            value={formik?.values?.name}
            imageUrl={formik?.values?.imageUrl}
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
            name="categoryID"
            options={EMPLOYEE_OPTIONS}
            value={formik.values.categoryID}
            placeholder="Choose Product Category"
            onChange={(e) => {
              formik.setFieldValue("categoryID", e.value);
            }}
            helperText={gethelperText(
              formik.touched.categoryID as boolean,
              formik.errors.categoryID as string
            )}
            error={formik.touched.categoryID && !!formik.errors.categoryID}
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
            <CustomButton type="submit" className="tw-w-1/4">
              {isEdit ? "Update" : "Add"}
            </CustomButton>
            <CustomButton className="tw-w-1/4" variant="secondary">
              Cancel
            </CustomButton>
            {isEdit && (
              <CustomButton
                className="tw-w-1/4"
                variant="redButton"
                onClick={onDeleteClick}
              >
                Delete
              </CustomButton>
            )}
          </div>
        </FormLayout>
      </form>

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
