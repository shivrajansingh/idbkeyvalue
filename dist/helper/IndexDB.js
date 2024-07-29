"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBy = exports.getAll = exports.clearAllKeys = exports.deleteDBIDB = exports.setIDB = exports.deleteIDB = exports.updateIDB = exports.getIDB = exports.insertIDB = exports.openDB = void 0;
exports.getAllDatabaseNames = getAllDatabaseNames;
const defaultDB = "idbkeyvalue";
// Open or create the IndexedDB database
const openDB = (dbName) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
        request.onerror = () => {
            reject("Error opening database");
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("keyValueStore")) {
                db.createObjectStore("keyValueStore", { keyPath: "key" });
            }
        };
    });
});
exports.openDB = openDB;
// Set key-value pair in the IndexedDB
const insertIDB = (key_1, value_1, ...args_1) => __awaiter(void 0, [key_1, value_1, ...args_1], void 0, function* (key, value, dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
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
});
exports.insertIDB = insertIDB;
// Get value by key from IndexedDB
const getIDB = (key_1, ...args_1) => __awaiter(void 0, [key_1, ...args_1], void 0, function* (key, dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["keyValueStore"], "readonly");
        const store = transaction.objectStore("keyValueStore");
        const request = store.get(key);
        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result.value);
            }
            else {
                resolve(false);
            }
        };
        request.onerror = () => {
            reject("Error getting value by key");
        };
    });
});
exports.getIDB = getIDB;
// Update value by key in IndexedDB
const updateIDB = (key_1, newValue_1, ...args_1) => __awaiter(void 0, [key_1, newValue_1, ...args_1], void 0, function* (key, newValue, dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
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
            }
            else {
                reject("Key not found, cannot update value");
            }
        };
        getRequest.onerror = () => {
            reject("Error getting value for update");
        };
    });
});
exports.updateIDB = updateIDB;
// Delete key-value pair from IndexedDB
const deleteIDB = (key_1, ...args_1) => __awaiter(void 0, [key_1, ...args_1], void 0, function* (key, dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
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
});
exports.deleteIDB = deleteIDB;
// insert if key not exists key-value pair in the IndexedDB
const setIDB = (key_1, value_1, ...args_1) => __awaiter(void 0, [key_1, value_1, ...args_1], void 0, function* (key, value, dbName = "defaultDB") {
    const db = yield (0, exports.openDB)(dbName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["keyValueStore"], "readwrite");
        const store = transaction.objectStore("keyValueStore");
        const getRequest = store.get(key);
        getRequest.onsuccess = () => {
            if (getRequest.result) {
                // If key exists, resolve without adding
                resolve("Key already exists. No action taken.");
            }
            else {
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
});
exports.setIDB = setIDB;
const deleteDBIDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
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
});
exports.deleteDBIDB = deleteDBIDB;
const clearAllKeys = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (dbName = defaultDB) {
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
        };
        dbOpenRequest.onerror = () => {
            reject("Error opening database");
        };
    });
});
exports.clearAllKeys = clearAllKeys;
const getAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (dbName = defaultDB) {
    const db = yield (0, exports.openDB)(dbName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["keyValueStore"], "readonly");
        const store = transaction.objectStore("keyValueStore");
        const request = store.getAll();
        request.onsuccess = () => {
            let data = request.result;
            data = (data && data.length > 0 && data.map((item) => item.value)) || [];
            resolve(data);
        };
        request.onerror = () => {
            reject("Error getting all keys");
        };
    });
});
exports.getAll = getAll;
function getAllDatabaseNames() {
    return new Promise((resolve, reject) => {
        if (indexedDB.databases) {
            indexedDB.databases()
                .then((databases) => {
                const dbNames = databases.map(dbInfo => dbInfo.name || "Unnamed Database");
                resolve(dbNames);
            })
                .catch((error) => {
                reject("Error fetching database names: " + error);
            });
        }
        else {
            reject("indexedDB.databases() not supported in this browser.");
        }
    });
}
const getBy = (dbName, condition) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, exports.openDB)(dbName);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["keyValueStore"], "readonly");
        const store = transaction.objectStore("keyValueStore");
        const results = [];
        const request = store.openCursor();
        request.onsuccess = () => {
            const cursor = request.result;
            if (cursor) {
                let value = cursor.value;
                if (value && value.hasOwnProperty('value')) {
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
            }
            else {
                resolve(results);
            }
        };
        request.onerror = () => {
            reject("Error querying data");
        };
    });
});
exports.getBy = getBy;
