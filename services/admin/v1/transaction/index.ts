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
  return fetcher.post("/order/add-order", data.data);
};
