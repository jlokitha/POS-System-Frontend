import { saveCustomer } from "/model/Customer.js";
import { updateCustomer } from "/model/Customer.js";
import { removeCustomer } from "/model/Customer.js";
import { searchCustomer } from "/model/Customer.js";
import { getAllCustomers } from "/model/Customer.js";

$(document).ready(() => {
  // Elements for reuse
  const custId = $("#cust-id");
  const custName = $("#cust-name");
  const custAddress = $("#cust-address");
  const custSalary = $("#cust-salary");

  const custIdWarning = $("#cust-id-warning");
  const custNameWarning = $("#cust-name-warning");
  const custAddressWarning = $("#cust-address-warning");
  const custSalaryWarning = $("#cust-salary-warning");

  // Regular expressions
  const custIdRegex = /\d/;
  const custNameRegex = /^[A-Za-z]{3,}(?:\s+[A-Za-z]{3,})*$/;
  const custAddressRegex = /(?=(?:.*[A-Za-z0-9]){5})[A-Za-z0-9'\.\-\s\,]/;
  const custSalaryRegex =
    /^(\$?\d{1,3}(,\d{3})*|\d+)(\.\d{2})?(\s?K|\s?k|\s?M|\s?m)?$/;

  // Load all customers when the document is ready
  loadAllCustomers();

  // Event listener for save button
  $("#btn-cust-save").click((event) => {
    event.preventDefault();
    custId.val(getNewCustId());

    if (validateAll()) {
      saveCustomer({
        name: custName.val(),
        address: custAddress.val(),
        salary: custSalary.val(),
      });

      delay(1000).then(() => loadAllCustomers());
      clearInputs();
      custId.val(getNewCustId());
      alert("Customer Saved!!!");
    } else {
      alert("Customer not Saved!!!");
    }
  });

  // Event listener for update button
  $("#btn-cust-update").click((event) => {
    event.preventDefault();

    if (validateAll()) {
      updateCustomer({
        id: custId.val(),
        name: custName.val(),
        address: custAddress.val(),
        salary: custSalary.val(),
      });

      delay(1000).then(() => loadAllCustomers());
      alert("Customer Updated!!!");
      clearInputs();
      custId.val(getNewCustId());
    } else {
      alert("Customer not Updated!!!");
    }
  });

  // Event listener for remove button
  $("#btn-cust-remove").click((event) => {
    event.preventDefault();

    removeCustomer(custId.val());
    delay(1000).then(() => loadAllCustomers());
    clearInputs();
    custId.val(getNewCustId());
  });

  // Event listener for clear all button
  $("#btn-cust-clear-all").click((event) => {
    event.preventDefault();
    clearInputs();
  });

  // Event listeners for input validation
  custName.on("input", () =>
    validate(custName, custNameRegex, custNameWarning)
  );
  custAddress.on("input", () =>
    validate(custAddress, custAddressRegex, custAddressWarning)
  );
  custSalary.on("input", () =>
    validate(custSalary, custSalaryRegex, custSalaryWarning)
  );

  // Function to validate all fields
  function validateAll() {
    let result;

    result = validate(custId, custIdRegex, custIdWarning);

    if (result) {
      result = validate(custName, custNameRegex, custNameWarning);

      if (result) {
        result = validate(custAddress, custAddressRegex, custAddressWarning);

        if (result) {
          result = validate(custSalary, custSalaryRegex, custSalaryWarning);

          return true;
        }
      }
    }

    return false;
  }

  // Validation function
  function validate(element, regex, label) {
    if (regex.test(element.val())) {
      element.css("border-color", "green");
      label.hide();
      return true;
    } else {
      element.css("border-color", "red");
      label.show();
      return false;
    }
  }

  // Keydown event listener for custId
  custId.keydown((event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const id = custId.val();

      if (id) {
        let customer = searchCustomer(id);

        if (customer) {
          custName.val(customer.name);
          custAddress.val(customer.address);
          custSalary.val(customer.salary);
        } else {
          alert("Customer not found!!!");
          clearInputs();
        }
      } else {
        custId.val("").css("border-color", "green");
        custIdWarning.hide();
        custId.val(getNewCustId());
        custName.focus();
      }
    }
  });

  // Function to load all customers into the table
  function loadAllCustomers() {
    $("#cust-table tbody").empty();
    getAllCustomers()
      .then((values) => {
        values.forEach(appendToTable);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }

  // Function to append a customer to the table
  function appendToTable(customer) {
    console.log(customer);

    $("#cust-table tbody").append(
      `<tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.address}</td>
        <td>${customer.salary}</td>
      </tr>`
    );
  }

  // Function to clear all input fields
  function clearInputs() {
    $("#btn-cust-save").show();

    custId.val("").css("border-color", "grey").attr("readonly", false);
    custName.val("").css("border-color", "grey");
    custAddress.val("").css("border-color", "grey");
    custSalary.val("").css("border-color", "grey");

    custIdWarning.hide();
    custNameWarning.hide();
    custAddressWarning.hide();
    custSalaryWarning.hide();
  }

  // Function to generate a new customer ID
  function getNewCustId() {
    const rows = $("#cust-table tbody tr");

    if (rows.length !== 0) {
      let id = rows.last().find("td").eq(0).text().trim();
      return parseInt(id, 10) + 1;
    }
  }

  // Click event listener for table row
  $("#cust-table tbody").on("click", "tr", function () {
    let id = $(this).children("td:eq(0)").text();
    let name = $(this).children("td:eq(1)").text();
    let address = $(this).children("td:eq(2)").text();
    let salary = $(this).children("td:eq(3)").text();

    $("#btn-cust-save").hide();
    custId.val(id).attr("readonly", true);
    custName.val(name);
    custAddress.val(address);
    custSalary.val(salary);
  });

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
