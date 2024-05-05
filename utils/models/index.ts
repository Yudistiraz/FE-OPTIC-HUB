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

export type ProductCategory = {
  id: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  deletedAt?: Date | string | null;
  name: string;
};

export type OrderItem = TProduct & {
  qty: number;
};

export type Prescription = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  right_sph: string;
  right_cylinder: string;
  right_axis: string;
  right_add: string;
  right_pd: string;
  left_sph: string;
  left_cylinder: string;
  left_axis: string;
  left_add: string;
  left_pd: string;
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
  orderItem?: OrderItem[];
  prescription?: Prescription;
};
