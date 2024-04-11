import dayjs, { Dayjs } from "dayjs";
export function gethelperText(isError: boolean, message: string) {
  if (isError) return message;
  else return "";
}

export type optionsDataType = {
  label: string;
  value: string;
};

// const isActiveSidebar = (pathname: string, path) => {
//   return pathname.startsWith(path);
// };

export function isSideBarActive(pathname: string, path: string): boolean {
  return pathname === path || pathname.startsWith(path + "/");
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

export function checkPageValidity(page: number) {
  if (page <= 0 || page === null || page === undefined) {
    return 1;
  } else {
    return page;
  }
}

export function getThousandSeparator(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function removeThousandsSeparator(
  numberString: string | number
): number {
  const str =
    typeof numberString === "number" ? numberString.toString() : numberString;

  return parseFloat(str.replace(/,/g, ""));
}

export function convertDataToDropdownOptions<T>(
  originalData: T[],
  labelField: keyof T,
  valueField: keyof T
): optionsDataType[] {
  return (originalData || []).map((item) => ({
    label: String(item[labelField]),
    value: String(item[valueField]),
  }));
}
