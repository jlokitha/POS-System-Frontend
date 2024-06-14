import { searchCustomer } from "/public/model/Customer.js";
import { getAllCustomers } from "/public/model/Customer.js";
import { searchItem } from "/public/model/Item.js";
import { getAllItems } from "/public/model/Item.js";
import { getAllOrders } from "/public/model/Orders.js";
import { saveOrder } from "/public/model/Orders.js";
import { updateItemQty } from "/public/model/Item.js";
import { saveOrderDetail } from "/public/model/OrderDetails.js";

$(document).ready(() => {
  // Elements for reuse
  const dCustomer = $("#customer");
  const cId = $("#customer-id");
  const cName = $("#customer-name");
  const cSalary = $("#customer-salary");
  const cAddress = $("#customer-address");
  const orderId = $("#order-id");
  const orderDate = $("#order-date");

  const dItem = $("#item");
  const iCode = $("#item-code");
  const iDesc = $("#item-description");
  const iPrice = $("#price");
  const iQtyOnH = $("#item-qtyOnH");
  const oQty = $("#ordered-qty");
  const itemTable = $("#added-item tbody");
  const oQtyWarning = $("#ordered-qty-warning");

  const fullTotal = $("#total");
  const subTotal = $("#sub-total");
  const cash = $("#cash");
  const discount = $("#discount");
  const balance = $("#balance");
  const cashWarning = $("#cash-warning");

  let initialQty = 0;
  let previousValue = 0;

  const price = /^(\$?\d{1,3}(,\d{3})*|\d+)(\.\d{2})?(\s?K|\s?k|\s?M|\s?m)?$/;

  // Load all customer ids
  generateNextOrderId();
  setCurrentDate();
  loadAllCustomerIds();
  loadAllItemIds();

  cash.on("input", () => {
    const tot = parseFloat(subTotal.text());
    const cashValue = parseFloat(cash.val());

    if (cashValue >= tot) {
      calculateBalance();
      cashWarning.hide();
    } else {
      cashWarning.show();
    }
  });

  $("#btn-purchase").click((event) => {
    event.preventDefault();

    const custSelected = dCustomer.val();

    if (custSelected) {
      const subTot = parseFloat(subTotal.text());
      const cashValue = parseFloat(cash.val());

      if ($("#added-item tbody tr").length > 0) {
        if (cashValue >= subTot) {
          saveOrder({
            id: orderId.val(),
            customer: dCustomer.val(),
            total: fullTotal.text(),
            discount: discount.val(),
            date: orderDate.val(),
          });

          $("#added-item tbody tr").each(function () {
            const iCode = $(this).find("td").eq(0).text();
            const iQty = parseInt($(this).find("td").eq(3).text(), 10);

            updateItemQty(iCode, iQty);

            saveOrderDetail({
              orderId: orderId.val(),
              itemCode: iCode,
              qty: iQty,
            });
          });

          alert("Order purchased!");
          clearCustomerFileds();
          clearItemFileds();
          clearPurchaseFields();
          itemTable.empty();
          generateNextOrderId();
        } else {
          alert("Insuffient amount!");
        }
      } else {
        alert("Please add items!");
      }
    } else {
      alert("Please select a customer Id!");
    }
  });

  $("#add-item").click((event) => {
    event.preventDefault();
    let current = parseInt(oQty.val(), 10) || 0;

    if (current > -1 && current < initialQty) {
      if (addItem()) {
        calculateTotal();
        calculateSubTotal();
        calculateBalance();
        clearItemFileds();
      }
    }
  });

  discount.on("input", () => {
    calculateSubTotal();
    calculateTotal();
    calculateBalance();
  });

  function addItem() {
    let addNew = true;

    $("#added-item tbody tr").each(function () {
      const selectedId = dItem.val();
      let id = $(this).find("td").eq(0).text();

      if (selectedId === id) {
        addNew = false;
        let qtyField = $(this).find("td").eq(3);
        let currentQty = parseInt(qtyField.text(), 10);
        qtyField.text(currentQty + parseInt(oQty.val(), 10));
        let price = $(this).find("td").eq(2);
        let total = $(this).find("td").eq(4);
        total.text(parseInt(price.text(), 10) * parseInt(qtyField.text(), 10));
      }
    });

    if (addNew) {
      itemTable.append(
        `<tr>
            <td>${iCode.val()}</td>
            <td>${iDesc.val()}</td>
            <td>${iPrice.val()}</td>
            <td>${oQty.val()}</td>
            <td>${iPrice.val() * oQty.val()}</td>
        </tr>`
      );
    }

    return true;
  }

  // Calculate qty on hand
  oQty.keydown(() => {
    previousValue = parseInt(oQty.val(), 10) || 0;
  });

  oQty.on("input", (event) => {
    let current = parseInt(oQty.val(), 10) || 0;

    if (current > -1 && current < initialQty) {
      if (event.which === 8 || event.which === 46) {
        let newQty = parseInt(oQty.val(), 10) || 0;
        iQtyOnH.val(initialQty + (previousValue - newQty));
      } else {
        iQtyOnH.val(initialQty - current);
      }
      oQtyWarning.hide();
    } else {
      oQty.val("");
      iQtyOnH.val(initialQty);
      oQtyWarning.show();
    }
  });

  // Function to calculate total
  function calculateTotal() {
    let total = 0;

    $("#added-item tbody tr").each(function () {
      total += parseFloat($(this).find("td").eq(4).text());
    });

    fullTotal.text(total);
  }

  // Function to calculate sub-total
  function calculateSubTotal() {
    const tot = parseFloat(fullTotal.text());
    const discountValue = parseFloat(discount.val());

    if (discountValue) {
      if (discountValue <= 100 && discountValue >= 0) {
        subTotal.text(tot - (tot * discountValue) / 100);
      } else {
        alert("Invalid discount! Discount should be between 0 and 100!");
      }
    } else {
      subTotal.text(tot);
    }
  }

  // Function to calculate balance
  function calculateBalance() {
    const subTot = parseFloat(subTotal.text());
    const cashValue = parseFloat(cash.val());

    balance.val(cashValue - subTot);
  }

  // Function to load all customer ids
  function loadAllCustomerIds() {
    dCustomer.empty();
    dCustomer.append(`<option hidden></option>)`);
    getAllCustomers().forEach((cust) => {
      dCustomer.append(`<option value="${cust.id}">${cust.id}</option>)`);
    });
  }

  // Function to load all item ids
  function loadAllItemIds() {
    dItem.empty();
    dItem.append(`<option hidden></option>`);
    getAllItems().forEach((item) => {
      dItem.append(`<option value="${item.id}">${item.id}</option>`);
    });
  }

  // Generate new order id
  function generateNextOrderId() {
    let orders = getAllOrders();

    if (orders.length === 0) {
      orderId.val("O-001");
      return;
    }

    let currentId = orders[orders.length - 1].id;
    let parts = currentId.split("-");
    let no = parseInt(parts[1], 10) + 1;
    orderId.val(parts[0] + "-" + no.toString().padStart(3, "0"));
  }

  // Fill the data of selected customer
  dCustomer.change(() => {
    let customer = searchCustomer(dCustomer.val());

    cId.val(customer.id);
    cName.val(customer.name);
    cSalary.val(customer.salary);
    cAddress.val(customer.address);
  });

  // Fill the data of selected item
  dItem.change(() => {
    let item = searchItem(dItem.val());
    let found = true;

    iCode.val(item.id);
    iDesc.val(item.desc);
    iPrice.val(item.price);

    $("#added-item tbody tr").each(function () {
      let iId = $(this).find("td").eq(0).text();
      let iQty = parseInt($(this).find("td").eq(3).text(), 10);

      if (iId === item.id) {
        found = false;
        initialQty = item.qty - iQty;
        iQtyOnH.val(initialQty);
        return;
      }
    });

    if (found) {
      initialQty = item.qty;
      iQtyOnH.val(initialQty);
    }
  });

  function clearCustomerFileds() {
    orderId.val("");
    orderDate.val("");
    dCustomer.val("");
    cId.val("");
    cName.val("");
    cAddress.val("");
    cSalary.val("");
  }

  function clearItemFileds() {
    dItem.val("");
    iCode.val("");
    iDesc.val("");
    iPrice.val("");
    iQtyOnH.val("");
    oQty.val("");

    oQtyWarning.hide();
  }

  function clearPurchaseFields() {
    fullTotal.text("00.0");
    subTotal.text("00.0");
    cash.val("");
    discount.val("");
    balance.val("");
  }

  $("#order-manage-btn").click(() => {
    loadAllCustomerIds();
    loadAllItemIds();
  });

  // Set current date
  function setCurrentDate() {
    orderDate.val(new Date().toISOString().slice(0, 10));
  }
});
