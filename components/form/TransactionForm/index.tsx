import { useCustomFormik } from "@/hooks/formik";
import { addTransactionScheme } from "@/utils/yup";

import React, { Fragment, useEffect } from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import {
  addProductToArray,
  calculateTotalPrice,
  getThousandSeparator,
  gethelperText,
  updateOrderItems,
} from "@/utils/function";
import CustomDropdown from "@/components/ui/Select";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Divider, Typography } from "@mui/material";
import {
  PAYMENT_METHOD_OPTIONS,
  TRANSACTION_STATUS_OPTIONS,
} from "@/utils/constants";
import CustomCheckbox from "../../ui/Checkbox";
import ProductSearchBar from "../../features/ProductSearchBar";
import ProductOverview from "../../features/ProductOverview";
import { OrderItem, TProduct, TTransaction } from "@/utils/models";
import {
  addTransaction,
  updateTransaction,
} from "@/services/admin/v1/transaction";
import toast from "react-hot-toast";
import LoadingSkeletonForm from "../LoadingSkeletonForm";

interface TransactionFormProps {
  isLoading?: boolean;
  isEdit?: boolean;
  productSearch?: string;
  setProductSearch?: (productSearch: string) => void;
  transactionData?: TTransaction;
  isProductLoading?: boolean;
  productData?: TProduct[];
}

