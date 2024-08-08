import { orders } from "/db/DB.js";

export function getAllOrders() {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            const customers = JSON.parse(http.responseText);
            resolve(customers);
          } catch (error) {
            reject("Failed to parse order data");
          }
        } else {
          reject(`Failed to fetch order: Status ${http.status}`);
        }
      }
    };
    http.open("GET", "http://localhost:8080/pos_system/order", true);
    http.send();
  });
}

export function saveOrder(order) {
  const orderJSON = JSON.stringify(order);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200 || http.status === 201) {
        console.log(JSON.stringify(http.responseText));
      } else {
        console.error("Order Save Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open("POST", "http://localhost:8080/pos_system/order", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(orderJSON);
}

export function searchOrderDetails(id) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            const customers = JSON.parse(http.responseText);
            resolve(customers);
          } catch (error) {
            reject("Failed to parse order detail data");
          }
        } else {
          reject(`Failed to fetch order details: Status ${http.status}`);
        }
      }
    };
    http.open("GET", `http://localhost:8080/pos_system/order/?id=${id}`, true);
    http.send();
  });
}
