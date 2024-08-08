export function saveCustomer(customer) {
  const customerJSON = JSON.stringify(customer);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200 || http.status === 201) {
        console.log(JSON.stringify(http.responseText));
      } else {
        console.error("Customer Save Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open("POST", "http://localhost:8080/pos_system/customer", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(customerJSON);
}

export function updateCustomer(customer) {
  const customerJSON = JSON.stringify(customer);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200 || http.status === 201) {
        console.log(JSON.stringify(http.responseText));
      } else {
        console.error("Customer Update Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open("PUT", "http://localhost:8080/pos_system/customer", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(customerJSON);
}

export function removeCustomer(id) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 204) {
        console.log("Customer deleted successfully");
      } else {
        console.error("Customer Delete Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open(
    "DELETE",
    `http://localhost:8080/pos_system/customer?id=${id}`,
    true
  );
  http.send();
}

export function searchCustomer(id) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 204) {
        console.log("Customer found");
      } else {
        console.error("Customer no found");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open(
    "GET",
    `http://localhost:8080/pos_system/customer?customerId=${id}`,
    true
  );
  http.send();
}

export function getAllCustomers() {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            const customers = JSON.parse(http.responseText);
            resolve(customers); // Return the customer array
          } catch (error) {
            reject("Failed to parse customer data");
          }
        } else {
          reject(`Failed to fetch customers: Status ${http.status}`);
        }
      }
    };
    http.open("GET", "http://localhost:8080/pos_system/customer", true);
    http.send();
  });
}
