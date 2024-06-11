import { Translations } from "@/context/Language";
import * as Yup from "yup";
const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const basicSchema = (messages: Translations) => ({
  email: Yup.string()
    .email(messages.validation.signIn.email.v1)
    .matches(emailRules, messages.validation.signIn.email.v1)
    .required(messages.validation.signIn.email.v2),
});

export const yupLoginSchema = (messages: Translations) => {
  return Yup.object({
    ...basicSchema(messages),
    password: Yup.string().required(messages.validation.signIn?.password),
  });
};

export const yupAddProductScheme = (messages: Translations) => {
  return Yup.object({
    name: Yup.string().required(messages.validation.product?.name),
    categoryId: Yup.string().required(messages.validation.product?.categoryId),
    imageUrl: Yup.string().required(messages.validation.product?.imageUrl),
    price: Yup.mixed().required(messages.validation.product?.price),
    quantity: Yup.number().required(messages.validation.product?.quantity),
  });
};

export const addEmployeeSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  dob: Yup.mixed().required("Date of Birth Required"),
  phone_number: Yup.string()
    .required("Phone Number Required")
    .min(10, "Phone Number Length At Least Must Be 10 Character")
    .max(12, "Phone Number Length Shouldn't Be Above 12 Character")
    .matches(/^8\d*$/, "Phone Number Must Start With 8"),
  email: Yup.string().required("Email Required"),
  password: Yup.string().required("Password Required"),
  role: Yup.string().required("Role Required"),
  nik: Yup.string()
    .required("NIK Required")
    .min(16, "NIK Length Must Be 16 Character")
    .max(16, "NIK Length Must Be 16 Character"),
});

export const updateEmployeeSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  dob: Yup.mixed().required("Date of Birth Required"),
  phone_number: Yup.string()
    .required("Phone Number Required")
    .min(10, "Phone Number Length At Least Must Be 10 Character")
    .max(12, "Phone Number Length Shouldn't Be Above 12 Character")
    .matches(/^8\d*$/, "Phone Number Must Start With 8"),
  email: Yup.string().required("Email Required"),
  role: Yup.string().required("Role Required"),
  nik: Yup.string()
    .required("NIK Required")
    .min(16, "NIK Length Must Be 16 Character")
    .max(16, "NIK Length Must Be 16 Character"),
});

export const addProductScheme = Yup.object({
  name: Yup.string().required("Proudct Name Required"),
  categoryId: Yup.string().required("Product Category Required"),
  imageUrl: Yup.string().required("Product Image Required"),
  price: Yup.mixed().required("Proudct Price Required"),
  quantity: Yup.number().required("Proudct Stock Required"),
});

export const addTransactionScheme = Yup.object({
  userId: Yup.string().required("User ID Required"),
  userName: Yup.string().required("User Name Required"),
  customerName: Yup.string().required("Customer Name Required"),
  customerPhone: Yup.string().required("Customer Phone Number Required"),
  customerEmail: Yup.string(),
  paymentMethod: Yup.string().required("Payment Method Required"),
  orderItem: Yup.array().min(1, "Item Required"),
});

export const changePasswordScheme = Yup.object({
  oldPassword: Yup.string().required("Old Password Required"),
  newPassword: Yup.string().required("New Password Required"),
  confirmPassword: Yup.string()
    .required("Confirmation Password is required")
    .oneOf(
      [Yup.ref("newPassword")],
      "Confirm Password must match with Password"
    ),
});
