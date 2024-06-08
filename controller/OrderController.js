import { searchCustomer } from "../model/Customer.js";
import { getAllCustomers } from "../model/Customer.js";
import { searchItem } from "../model/Item.js";
import { getAllItems } from "../model/Item.js";
import { getAllOrders } from "../model/Orders.js";

$(document).ready(() => {
  // Elements for reuse
  const dCustomer = $("#customer");
  const cId = $("#customer-id");
  const cName = $("#customer-name");
  const cSalary = $("#customer-salary");
  const cAddress = $("#customer-address");
  const orderId = $("#order-id");
  const orderDate = $("#order-date");

  // Load all customer ids
  loadAllCustomerIds();
  generateNextOrderId();
  setCurrentDate();

  // Function to load all customer ids
  function loadAllCustomerIds() {
    getAllCustomers().forEach((cust) => {
      dCustomer.append(`<option value="${cust.id}">${cust.id}</option>)`);
    });
  }

  // Generate new order id
  function generateNextOrderId() {
    let orders = getAllOrders();

    if (orders) {
      orderId.val("O-001");
      return;
    }

    let currentId = orders[orders.length - 1].id;
    let parts = currentId.split("-");
    let no = parseInt(parts[1], 10) + 1;
    orderId.val(parts[0] + "-" + no.toString().padStart(3, "0"));
  }

  dCustomer.change(() => {
    let customer = searchCustomer(dCustomer.val());
    cId.val(customer.id);
    cName.val(customer.name);
    cSalary.val(customer.salary);
    cAddress.val(customer.address);
  });

  function setCurrentDate() {
    orderDate.val(new Date().toISOString().slice(0, 10));
  }
});
