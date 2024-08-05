import { api } from "@/services/config";
interface ParamInterface {
  [key: string]: number | string | unknown | undefined | null;
}

export const getAllTransaction = async (params?: ParamInterface) => {
  const fetcher = await api();

  return fetcher.get("/order", {
    params,
  });
};

export const addTransaction = async (data: any) => {
  const fetcher = await api();
  return fetcher.post("/order", data.data);
};

export const getTransactionById = async (id: string) => {
  const fetcher = await api();
  return fetcher.get("/order/" + id);
};

export const updateTransaction = async (data: any) => {
  const fetcher = await api();
  return fetcher.patch("/order/" + data.id, data.data);
};

export const exportTransaction = async (params?: ParamInterface) => {
  const fetcher = await api();

  return fetcher.get("/order/export", {
    params,
  });
};
