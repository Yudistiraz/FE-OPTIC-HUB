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
  product: string;
  categoryID: string;
  name: string;
  price: number;
  status: boolean;
  quantity: number;
  image_url: string;
};
