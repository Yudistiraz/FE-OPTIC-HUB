import { useCustomFormik } from "@/hooks/formik";
import { yupAddEmployeeScheme, yupUpdateEmployeeScheme } from "@/utils/yup";

import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import {
  convertEnumValue,
  gethelperText,
  verifyNumber,
} from "@/utils/function";
import CustomDatePicker from "@/components/ui/DatePicker";
import CustomDropdown from "@/components/ui/Select";
import CustomSwitch from "@/components/ui/Switch";
import { TEmployee } from "@/utils/models";
import { useUserState } from "@/context/User";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { formateDate2 } from "@/utils/dateFormatter";
import { useMutation } from "react-query";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/services/admin/v1/employee";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSkeletonForm from "../LoadingSkeletonForm";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/Language";

interface EmployeeFormProps {
  isLoading?: boolean;
  isEdit?: boolean;
  data?: TEmployee | null;
}

const EmployeeForm = ({
  isEdit = false,
  data = null,
  isLoading = false,
}: EmployeeFormProps) => {
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
  } = useUserState();
  const { translations } = useLanguage();
  const employeeSchema = isEdit
    ? yupUpdateEmployeeScheme(translations)
    : yupAddEmployeeScheme(translations);
  const session = useSession();

  const router = useRouter();

  const employeeAddMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.create} ${translations?.EmployeePage?.item}`
      );
      router.push("/employee");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.create} ${translations?.EmployeePage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const employeeUpdateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.update} ${translations?.EmployeePage?.item}`
      );
      router.push("/employee");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.update} ${translations?.EmployeePage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const employeeDeleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      toast.success(
        `${translations?.toast?.success?.delete} ${translations?.EmployeePage?.item}`
      );
      setOpenDialog(false);
      resetDialogText();
      router.push("/employee");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: `${translations?.toast?.error?.delete} ${translations?.EmployeePage?.item}`,
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const formik = useCustomFormik({
    initialValues: {
      id: data?.id || "",
      name: data?.name || "",
      dob: data?.dob || "",
      phone_number: data?.phone_number || "",
      email: data?.email || "",
      password: "",
      role: data?.role || "staff",
      status: convertEnumValue(data?.status),
      nik: data?.nik || "",
    },
    validationSchema: employeeSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        dob: formateDate2(values.dob),
        phone_number: values.phone_number,
        password: values.password,
        status: isEdit && values.status === false ? "inactive" : "active",
        role: values.role,
        nik: values.nik,
      };

      if (isEdit) {
        employeeUpdateMutation.mutate({ id: data?.id, data: payload });
      } else {
        employeeAddMutation.mutate({ data: payload });
      }
    },
    isEnableReinitialize: true,
  });

  const onPopUpCancel = () => {
    setOpenDialog(false);
  };

  const onPopUpApply = () => {
    if (data?.id) {
      employeeDeleteMutation.mutate(data.id);
    }
  };

  const onDeleteClick = () => {
    resetDialogText();
    setDialogTitle(
      `${translations?.dialogBox?.deleteConfirmation} ${data?.name}?`
    );
    setOpenDialog(true);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSkeletonForm isEmployeeForm />
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
            <CustomTextField
              label={translations?.form?.employeeForm?.name?.label}
              placeholder={translations?.form?.employeeForm?.name?.placeHolder}
              helperText={gethelperText(
                formik.touched.name as boolean,
                formik.errors.name as string
              )}
              error={formik.touched.name && !!formik.errors.name}
              {...formik.getFieldProps("name")}
            />

            <CustomDatePicker
              label={translations?.form?.employeeForm?.dob?.label}
              placeholder={translations?.form?.employeeForm?.dob?.placeHolder}
              name="dob"
              format="DD MMMM YYYY"
              value={formik.values.dob}
              onDateChange={(value, name) => formik.setFieldValue(name, value)}
              helperText={gethelperText(
                formik.touched.dob as boolean,
                formik.errors.dob as string
              )}
              error={formik.touched.dob && !!formik.errors.dob}
              disableFuture
            />

            <CustomTextField
              label={translations?.form?.employeeForm?.phoneNumber?.label}
              placeholder={
                translations?.form?.employeeForm?.phoneNumber?.placeHolder
              }
              startAdornment={<div className="tw-text-black-500">+62</div>}
              helperText={gethelperText(
                formik.touched.phone_number as boolean,
                formik.errors.phone_number as string
              )}
              error={
                formik.touched.phone_number && !!formik.errors.phone_number
              }
              name="phone_number"
              value={formik.values.phone_number}
              onChange={(event) => {
                if (verifyNumber(event)) {
                  formik.setFieldValue("phone_number", event.target.value);
                }
              }}
            />

            <CustomTextField
              label={translations?.form?.employeeForm?.nik?.label}
              placeholder={translations?.form?.employeeForm?.nik?.placeHolder}
              helperText={gethelperText(
                formik.touched.nik as boolean,
                formik.errors.nik as string
              )}
              error={formik.touched.nik && !!formik.errors.nik}
              name="nik"
              value={formik.values.nik}
              onChange={(event) => {
                if (verifyNumber(event)) {
                  formik.setFieldValue("nik", event.target.value);
                }
              }}
            />

            <CustomTextField
              label={translations?.form?.employeeForm?.email?.label}
              placeholder={translations?.form?.employeeForm?.email?.placeHolder}
              helperText={gethelperText(
                formik.touched.email as boolean,
                formik.errors.email as string
              )}
              error={formik.touched.email && !!formik.errors.email}
              {...formik.getFieldProps("email")}
            />

            <CustomTextField
              label={
                isEdit
                  ? translations?.form?.employeeForm?.newPassword?.label
                  : translations?.form?.employeeForm?.password?.label
              }
              placeholder={
                isEdit
                  ? translations?.form?.employeeForm?.newPassword?.placeHolder
                  : translations?.form?.employeeForm?.password?.placeHolder
              }
              password
              helperText={gethelperText(
                formik.touched.password as boolean,
                formik.errors.password as string
              )}
              error={formik.touched.password && !!formik.errors.password}
              {...formik.getFieldProps("password")}
            />

            <CustomDropdown
              fullWidth
              label={translations?.form?.employeeForm?.role?.label}
              placeholder={translations?.form?.employeeForm?.role?.placeHolder}
              name="role"
              options={translations?.dropdownOptions?.roleOptions}
              value={formik.values.role}
              onChange={(e) => {
                formik.setFieldValue("role", e.value);
              }}
              helperText={gethelperText(
                formik.touched.role as boolean,
                formik.errors.role as string
              )}
              error={formik.touched.role && !!formik.errors.role}
            />

            {isEdit && (
              <CustomSwitch
                label={translations?.form?.employeeForm?.status?.label}
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
                  employeeAddMutation.isLoading ||
                  employeeUpdateMutation.isLoading
                }
              >
                {isEdit
                  ? translations?.button?.update
                  : translations?.button?.add}
              </CustomButton>
              <CustomButton
                className="tw-w-1/4"
                variant="secondary"
                disabled={
                  employeeAddMutation.isLoading ||
                  employeeUpdateMutation.isLoading
                }
                onClick={() => {
                  router.push("/employee");
                }}
              >
                {translations?.button?.cancel}
              </CustomButton>
              {isEdit && data?.id !== session?.data?.user?.id && (
                <CustomButton
                  className="tw-w-1/4"
                  variant="redButton"
                  onClick={onDeleteClick}
                  disabled={
                    employeeAddMutation.isLoading ||
                    employeeUpdateMutation.isLoading
                  }
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

export default EmployeeForm;
