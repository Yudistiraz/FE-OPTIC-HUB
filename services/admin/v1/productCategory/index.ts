import { api } from "@/services/config";
interface ParamInterface {
  [key: string]: number | string | unknown | undefined | null;
}

export const getAllProductCategory = async (params?: ParamInterface) => {
  const fetcher = await api();

  return fetcher.get("/category", {
    params,
  });
};
