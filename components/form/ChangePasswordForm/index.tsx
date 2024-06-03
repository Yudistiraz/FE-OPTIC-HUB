import { useCustomFormik } from "@/hooks/formik";

import React, { Fragment } from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import { gethelperText } from "@/utils/function";
import { changePasswordScheme } from "@/utils/yup";
import { useMutation } from "react-query";
import { updatePasswordEmployee } from "@/services/admin/v1/employee";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const ChangePasswordForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let id = session?.user.id;

  const employeeUpdatePasswordMutation = useMutation({
    mutationFn: updatePasswordEmployee,
    onSuccess: async () => {
      toast.success("Password Successfully Updated");
      router.push("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {
          message: "Error Updating Password",
        };
        toast.error(errorResponse?.message);
      }
    },
  });

  const formik = useCustomFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordScheme,
    onSubmit: async (values) => {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      employeeUpdatePasswordMutation.mutate({ id: id, data: payload });
    },
    isEnableReinitialize: true,
  });

  return (
    <Fragment>
      {id && (
        <form className="tw-w-3/4 lg:tw-w-1/3" onSubmit={formik.handleSubmit}>
          <FormLayout>
            <CustomTextField
              label="Old Password"
              placeholder="Input Old Password"
              password
              helperText={gethelperText(
                formik.touched.oldPassword as boolean,
                formik.errors.oldPassword as string
              )}
              error={formik.touched.oldPassword && !!formik.errors.oldPassword}
              {...formik.getFieldProps("oldPassword")}
            />
            <CustomTextField
              label="New Password"
              placeholder="Input New Password"
              password
              helperText={gethelperText(
                formik.touched.newPassword as boolean,
                formik.errors.newPassword as string
              )}
              error={formik.touched.newPassword && !!formik.errors.newPassword}
              {...formik.getFieldProps("newPassword")}
            />
            <CustomTextField
              label="Confirm New Password"
              placeholder="Input Confirm New Password"
              password
              helperText={gethelperText(
                formik.touched.confirmPassword as boolean,
                formik.errors.confirmPassword as string
              )}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              {...formik.getFieldProps("confirmPassword")}
            />

            <div className="tw-flex tw-gap-4 tw-w-full tw-mt-2">
              <CustomButton type="submit" className="tw-w-fit">
                Update Password
              </CustomButton>
              <CustomButton
                className="tw-w-1/4"
                variant="secondary"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancel
              </CustomButton>
            </div>
          </FormLayout>
        </form>
      )}
    </Fragment>
  );
};

export default ChangePasswordForm;
