import { customers } from "/db/DB.js";

export function saveCustomer(customer) {
  customers.push(customer);
}

export function updateCustomer(customer) {
  customers[findIndexOfCustomers(customer)] = customer;
}

export function removeCustomer(customer) {
  const index = findIndexOfCustomers(customer);
  if (index !== -1) {
    customers.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

export function searchCustomer(custId) {
  const customer = customers.find((cust) => cust.id === custId);

  return customer !== undefined ? customer : false;
}

export function getAllCustomers() {
  return customers;
}

function findIndexOfCustomers(customer) {
  return customers.findIndex((element) => element.id === customer.id);
}
