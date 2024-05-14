import dayjs, { Dayjs } from "dayjs";
import { OrderItem, TProduct } from "../models";
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

export function isItemInArray<T extends { id: string }>(
  array: T[],
  item: T
): boolean {
  return array.some((arrayItem) => arrayItem.id === item.id);
}

export function checkPageValidity(page: number) {
  if (page <= 0 || page === null || page === undefined) {
    return 1;
  } else {
    return page;
  }
}

export function getThousandSeparator(value: number | undefined) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return;
  }
}

export function removeThousandsSeparator(
  numberString: string | number
): number {
  const str =
    typeof numberString === "number" ? numberString.toString() : numberString;

  return parseFloat(str.replace(/,/g, ""));
}

export function removeThousandsSeparatortoString(
  numberString: string | number
): string {
  const str =
    typeof numberString === "number" ? numberString.toString() : numberString;

  return str.replace(/,/g, "");
}

export function convertDataToDropdownOptions<T>(
  originalData: T[],
  labelField: keyof T,
  valueField: keyof T
): optionsDataType[] {
  if (originalData?.length > 0) {
    return (originalData || []).map((item) => ({
      label: String(item[labelField]),
      value: String(item[valueField]),
    }));
  } else {
    return [];
  }
}

// export function addProductToArray<T extends TProduct>(
//   productData: TProduct,
//   array: T[]
// ) {
//   const productWithQuantity = { ...productData, qty: 1 } as T;
//   array.push(productWithQuantity);
// }

export function addProductToArray(productData: TProduct, array: OrderItem[]) {
  const productWithQuantity = { ...productData, qty: 1 };
  array.push(productWithQuantity);
}

export function deleteProductFromArray<T extends { id: string }>(
  productId: string,
  array: T[]
) {
  const index = array.findIndex((item) => item.id === productId);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

export function updateOrderItemQuantity(
  quantity: number,
  orderItem: OrderItem,
  maxStock: number | undefined
): OrderItem {
  let maximumStock = maxStock || 1;
  const updatedQuantity = Math.max(1, Math.min(quantity, maximumStock));
  return {
    ...orderItem,
    qty: updatedQuantity || 1,
  };
}

export function updateOrderItems(
  updatedOrderItem: OrderItem,
  orderItems: OrderItem[]
): OrderItem[] {
  const updatedItems = orderItems.map((item) => {
    if (item.id === updatedOrderItem.id) {
      return updatedOrderItem;
    }
    return item;
  });
  return updatedItems;
}

export function calculateTotalPrice(products: OrderItem[]): number {
  let totalPrice = 0;

  products.forEach((product) => {
    totalPrice += product.price * product.qty;
  });

  return totalPrice;
}

export function convertEnumValue(enumValue: string | undefined): boolean {
  if (enumValue) {
    if (enumValue === "active") {
      return true;
    } else {
      return false;
    }
  }
  return true;
}
