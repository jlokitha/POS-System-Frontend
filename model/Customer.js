import { customers } from "/db/DB.js";

export function searchCustomer(custId) {
  const customer = customers.find((cust) => {
    return cust.id === custId;
  });

  return customer !== undefined ? customer : false;
}
