import { api } from "@/services/config";
interface ParamInterface {
  [key: string]: number | string | unknown | undefined | null;
}

export const getAllProduct = async (params?: ParamInterface) => {
  const fetcher = await api();

  return fetcher.get("/products", {
    params,
  });
};

export const addProduct = async (data: any) => {
  const fetcher = await api();
  return fetcher.post("/products", data.data);
};

export const getProductById = async (id: string) => {
  const fetcher = await api();
  return fetcher.get("/products/" + id);
};

export const updateProduct = async (data: any) => {
  const fetcher = await api();
  return fetcher.patch("/products/" + data.id, data.data);
};

export const deleteProduct = async (id: string) => {
  const fetcher = await api();
  return fetcher.delete("/products/" + id);
};

export const getLowStockProduct = async () => {
  const fetcher = await api();
  return fetcher.get("/products/stock");
};
