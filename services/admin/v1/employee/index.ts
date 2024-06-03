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
  return fetcher.post("/user", data.data);
};

export const getEmployeeById = async (id: string) => {
  const fetcher = await api();
  return fetcher.get("/user/" + id);
};

export const updateEmployee = async (data: any) => {
  const fetcher = await api();
  return fetcher.patch("/user/" + data.id, data.data);
};

export const deleteEmployee = async (id: string) => {
  const fetcher = await api();
  return fetcher.delete("/user/" + id);
};

export const updatePasswordEmployee = async (data: any) => {
  const fetcher = await api();
  return fetcher.patch("/user/change-password/" + data.id, data.data);
};

// export const getAdminByID = async (id: string) => {
//   const fetcher = await api();
//   return fetcher.get(ADMIN_V1 + "/admins/" + id);
// };

// export const updateAdmin = async (data: any) => {
//   const fetcher = await api();
//   return fetcher.put(ADMIN_V1 + `/admins/${data.id}`, data.data);
// };
