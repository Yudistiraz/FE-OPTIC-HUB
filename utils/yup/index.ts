// import dayjs from 'dayjs'
import * as Yup from "yup";

// Yup.addMethod(Yup.object, 'dayjs', function method(message) {
//   return this.test('dayjs', message, function validate(value) {
//     if (!value) {
//       return true
//     }
//     return dayjs.isDayjs(value)
//   })
// })

const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const numericOnlyWithPrefix = /^(\d+|\+\d+)$/ // only number or starts with +
const numericOnly = /^\d+$/; // only numbers

const passwordRules =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const passwordMsg =
  "Password format: At least 1 Uppercase, 1 LowerCase, 1 Numeric, 1 Symbol, 8 Characters";

// used as shared schema
const basicSchema = {
  email: Yup.string()
    .email("Invalid email address")
    .matches(emailRules, "Invalid email address")
    .required("Required"),
};

export const loginSchema = Yup.object({
  ...basicSchema,
  password: Yup.string().required("Required"),
  // .matches(passwordRules, passwordMsg),
});

export const addEmployeeSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  dob: Yup.mixed().required("Date of Birth Required"),
  phoneNumber: Yup.string().required("Phone Number Required"),
  email: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
  role: Yup.string().required("Role Required"),
});

export const addProductScheme = Yup.object({
  name: Yup.string().required("Proudct Name Required"),
  categoryID: Yup.string().required("Product Category Required"),
  // image_url: Yup.string().required("Product Image Required"),
  price: Yup.string().required("Proudct Price Required"),
  quantity: Yup.number().required("Proudct Stock Required"),
});
