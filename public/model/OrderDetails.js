import { orderDetails } from "/public/db/DB.js";

export function saveOrderDetail(orderDetail) {
  orderDetails.push(orderDetail);
}
