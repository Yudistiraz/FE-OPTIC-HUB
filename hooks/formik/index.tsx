import { FormikValues, useFormik } from "formik";

interface formikHooksProps {
  initialValues: FormikValues;
  validationSchema?: object;
  onSubmit: (values: FormikValues) => void;
  isEnableReinitialize?: boolean;
  isValidateOnBlur?: boolean;
  isValidateOnChange?: boolean;
}

export const useCustomFormik = ({
  initialValues,
  validationSchema,
  onSubmit,
  isEnableReinitialize = false,
  isValidateOnBlur = true,
  isValidateOnChange = true,
}: formikHooksProps) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: isEnableReinitialize,
    validateOnBlur: isValidateOnBlur,
    validateOnChange: isValidateOnChange,
  });
};
