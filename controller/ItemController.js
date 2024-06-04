import { saveItem } from "../model/Item.js";
import { updateItem } from "../model/Item.js";
import { removeItem } from "../model/Item.js";
import { searchItem } from "../model/Item.js";
import { getAllItems } from "../model/Item.js";

$("document").ready(() => {
  // Load all items when document is ready
  loadAllItems();

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

  // Event listener for save button
  $("#btn-item-save").click((event) => {
    event.preventDefault();
    itemId.val(getNewItemId());

    if (validateAll) {
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

  // Event listeners for input validation
  itemId.on("input", () => validate(itemId, itemIdRegex, itemIdWarning));
  itemDesc.on("input", () =>
    validate(itemDesc, itemDescRegex, itemDescWarning)
  );
  itemQty.on("input", () => validate(itemQty, itemQtyRegex, itemQtyWarning));
  itemPrice.on("input", () =>
    validate(itemPrice, itemPriceRegex, itemPriceWarning)
  );

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
