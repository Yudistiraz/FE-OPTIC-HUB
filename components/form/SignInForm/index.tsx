import { useCustomFormik } from "@/hooks/formik";
import { Typography } from "@mui/material";
import React from "react";
import CustomTextField from "@/components/ui/TextField";
import CustomButton from "@/components/ui/Button";
import FormLayout from "@/components/ui/FormLayout";
import { gethelperText } from "@/utils/function";
import { signIn } from "next-auth/react";
import { adminSignIn } from "@/services/admin/v1/auth";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/Language";
import { yupLoginSchema } from "@/utils/yup";

const Signinform = () => {
  const { translations } = useLanguage();
  const loginSchema = yupLoginSchema(translations);
  const signInMutation = useMutation({
    mutationFn: adminSignIn,
    onSuccess: async (data) => {
      const admin = data?.data?.data || {};

      await signIn("credentials", {
        id: admin?.id || "",
        name: admin?.name || "",
        role: admin?.role || "",
        token: data?.data?.access_token || "",
        redirect: true,
        callbackUrl: "/",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponse = error?.response?.data || {};
        toast.error(errorResponse?.message);
      }
    },
  });

  const formik = useCustomFormik({
    initialValues: {
      email: "admin@mail.com",
      password: "admin",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      signInMutation.mutate({ ...values });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="!tw-w-full">
        <Typography variant="display2" className="tw-uppercase">
          {translations?.signInPage?.header}
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

          <CustomButton
            type="submit"
            className="!tw-mt-4"
            disabled={signInMutation.isLoading}
          >
            {translations?.button?.signIn}
          </CustomButton>
        </FormLayout>
      </form>
    </div>
  );
};

export default Signinform;
