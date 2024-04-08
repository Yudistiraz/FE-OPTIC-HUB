import { api } from "@/services/config";
interface ParamInterface {
  [key: string]: number | string | unknown | undefined | null;
}

export const getAllEmployee = async (params?: ParamInterface) => {
  const fetcher = await api();

  return fetcher.get("/user", {
    params,
  });
};

export const addEmployee = async (data: any) => {
  const fetcher = await api();
  return fetcher.post("/user/add-user", data.data);
};

// export const getAdminByID = async (id: string) => {
//   const fetcher = await api();
//   return fetcher.get(ADMIN_V1 + "/admins/" + id);
// };

// export const updateAdmin = async (data: any) => {
//   const fetcher = await api();
//   return fetcher.put(ADMIN_V1 + `/admins/${data.id}`, data.data);
// };
