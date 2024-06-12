import { orders } from "../db/DB.js";

export function getAllOrders() {
  return orders;
}

export function saveOrder(order) {
  orders.push(order);
}

export function searchOrder(orderId) {
  const order = orders.find((order) => order.id === orderId);

  return order !== undefined ? order : false;
}
