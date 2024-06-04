import { items } from "../db/DB.js";

export function saveItem(item) {
  items.push(item);
}

export function updateItem(item) {
  items[findIndexOfItems(item)] = item;
}

export function removeItem(item) {
  const index = findIndexOfItems(item);
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

function findIndexOfItems(item) {
  return items.findIndex((element) => element.id === item.id);
}
