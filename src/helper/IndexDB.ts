const defaultDB: string = "idbkeyvalue";

// Open or create the IndexedDB database
export const openDB = async (dbName: string): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => {
      reject("Error opening database");
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("keyValueStore")) {
        db.createObjectStore("keyValueStore", { keyPath: "key" });
      }
    };
  });
};

// Set key-value pair in the IndexedDB
export const insertIDB = async (key: string, value: any, dbName: string = defaultDB): Promise<boolean> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readwrite");
    const store = transaction.objectStore("keyValueStore");

    const request = store.put({ key, value });

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Get value by key from IndexedDB
export const getIDB = async (key: string, dbName: string = defaultDB): Promise<any> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readonly");
    const store = transaction.objectStore("keyValueStore");

    const request = store.get(key);
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result.value);
      } else {
        resolve(false);
      }
    };

    request.onerror = () => {
      reject("Error getting value by key");
    };
  });
};

// Update value by key in IndexedDB
export const updateIDB = async (key: string, newValue: any, dbName: string = defaultDB): Promise<string> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readwrite");
    const store = transaction.objectStore("keyValueStore");

    const getRequest = store.get(key);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        const updateRequest = store.put({ key, value: newValue });

        updateRequest.onsuccess = () => {
          resolve("Value updated successfully");
        };

        updateRequest.onerror = () => {
          reject("Error updating value");
        };
      } else {
        reject("Key not found, cannot update value");
      }
    };

    getRequest.onerror = () => {
      reject("Error getting value for update");
    };
  });
};

// Delete key-value pair from IndexedDB
export const deleteIDB = async (key: string, dbName: string = defaultDB): Promise<string> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readwrite");
    const store = transaction.objectStore("keyValueStore");

    const request = store.delete(key);

    request.onsuccess = () => {
      resolve("Key-Value pair deleted successfully");
    };

    request.onerror = () => {
      reject("Error deleting key-value pair");
    };
  });
};

// insert if key not exists key-value pair in the IndexedDB
export const setIDB = async (key: string, value: any, dbName: string = "defaultDB"): Promise<string> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readwrite");
    const store = transaction.objectStore("keyValueStore");

    const getRequest = store.get(key);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        // If key exists, resolve without adding
        resolve("Key already exists. No action taken.");
      } else {
        // If key does not exist, create a new key-value pair
        const addRequest = store.add({ key, value });

        addRequest.onsuccess = () => {
          resolve("Key-Value pair added successfully");
        };

        addRequest.onerror = () => {
          reject("Error adding key-value pair");
        };
      }
    };

    getRequest.onerror = () => {
      reject("Error checking if key exists");
    };
  });
};


export const deleteDBIDB = async (dbName: string = defaultDB): Promise<string> => {
  const db = await openDB(dbName);
  db.close();

  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = () => {
      resolve(`Database ${dbName} deleted successfully`);
    };

    request.onerror = () => {
      reject(`Error deleting database ${dbName}`);
    };

    request.onblocked = () => {
      reject(`Deletion of database ${dbName} blocked`);
    };
  });
};

export const clearAllKeys = async (dbName: string = defaultDB): Promise<string> => {
  // const db = await openDB(dbName);
  return new Promise((resolve, reject) => {
    const dbOpenRequest = indexedDB.open(dbName);
    dbOpenRequest.onsuccess = () => {

      const db = dbOpenRequest.result;
      if (!db.objectStoreNames.contains("keyValueStore")) {
        resolve("Object store 'keyValueStore' does not exist.");
        return;
      }

      const transaction = db.transaction(["keyValueStore"], "readwrite");
      const store = transaction.objectStore("keyValueStore");
  
      const request = store.clear();
  
      request.onsuccess = () => {
        resolve("All keys cleared successfully");
      };
  
      request.onerror = () => {
        reject("Error clearing keys");
      };
    }
    dbOpenRequest.onerror = () => {
      reject("Error opening database");
    };
  });
};

export const getAll = async (dbName: string = defaultDB): Promise<any[]> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readonly");
    const store = transaction.objectStore("keyValueStore");

    const request = store.getAll();

    request.onsuccess = () => {
      let data = request.result; 
      data = (data && data.length > 0 && data.map((item)=>item.value)) || []; 
      resolve(data);
    };

    request.onerror = () => {
      reject("Error getting all keys");
    };
  });
};

export function getAllDatabaseNames(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (indexedDB.databases) {
      indexedDB.databases()
        .then((databases: IDBDatabaseInfo[]) => {
          const dbNames = databases.map(dbInfo => dbInfo.name || "Unnamed Database");
          resolve(dbNames);
        })
        .catch((error: any) => {
          reject("Error fetching database names: " + error);
        });
    } else {
      reject("indexedDB.databases() not supported in this browser.");
    }
  });
}

export const getBy = async (dbName: string, condition: Record<string, any>): Promise<any[]> => {
  const db = await openDB(dbName);

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["keyValueStore"], "readonly");
    const store = transaction.objectStore("keyValueStore");
    const results: any[] = [];

    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        let value = cursor.value;
        if(value && value.hasOwnProperty('value')){
          value = value.value; 
        }
        let matches = true;
        for (const key in condition) {
          if (value[key] !== condition[key]) {
            matches = false;
            break;
          }
        }
        if (matches) {
          results.push(value);
        }
        cursor.continue();
      } else {
        resolve(results);
      }
    };

    request.onerror = () => {
      reject("Error querying data");
    };
  });
};
