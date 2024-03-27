import dayjs, { Dayjs } from "dayjs";
export function gethelperText(isError: boolean, message: string) {
  if (isError) return message;
  else return "";
}

export function checkDateValidity(d: Dayjs) {
  return dayjs(d).isValid();
}

export function findDataById<T extends { id: string }>(
  dataArray: T[],
  id: string
): T | undefined {
  return dataArray.find((item) => item.id === id);
}
