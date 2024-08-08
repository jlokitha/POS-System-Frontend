import { items } from "/db/DB.js";

export function saveItem(item) {
  const itemJSON = JSON.stringify(item);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200 || http.status === 201) {
        console.log(JSON.stringify(http.responseText));
      } else {
        console.error("Item Save Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open("POST", "http://localhost:8080/pos_system/item", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(itemJSON);
}

export function updateItem(item) {
  const itemJSON = JSON.stringify(item);
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 200 || http.status === 201) {
        console.log(JSON.stringify(http.responseText));
      } else {
        console.error("Item Update Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open("PUT", "http://localhost:8080/pos_system/item", true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(itemJSON);
}

export function removeItem(id) {
  const http = new XMLHttpRequest();
  http.onreadystatechange = () => {
    if (http.readyState === 4) {
      if (http.status === 204) {
        console.log("Item deleted successfully");
      } else {
        console.error("Item Delete Unsuccessful");
        console.error("Status", http.status);
        console.error("Ready State", http.readyState);
      }
    } else {
      console.error("Ready State", http.readyState);
    }
  };
  http.open(
      "DELETE",
      `http://localhost:8080/pos_system/item?id=${id}`,
      true
  );
  http.send();
}

export function searchItem(id) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            const item = JSON.parse(http.responseText);
            resolve(item);
          } catch (error) {
            reject("Failed to parse item data");
          }
        } else {
          reject(`Failed to fetch item: Status ${http.status}`);
        }
      }
    };
    http.open("GET", `http://localhost:8080/pos_system/item?id=${id}`, true);
    http.send();
  });
}

export function getAllItems() {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        if (http.status === 200) {
          try {
            const items = JSON.parse(http.responseText);
            resolve(items);
          } catch (error) {
            reject("Failed to parse item data");
          }
        } else {
          reject(`Failed to fetch item: Status ${http.status}`);
        }
      }
    };
    http.open("GET", "http://localhost:8080/pos_system/item", true);
    http.send();
  });
}
