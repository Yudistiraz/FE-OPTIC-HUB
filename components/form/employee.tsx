import { useCustomFormik } from "@/hooks/formik";
import { addEmployeeSchema } from "@/utils/yup";

import React, { Fragment } from "react";
import CustomTextField from "../ui/TextField";
import CustomButton from "../ui/Button";
import FormLayout from "../ui/FormLayout";
import { gethelperText } from "@/utils/function";
import PhoneCodeMenu from "../ui/PhoneCode";
import CustomDatePicker from "../ui/DatePicker";
import CustomDropdown from "../ui/Select";
import { EMPLOYEE_OPTIONS } from "@/utils/constants";
import CustomSwitch from "../ui/Switch";

interface EmployeeFormProps {
  isEdit?: boolean;
}

const EmployeeForm = ({ isEdit = false }: EmployeeFormProps) => {
  const formik = useCustomFormik({
    initialValues: {
      name: "",
      dob: "",
      phone_number: "",
      email: "",
      password: "",
      role: "staff",
      status: true,
      countryCode: "+62",
    },
    validationSchema: addEmployeeSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="!tw-w-1/2">
        <FormLayout>
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
            onDateChange={(name, value) => formik.setFieldValue(name, value)}
            positionTop
            helperText={gethelperText(
              formik.touched.dob as boolean,
              formik.errors.dob as string
            )}
            error={formik.touched.dob && !!formik.errors.dob}
          />

          <CustomTextField
            label="Phone Number"
            placeholder="Input Phone Number"
            startAdornment={
              <PhoneCodeMenu
                item={formik.values.countryCode}
                onChange={(e) => formik.setFieldValue("countryCode", e)}
              />
            }
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
            label="Password"
            placeholder="Input Password"
            password
            helperText={gethelperText(
              formik.touched.password as boolean,
              formik.errors.password as string
            )}
            error={formik.touched.password && !!formik.errors.password}
            {...formik.getFieldProps("password")}
          />

          {isEdit && (
            <Fragment>
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

              <CustomSwitch
                label="EMPLOYEE STATUS"
                name="Status"
                onChange={(value) => {
                  formik.setFieldValue("status", value);
                }}
              />
            </Fragment>
          )}

          <div className="tw-flex tw-gap-4 tw-w-full">
            <CustomButton type="submit" className="tw-w-1/4">
              Add
            </CustomButton>
            <CustomButton className="tw-w-1/4" variant="secondary">
              Cancel
            </CustomButton>
          </div>
        </FormLayout>
      </form>
    </div>
  );
};

export default EmployeeForm;
