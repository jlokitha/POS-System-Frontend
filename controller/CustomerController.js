import { saveCustomer } from "/model/Customer.js";
import { searchCustomer } from "/model/Customer.js";
import { getAllCustomers } from "/model/Customer.js";

$(document).ready(() => {
  loadAllCustomers();

  const custId = $("#cust-id");
  const custName = $("#cust-name");
  const custAddress = $("#cust-address");
  const custSalary = $("#cust-salary");

  const custIdWarning = $("#cust-id-warning");
  const custNameWarning = $("#cust-name-warning");
  const custAddressWarning = $("#cust-address-warning");
  const custSalaryWarning = $("#cust-salary-warning");

  const custIdRegex = /^C-(?!0{3})\d{3,}$/;
  const custNameRegex = /^[A-Za-z]{3,}$/;
  const custAddressRegex = /^(No \d+, )?[a-zA-Z]{5,}$/;
  const custSalaryRegex = /\$?\d{1,3}(,\d{3})*(\.\d{2})?(\s?K|\s?k|\s?M|\s?m)?/;

  $("#btn-save").on("click", (event) => {
    event.preventDefault();

    let id = custId.val();
    let name = custName.val();
    let address = custAddress.val();
    let salary = custSalary.val();

    saveCustomer({
      id: id,
      name: name,
      address: address,
      salary: salary,
    });

    alert("Customer Saved!!!");
    loadAllCustomers();
  });

  custId.on("input", () => validate(custId, custIdRegex, custIdWarning));
  custName.on("input", () =>
    validate(custName, custNameRegex, custNameWarning)
  );
  custAddress.on("input", () =>
    validate(custAddress, custAddressRegex, custAddressWarning)
  );
  custSalary.on("input", () =>
    validate(custSalary, custSalaryRegex, custSalaryWarning)
  );

  function validate(element, regex, label) {
    if (regex.test(element.val())) {
      element.css("border-color", "green");
      label.css("display", "none");
    } else {
      element.css("border-color", "red");
      label.css("display", "block");
    }
  }

  custId.on("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const id = custId.val();

      if (id !== "" && id !== undefined) {
        let customer = searchCustomer(id);

        custName.val(customer.name);
        custAddress.val(customer.address);
        custSalary.val(customer.salary);
      }
    }
  });

  function loadAllCustomers() {
    $("#cust-table tbody").empty();

    for (var i = 0; i < getAllCustomers().length; i++) {
      appendToTable(getAllCustomers()[i]);
    }
  }

  function appendToTable(customer) {
    $("#cust-table tbody").append(
      `<tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.address}</td>
        <td>${customer.salary}</td>
      </tr>`
    );
  }
});
