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
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
  name: string;
  priceBeforeTax: number;
  tax: number;
  price: number;
  status: boolean;
  quantity: number;
  imageUrl: string;
  categoryId?: string;
};
