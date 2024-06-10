import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Jakarta");

export function checkDateValidity(d: Dayjs | Date) {
  return dayjs(d).isValid();
}

export function formateDate1(
  date: Date | Dayjs | string | null | undefined
): string {
  if (!date) {
    return "-";
  } else {
    return dayjs.utc(date).local().format("DD-MM-YYYY");
  }
}

export function formateDate2(
  date: Date | Dayjs | string | null | undefined
): string {
  if (!date) {
    return "-";
  } else {
    return dayjs.utc(date).local().format("YYYY-MM-DD");
  }
}

export function formateDate3(
  date: Date | Dayjs | string | null | undefined
): string {
  if (!date) {
    return "-";
  } else {
    return dayjs.utc(date).local().format("DD MMMM YYYY HH:mm");
  }
}

export function formatDateParameter(
  date: Date | Dayjs | string | null | undefined
): string {
  if (!date) {
    return "";
  } else {
    return dayjs.utc(date).local().format("YYYY-MM-DD");
  }
}