const TransactionForm = ({
  isEdit = false,
  productSearch = "",
  setProductSearch = () => {},
  transactionData,
  productData = [],
  isProductLoading = false,
  isLoading = false,
}: TransactionFormProps) => {
  const router = useRouter();
  const session = useSession();

  const transactionAddMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: async () => {
      toast.success("Transaction Successfully Added");
      router.push("/transaction");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error Adding Transaction";
      toast.error(errorMessage);
    },
  });

  const transactionUpdateMutation = useMutation({
    mutationFn: updateTransaction,
    onSuccess: async () => {
      toast.success("Transaction Successfully Updated");
      router.push("/transaction");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error Updating Transaction";
      toast.error(errorMessage);
    },
  });

  const formik = useCustomFormik({
    initialValues: {
      id: transactionData?.id || "",
      status: transactionData?.status || "onGoing",
      userId: session.data?.user.id || "",
      userName: session.data?.user.name || "",
      customerName: transactionData?.prescription?.customerName || "",
      customerPhone: transactionData?.prescription?.customerPhone || "",
      customerEmail: transactionData?.prescription?.customerEmail || "",
      paymentMethod: transactionData?.paymentMethod || "cash",
      right_sph: transactionData?.prescription?.right_sph || "",
      right_cylinder: transactionData?.prescription?.right_cylinder || "",
      right_axis: transactionData?.prescription?.right_axis || "",
      right_add: transactionData?.prescription?.right_add || "",
      right_pd: transactionData?.prescription?.right_pd || "",
      left_sph: transactionData?.prescription?.left_sph || "",
      left_cylinder: transactionData?.prescription?.left_cylinder || "",
      left_axis: transactionData?.prescription?.left_axis || "",
      left_add: transactionData?.prescription?.left_add || "",
      left_pd: transactionData?.prescription?.left_pd || "",
      orderItem: transactionData?.orderItem || [],
      withPrescription: transactionData?.withPrescription || false,
    },
    validationSchema: addTransactionScheme,
    onSubmit: async (values) => {
      const payload = {
        userId: values.userId,
        userName: values.userName,
        paymentMethod: values.paymentMethod,
        status: values.status,
        prescription: {
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          customerEmail: values.customerEmail,
          right_sph: values.right_sph,
          right_cylinder: values.right_cylinder,
          right_axis: values.right_axis,
          right_add: values.right_add,
          right_pd: values.right_pd,
          left_sph: values.left_sph,
          left_cylinder: values.left_cylinder,
          left_axis: values.left_axis,
          left_add: values.left_add,
          left_pd: values.left_pd,
        },
        orderItem: values.orderItem,
        withPrescription: values.withPrescription,
      };
      if (isEdit) {
        transactionUpdateMutation.mutate({
          id: transactionData?.id,
          data: payload,
        });
      } else {
        transactionAddMutation.mutate({ data: payload });
      }
    },
    isEnableReinitialize: true,
  });

  const onProductDropdownClick = (product: TProduct) => {
    const formikArray = [...formik.values.orderItem];
    addProductToArray(product, formikArray);
    formik.setFieldValue("orderItem", formikArray);
  };

  const onDeleteProduct = (productData: any) => {
    formik.setFieldValue("orderItem", productData);
  };

  const onOrderItemChange = (editedItem: OrderItem) => {
    const formikArray = [...formik.values.orderItem];
    formik.setFieldValue(
      "orderItem",
      updateOrderItems(editedItem, formikArray)
    );
  };

  // useEffect(() => {
  //   console.log(formik.values);
  // }, [formik.values]);

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSkeletonForm isTransactionForm />
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="tw-w-3/4 lg:tw-w-1/2 tw-flex tw-flex-col tw-gap-4"
        >
          <div className="tw-flex tw-flex-col tw-gap-6">
            {isEdit && (
              <CustomTextField
                label="ID"
                disabled
                {...formik.getFieldProps("id")}
              />
            )}

            <div className="tw-flex tw-gap-6 ">
              <CustomTextField
                label="Admin ID"
                placeholder="Input Admin ID"
                disabled
                helperText={gethelperText(
                  formik.touched.userId as boolean,
                  formik.errors.userId as string
                )}
                error={formik.touched.userId && !!formik.errors.userId}
                {...formik.getFieldProps("userId")}
              />

              <CustomTextField
                label="Admin Name"
                placeholder="Input Admin Name"
                disabled
                helperText={gethelperText(
                  formik.touched.userName as boolean,
                  formik.errors.userName as string
                )}
                error={formik.touched.userName && !!formik.errors.userName}
                {...formik.getFieldProps("userName")}
              />
            </div>

            <div className="tw-w-full tw-flex tw-items-center tw-gap-4">
              <Typography variant="subtitle1">Customer's Detail</Typography>
              <Divider
                flexItem
                className="tw-my-4 tw-flex-grow"
                sx={{
                  borderBottomWidth: 3,
                  bgcolor: "black",
                  borderColor: "black",
                }}
              />
            </div>

            <CustomTextField
              label="Customer's Name"
              placeholder="Input Customer's Name Name"
              helperText={gethelperText(
                formik.touched.customerName as boolean,
                formik.errors.customerName as string
              )}
              error={
                formik.touched.customerName && !!formik.errors.customerName
              }
              {...formik.getFieldProps("customerName")}
              disabled={isEdit}
            />

            <div className="tw-flex tw-gap-6 tw-items-start">
              <CustomTextField
                label="Customer's Phone Number"
                placeholder="Input Customer's Phone Number"
                startAdornment={<div className="">+62</div>}
                helperText={gethelperText(
                  formik.touched.customerPhone as boolean,
                  formik.errors.customerPhone as string
                )}
                error={
                  formik.touched.customerPhone && !!formik.errors.customerPhone
                }
                {...formik.getFieldProps("customerPhone")}
                disabled={isEdit}
              />

              <CustomTextField
                label="Customer's Email"
                placeholder="Input Customer's Email"
                helperText={gethelperText(
                  formik.touched.customerEmail as boolean,
                  formik.errors.customerEmail as string
                )}
                type="email"
                error={
                  formik.touched.customerEmail && !!formik.errors.customerEmail
                }
                {...formik.getFieldProps("customerEmail")}
                disabled={isEdit}
              />
            </div>

            <div className="tw-w-full tw-flex tw-items-center tw-gap-4">
              <Typography variant="subtitle1">Transaction's Detail</Typography>
              <Divider
                flexItem
                className="tw-my-4 tw-flex-grow"
                sx={{
                  borderBottomWidth: 3,
                  bgcolor: "black",
                  borderColor: "black",
                }}
              />
            </div>

            <CustomDropdown
              fullWidth
              label="PAYMENT METHOD"
              name="paymentMethod"
              options={PAYMENT_METHOD_OPTIONS}
              value={formik.values.paymentMethod}
              placeholder="Choose Product Category"
              onChange={(e) => {
                formik.setFieldValue("paymentMethod", e.value);
              }}
              helperText={gethelperText(
                formik.touched.paymentMethod as boolean,
                formik.errors.paymentMethod as string
              )}
              error={
                formik.touched.paymentMethod && !!formik.errors.paymentMethod
              }
              disabled={isEdit}
            />

            {!isEdit && (
              <ProductSearchBar
                search={productSearch}
                setSearch={(value) => {
                  setProductSearch(value);
                }}
                fullWidth
                hideDropdown={productSearch.length === 0}
                productData={productData}
                onProductDropdownClick={onProductDropdownClick}
                selectedArray={formik.values.orderItem}
                isLoading={isProductLoading}
              />
            )}

            <ProductOverview
              productData={formik.values.orderItem}
              onDeleteProduct={onDeleteProduct}
              onOrderItemChange={onOrderItemChange}
              helperText={gethelperText(
                formik.touched.orderItem as boolean,
                formik.errors.orderItem as string
              )}
              error={formik.touched.orderItem && !!formik.errors.orderItem}
              disabled={isEdit}
            />

            <CustomCheckbox
              label="With Prescriptions?"
              name="withPrescription"
              onChange={(value) => {
                formik.setFieldValue("withPrescription", value);
              }}
              value={formik.values.withPrescription}
              disabled={isEdit}
            />
          </div>

          {formik.values.withPrescription && (
            <div>
              <div className="tw-flex tw-gap-6">
                <CustomTextField
                  label="Right Sphere"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.right_sph as boolean,
                    formik.errors.right_sph as string
                  )}
                  error={formik.touched.right_sph && !!formik.errors.right_sph}
                  {...formik.getFieldProps("right_sph")}
                  disabled={isEdit}
                />
                <CustomTextField
                  label="Left Sphere"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.left_sph as boolean,
                    formik.errors.left_sph as string
                  )}
                  error={formik.touched.left_sph && !!formik.errors.left_sph}
                  {...formik.getFieldProps("left_sph")}
                  disabled={isEdit}
                />
              </div>

              <div className="tw-flex tw-gap-6">
                <CustomTextField
                  label="Right Cylinder"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.right_cylinder as boolean,
                    formik.errors.right_cylinder as string
                  )}
                  error={
                    formik.touched.right_cylinder &&
                    !!formik.errors.right_cylinder
                  }
                  {...formik.getFieldProps("right_cylinder")}
                  disabled={isEdit}
                />
                <CustomTextField
                  label="Left Cylinder"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.left_cylinder as boolean,
                    formik.errors.left_cylinder as string
                  )}
                  error={
                    formik.touched.left_cylinder &&
                    !!formik.errors.left_cylinder
                  }
                  {...formik.getFieldProps("left_cylinder")}
                  disabled={isEdit}
                />
              </div>

              <div className="tw-flex tw-gap-6">
                <CustomTextField
                  label="Right Axis"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.right_axis as boolean,
                    formik.errors.right_axis as string
                  )}
                  error={
                    formik.touched.right_axis && !!formik.errors.right_axis
                  }
                  {...formik.getFieldProps("right_axis")}
                  disabled={isEdit}
                />
                <CustomTextField
                  label="Left Axis"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.left_axis as boolean,
                    formik.errors.left_axis as string
                  )}
                  error={formik.touched.left_axis && !!formik.errors.left_axis}
                  {...formik.getFieldProps("left_axis")}
                  disabled={isEdit}
                />
              </div>

              <div className="tw-flex tw-gap-6">
                <CustomTextField
                  label="Right Add"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.right_add as boolean,
                    formik.errors.right_add as string
                  )}
                  error={formik.touched.right_add && !!formik.errors.right_add}
                  {...formik.getFieldProps("right_add")}
                  disabled={isEdit}
                />
                <CustomTextField
                  label="Left Add"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.left_add as boolean,
                    formik.errors.left_add as string
                  )}
                  error={formik.touched.left_add && !!formik.errors.left_add}
                  {...formik.getFieldProps("left_add")}
                  disabled={isEdit}
                />
              </div>

              <div className="tw-flex tw-gap-6">
                <CustomTextField
                  label="Right PD"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.right_pd as boolean,
                    formik.errors.right_pd as string
                  )}
                  error={formik.touched.right_pd && !!formik.errors.right_pd}
                  {...formik.getFieldProps("right_pd")}
                  disabled={isEdit}
                />
                <CustomTextField
                  label="Left PD"
                  placeholder=""
                  helperText={gethelperText(
                    formik.touched.left_pd as boolean,
                    formik.errors.left_pd as string
                  )}
                  error={formik.touched.left_pd && !!formik.errors.left_pd}
                  {...formik.getFieldProps("left_pd")}
                  disabled={isEdit}
                />
              </div>
            </div>
          )}

          <div className="tw-flex tw-gap-2">
            <Typography variant="h1">Total Cost : </Typography>
            <Typography variant="h1" className="tw-text-red-500">
              Rp.{" "}
              {getThousandSeparator(
                calculateTotalPrice(formik.values.orderItem)
              )}
            </Typography>
          </div>

          <CustomDropdown
            classNamees="tw-mb-4"
            fullWidth
            label="TRANSACTION STATUS"
            name="transactionStatus"
            options={TRANSACTION_STATUS_OPTIONS}
            value={formik.values.status}
            placeholder="Choose Transaction Status"
            onChange={(e) => {
              formik.setFieldValue("status", e.value);
            }}
            disabled={
              (isEdit && transactionData?.status === "complete") ||
              (isEdit && transactionData?.status === "cancel")
            }
          />

          <div className="tw-w-full tw-flex tw-gap-4 ">
            {isEdit ? (
              <Fragment>
                <CustomButton
                  type="button"
                  className="tw-w-1/4"
                  onClick={() => {
                    console.log("print gan");
                  }}
                >
                  Print Invoice
                </CustomButton>
                {transactionData?.status === "onGoing" && (
                  <CustomButton type="submit" className="tw-w-1/4">
                    Save
                  </CustomButton>
                )}
              </Fragment>
            ) : (
              <CustomButton
                type="submit"
                className="tw-w-1/4"
                disabled={transactionAddMutation.isLoading}
              >
                Add
              </CustomButton>
            )}
            <CustomButton
              className="tw-w-1/4"
              variant="secondary"
              onClick={() => {
                router.push("/product");
              }}
              disabled={transactionAddMutation.isLoading}
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default TransactionForm;
