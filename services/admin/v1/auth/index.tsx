import { AxiosResponse } from "axios";

import { api } from "@/services/config";

interface ParamInterface {
  [key: string]: number | string | unknown | undefined | null;
}

export const adminSignIn = async (
  data: ParamInterface
): Promise<AxiosResponse> => {
  const fetcher = await api();

  return fetcher.post("/auth/login", {
    ...data,
  });
};

// export const adminRequestPassword = async (data: any) => {
//   const fetcher = await api()
//   return fetcher.post(ADMIN_V1 + '/auth/reset-password', data.data)
// }

// export const adminUpdatePassword = async (data: any) => {
//   const fetcher = await api()
//   return fetcher.put(ADMIN_V1 + '/auth/reset-password', data.data)
// }
