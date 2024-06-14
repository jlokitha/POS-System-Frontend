import { items } from "/public/db/DB.js";

export function saveItem(item) {
  items.push(item);
}

export function updateItem(item) {
  items[findIndexOfItems(item.id)] = item;
}

export function removeItem(item) {
  const index = findIndexOfItems(item.id);
  if (index !== -1) {
    items.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

export function searchItem(itemId) {
  const item = items.find((item) => item.id === itemId);

  return item !== undefined ? item : false;
}

export function getAllItems() {
  return items;
}

export function updateItemQty(iCode, qty) {
  items[findIndexOfItems(iCode)].qty = items[findIndexOfItems(iCode)].qty - qty;
}

function findIndexOfItems(item) {
  return items.findIndex((element) => element.id === item);
}
