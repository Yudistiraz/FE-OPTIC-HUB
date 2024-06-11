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

export const yupAddEmployeeScheme = (messages: Translations) => {
  return Yup.object({
    name: Yup.string().required(messages.validation.employee?.name),
    dob: Yup.mixed().required(messages.validation.employee?.dob),
    phone_number: Yup.string()
      .required(messages.validation.employee?.phone_number?.v1)
      .min(10, messages.validation.employee?.phone_number?.v2)
      .max(12, messages.validation.employee?.phone_number?.v3)
      .matches(/^8\d*$/, messages.validation.employee?.phone_number?.v4),
    email: Yup.string().required(messages.validation.employee?.email),
    password: Yup.string().required(messages.validation.employee?.password),
    role: Yup.string().required(messages.validation.employee?.role),
    nik: Yup.string()
      .required(messages.validation.employee?.nik?.v1)
      .min(16, messages.validation.employee?.nik?.v2)
      .max(16, messages.validation.employee?.nik?.v2),
  });
};

export const yupUpdateEmployeeScheme = (messages: Translations) => {
  return Yup.object({
    name: Yup.string().required(messages.validation.employee?.name),
    dob: Yup.mixed().required(messages.validation.employee?.dob),
    phone_number: Yup.string()
      .required(messages.validation.employee?.phone_number?.v1)
      .min(10, messages.validation.employee?.phone_number?.v2)
      .max(12, messages.validation.employee?.phone_number?.v3)
      .matches(/^8\d*$/, messages.validation.employee?.phone_number?.v4),
    email: Yup.string().required(messages.validation.employee?.email),
    role: Yup.string().required(messages.validation.employee?.role),
    nik: Yup.string()
      .required(messages.validation.employee?.nik?.v1)
      .min(16, messages.validation.employee?.nik?.v2)
      .max(16, messages.validation.employee?.nik?.v2),
  });
};

export const yupChangePasswordScheme = (messages: Translations) => {
  return Yup.object({
    oldPassword: Yup.string().required(
      messages.validation.changePassword?.oldPassword
    ),
    newPassword: Yup.string().required(
      messages.validation.changePassword?.newPassword
    ),
    confirmPassword: Yup.string()
      .required(messages.validation.changePassword?.confirmPassword?.v1)
      .oneOf(
        [Yup.ref("newPassword")],
        messages.validation.changePassword?.confirmPassword?.v2
      ),
  });
};

export const yupAddTransactionScheme = (messages: Translations) => {
  return Yup.object({
    userId: Yup.string().required(messages.validation.transaction?.userId),
    userName: Yup.string().required(messages.validation.transaction?.userName),
    customerName: Yup.string().required(
      messages.validation.transaction?.customerName
    ),
    customerPhone: Yup.string().required(
      messages.validation.transaction?.customerPhone
    ),
    customerEmail: Yup.string(),
    paymentMethod: Yup.string().required(
      messages.validation.transaction?.paymentMethod
    ),
    orderItem: Yup.array().min(1, messages.validation.transaction?.orderItem),
  });
};

export const addTransactionScheme = Yup.object({
  userId: Yup.string().required("User ID Required"),
  userName: Yup.string().required("User Name Required"),
  customerName: Yup.string().required("Customer Name Required"),
  customerPhone: Yup.string().required("Customer Phone Number Required"),
  customerEmail: Yup.string(),
  paymentMethod: Yup.string().required("Payment Method Required"),
  orderItem: Yup.array().min(1, "Item Required"),
});
