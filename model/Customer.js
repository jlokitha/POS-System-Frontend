import { customers } from "/db/DB.js";

export function saveCustomer(customer) {
  customers.push(customer);
}

export function searchCustomer(custId) {
  const customer = customers.find((cust) => {
    return cust.id === custId;
  });

  return customer !== undefined ? customer : false;
}

export function getAllCustomers() {
  return customers;
}
