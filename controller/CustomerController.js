$(document).ready(() => {
  const custId = $("#cust-id");
  const custIdWarning = $("#cust-id-warning");

  const custName = $("#cust-name");
  const custNameWarning = $("#cust-name-warning");

  const custAddress = $("#cust-address");
  const custAddressWarning = $("#cust-address-warning");

  const custSalary = $("#cust-salary");
  const custSalaryWarning = $("#cust-salary-warning");

  const custIdRegex = /^C-(?!0{3})\d{3,}$/;
  const custNameRegex = /^[A-Za-z]{3,}$/;
  const custAddressRegex = /^(No \d+, )?[a-zA-Z]{5,}$/;
  const custSalaryRegex = /\$?\d{1,3}(,\d{3})*(\.\d{2})?(\s?K|\s?k|\s?M|\s?m)?/;

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
});
