import { saveItem } from "/public/model/Item.js";
import { updateItem } from "/public/model/Item.js";
import { removeItem } from "/public/model/Item.js";
import { searchItem } from "/public/model/Item.js";
import { getAllItems } from "/public/model/Item.js";

$("document").ready(() => {
  //Elements for reuse
  const itemId = $("#item-id");
  const itemDesc = $("#item-desc");
  const itemQty = $("#item-qty");
  const itemPrice = $("#item-price");

  const itemIdWarning = $("#item-id-warning");
  const itemDescWarning = $("#item-desc-warning");
  const itemQtyWarning = $("#item-qty-warning");
  const itemPriceWarning = $("#item-price-warning");

  // Regular expressions
  const itemIdRegex = /^I-(?!0{3})\d{3,}$/;
  const itemDescRegex = /^[A-Za-z]{3,}(?:\s+[A-Za-z]{3,})*$/;
  const itemQtyRegex = /^\d+(?:\.\d+)?$/;
  const itemPriceRegex =
    /^(\$?\d{1,3}(,\d{3})*|\d+)(\.\d{2})?(\s?K|\s?k|\s?M|\s?m)?$/;

  // Load all items when document is ready
  loadAllItems();
  itemId.focus();

  // Event listener for save button
  $("#btn-item-save").click((event) => {
    event.preventDefault();
    itemId.val(getNewItemId());

    if (validateAll()) {
      saveItem({
        id: itemId.val(),
        desc: itemDesc.val(),
        qty: itemQty.val(),
        price: itemPrice.val(),
      });

      loadAllItems();
      clearInputs();
      alert("Item Saved!!!");
    } else {
      alert("Item not Saved!!!");
    }
  });

  // Event listner for update button
  $("#btn-item-update").click((event) => {
    event.preventDefault();

    if (validateAll()) {
      updateItem({
        id: itemId.val(),
        desc: itemDesc.val(),
        qty: itemQty.val(),
        price: itemPrice.val(),
      });

      loadAllItems();
      clearInputs();
      alert("Item Updated!!!");
    } else {
      alert("Item not Updated!!!");
    }
  });

  // Event listner for remove button
  $("#btn-item-remove").click((event) => {
    event.preventDefault();

    let result = removeItem({
      id: itemId.val(),
      desc: itemDesc.val(),
      qty: itemQty.val(),
      price: itemPrice.val(),
    });

    if (result) {
      loadAllItems();
      clearInputs();
      alert("Item Removed!!!");
    } else {
      alert("Item not Removed!!!");
    }
  });

  // Event listner for clear all button
  $("#btn-item-clear-all").click((event) => {
    event.preventDefault();
    clearInputs();
  });

  // Click event listener for table row
  $("#item-table tbody").on("click", "tr", function () {
    let id = $(this).children("td:eq(0)").text();
    let desc = $(this).children("td:eq(1)").text();
    let qty = $(this).children("td:eq(2)").text();
    let price = $(this).children("td:eq(3)").text();

    $("#btn-item-save").hide();
    itemId.val(id).attr("readonly", true);
    itemDesc.val(desc);
    itemQty.val(qty);
    itemPrice.val(price);
  });

  // Event listeners for input validation
  itemId.on("input", () => validate(itemId, itemIdRegex, itemIdWarning));
  itemDesc.on("input", () =>
    validate(itemDesc, itemDescRegex, itemDescWarning)
  );
  itemQty.on("input", () => validate(itemQty, itemQtyRegex, itemQtyWarning));
  itemPrice.on("input", () =>
    validate(itemPrice, itemPriceRegex, itemPriceWarning)
  );

  // Function to validate all fields
  function validateAll() {
    let result;

    result = validate(itemId, itemIdRegex, itemIdWarning);

    if (result) {
      result = validate(itemDesc, itemDescRegex, itemDescWarning);

      if (result) {
        result = validate(itemQty, itemQtyRegex, itemQtyWarning);

        if (result) {
          result = validate(itemPrice, itemPriceRegex, itemPriceWarning);

          return true;
        }
      }
    }

    return false;
  }

  // Keydown event listener for itemId
  itemId.keydown((event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const id = itemId.val();

      if (id) {
        let item = searchItem(id);

        if (item) {
          itemDesc.val(item.desc);
          itemQty.val(item.qty);
          itemPrice.val(item.price);
        } else {
          alert("Item not found!!!");
          clearInputs();
        }
      } else {
        itemId.val("").css("border-color", "green");
        itemIdWarning.hide();
        itemId.val(getNewItemId());
        itemDesc.focus();
      }
    }
  });

  // Function to load all items into the table
  function loadAllItems() {
    $("#item-table tbody").empty();

    getAllItems().forEach(appendToTable);
  }

  //Function to append a item to the table
  function appendToTable(item) {
    $("#item-table tbody").append(
      `<tr>
        <td>${item.id}</td>
        <td>${item.desc}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
      </tr>`
    );
  }

  // Function to clear all input fields
  function clearInputs() {
    $("#btn-item-save").show();

    itemId.val("").css("border-color", "grey").attr("readonly", false);
    itemDesc.val("").css("border-color", "grey");
    itemQty.val("").css("border-color", "grey");
    itemPrice.val("").css("border-color", "grey");

    itemIdWarning.hide();
    itemDescWarning.hide();
    itemQtyWarning.hide();
    itemPriceWarning.hide();
  }

  // Function to generate a new item ID
  function getNewItemId() {
    let items = getAllItems();
    if (items.length === 0) {
      return "I-001";
    }

    let currentId = items[items.length - 1].id;
    let parts = currentId.split("-");
    let num = parseInt(parts[1], 10) + 1;
    return parts[0] + "-" + num.toString().padStart(3, 0);
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
});
