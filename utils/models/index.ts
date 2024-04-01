export type TEmployee = {
  id: string;
  dob: Date | string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  status: boolean;
  role: string;
};

export type TProduct = {
  id: string;
  categoryID: string;
  name: string;
  price: number;
  status: boolean;
  quantity: number;
  imageUrl: string;
};
