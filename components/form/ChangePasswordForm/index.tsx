import { useCustomFormik } from "@/hooks/formik";

import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import { gethelperText } from "@/utils/function";
import { changePasswordScheme } from "@/utils/yup";

const ChangePasswordForm = () => {
  const formik = useCustomFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordScheme,
    onSubmit: async (values) => {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      console.log(payload);
    },
    isEnableReinitialize: true,
  });

  return (
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

        <div className="tw-flex tw-gap-4 tw-w-full tw-mt-2">
          <CustomButton type="submit" className="tw-w-fit">
            Update Password
          </CustomButton>
          <CustomButton className="tw-w-1/4" variant="secondary">
            Cancel
          </CustomButton>
        </div>
      </FormLayout>
    </form>
  );
};

export default ChangePasswordForm;
