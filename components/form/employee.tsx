import { useCustomFormik } from "@/hooks/formik";
import { addEmployeeSchema, updateEmployeeSchema } from "@/utils/yup";

import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import { gethelperText } from "@/utils/function";
import CustomDatePicker from "@/components/ui/DatePicker";
import CustomDropdown from "@/components/ui/Select";
import { EMPLOYEE_OPTIONS } from "@/utils/constants";
import CustomSwitch from "@/components/ui/Switch";
import { TEmployee } from "@/utils/models";
import { useUserState } from "@/context/User";
import CustomDialog from "@/components/ui/Dialog";
import ConfirmationDialog from "@/components/features/ConfirmationDialog";
import { formateDate1 } from "@/utils/dateFormatter";
import { useMutation } from "react-query";
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "@/services/admin/v1/employee";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface EmployeeFormProps {
  isEdit?: boolean;
  data?: TEmployee | null;
}

const EmployeeForm = ({ isEdit = false, data = null }: EmployeeFormProps) => {
  const {
    openDialog,
    setOpenDialog,
    dialogMessage,
    dialogTitle,
    resetDialogText,
    setDialogTitle,
  } = useUserState();

  const session = useSession();

  const router = useRouter();

  const employeeAddMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: async () => {
      // toast.success("Success Added Admin");
      router.push("/employee");
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Error";
      // toast.error(errorMessage);
    },
  });

  const employeeUpdateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      // toast.success("Success Added Admin");
      router.push("/employee");
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Error";
      // toast.error(errorMessage);
    },
  });

  const employeeDeleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      // toast.success("Success Added Admin");
      setOpenDialog(false);
      resetDialogText();
      if (data) {
        if (data.id === session?.data?.user?.id) {
          signOut();
        } else {
          router.push("/employee");
        }
      }
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Error";
      // toast.error(errorMessage);
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
      status: data?.status || true,
    },
    validationSchema: isEdit ? updateEmployeeSchema : addEmployeeSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        dob: formateDate1(values.dob),
        phone_number: values.phoneNumber,
        password: values.password,
        status: values.status,
        role: values.role,
      };

      if (isEdit) {
        employeeUpdateMutation.mutate({ id: data?.id, data: payload });
      } else {
        employeeAddMutation.mutate({ data: payload });
      }
    },
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
    setDialogTitle(`Are you sure you want to Delete ${data?.name} Employee?`);
    setOpenDialog(true);
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
          <CustomTextField
            label="Name"
            placeholder="Input Name"
            helperText={gethelperText(
              formik.touched.name as boolean,
              formik.errors.name as string
            )}
            error={formik.touched.name && !!formik.errors.name}
            {...formik.getFieldProps("name")}
          />

          <CustomDatePicker
            label="DATE OF BIRTH"
            placeholder="Choose Date of Birth"
            name="dob"
            format="DD MMMM YYYY"
            value={formik.values.dob}
            onDateChange={(value, name) => formik.setFieldValue(name, value)}
            helperText={gethelperText(
              formik.touched.dob as boolean,
              formik.errors.dob as string
            )}
            error={formik.touched.dob && !!formik.errors.dob}
          />

          <CustomTextField
            label="Phone Number"
            placeholder="Input Phone Number"
            startAdornment={<div className="">+62</div>}
            helperText={gethelperText(
              formik.touched.phone_number as boolean,
              formik.errors.phone_number as string
            )}
            error={formik.touched.phone_number && !!formik.errors.phone_number}
            {...formik.getFieldProps("phone_number")}
          />

          <CustomTextField
            label="Email"
            placeholder="Input Email"
            helperText={gethelperText(
              formik.touched.email as boolean,
              formik.errors.email as string
            )}
            error={formik.touched.email && !!formik.errors.email}
            {...formik.getFieldProps("email")}
          />

          <CustomTextField
            label={isEdit ? "New Password" : "Password"}
            placeholder={isEdit ? "Input New Password" : "Input Password"}
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
            label="ROLE"
            name="role"
            options={EMPLOYEE_OPTIONS}
            value={formik.values.role}
            placeholder="Choose Role"
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
              label="EMPLOYEE STATUS"
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
              {isEdit ? "Update" : "Add"}
            </CustomButton>
            <CustomButton
              className="tw-w-1/4"
              variant="secondary"
              disabled={
                employeeAddMutation.isLoading ||
                employeeUpdateMutation.isLoading
              }
            >
              Cancel
            </CustomButton>
            {isEdit && (
              <CustomButton
                className="tw-w-1/4"
                variant="redButton"
                onClick={onDeleteClick}
                disabled={
                  employeeAddMutation.isLoading ||
                  employeeUpdateMutation.isLoading
                }
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

export default EmployeeForm;
