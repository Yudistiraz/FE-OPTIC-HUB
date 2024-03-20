import { useCustomFormik } from "@/hooks/formik";
import { loginSchema } from "@/utils/yup";
import { Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../ui/TextField";
import CustomButton from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import { gethelperText } from "@/utils/function";

const Signinform = () => {
  const formik = useCustomFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="!tw-w-full">
        <Typography variant="display2" className="tw-uppercase">
          SIGN IN TO YOUR ACCOUNT
        </Typography>
        <FormLayout>
          <CustomTextField
            label="Email"
            placeholder="Email"
            helperText={gethelperText(
              formik.touched.email as boolean,
              formik.errors.email as string
            )}
            error={formik.touched.email && !!formik.errors.email}
            {...formik.getFieldProps("email")}
          />

          <CustomTextField
            label="Password"
            placeholder="Password"
            password
            helperText={gethelperText(
              formik.touched.password as boolean,
              formik.errors.password as string
            )}
            error={formik.touched.password && !!formik.errors.password}
            {...formik.getFieldProps("password")}
          />

          <CustomButton type="submit" className="!tw-mt-4">
            Sign In
          </CustomButton>
        </FormLayout>
      </form>
    </div>
  );
};

export default Signinform;