export type TEmployee = {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
  dob: Date | string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  status: boolean;
  role: string;
};

export type TProduct = {
  id: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  deletedAt?: Date | string | null;
  name: string;
  priceBeforeTax: number;
  tax: number;
  price: number;
  status: boolean;
  quantity: number;
  imageUrl: string;
  categoryId?: string;
  category?: ProductCategory;
};

export type OrderItem = TProduct & {
  qty: number;
};

export type ProductCategory = {
  id: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  deletedAt?: Date | string | null;
  name: string;
};

export type TTransaction = {
  id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalItem: number;
  isComplete: boolean;
  paymentMethod: string;
  subTotal: number;
  tax: number;
  totalPrice: number;
  imageUrl: string;
  transactionDate: Date | string;
};
