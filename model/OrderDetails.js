import { orderDetails } from "/db/DB.js";

export function saveOrderDetail(orderDetail) {
  orderDetails.push(orderDetail);
}
