# idbkeyvalue

`idbkeyvalue` is a simple and efficient key-value storage solution built on the IndexedDB API. This package allows you to easily manage key-value pairs in a client-side IndexedDB database. It provides functionalities to open/create databases, and perform CRUD operations on stored data.

## Features

- Open or create an IndexedDB database.
- Insert, get, update, delete, and manage key-value pairs.
- Clear all keys or delete the database.
- Retrieve all database names.

## Installation

You can install `idbkeyvalue` via npm:

```bash
npm install idbkeyvalue
```

## Usage

### Importing

You can import the necessary functions from the package as follows:

```
import { 
    openDB, 
    insertIDB, 
    getIDB, 
    updateIDB, 
    deleteIDB, 
    setIDB, 
    deleteDBIDB, 
    clearAllKeys, 
    getAll, 
    getAllDatabaseNames, 
    getBy 
} from 'idbkeyvalue';
```

### Examples

#### Open/Create a Database

```
const db = await openDB('myDatabase', 1);
```

#### Insert Data

```
await insertIDB(db, 'myKey', 'myValue');
```

#### Get Data

```
const value = await getIDB(db, 'myKey');
console.log(value); // Output: 'myValue'
```

#### Update Data

```
await updateIDB(db, 'myKey', 'newValue');
```

#### Delete Data

```
await deleteIDB(db, 'myKey');
```

#### Set Data

```
await setIDB(db, 'myKey', 'myValue');
```

#### Delete Database

```
await deleteDBIDB('myDatabase');
```

#### Clear All Keys

```
await clearAllKeys(db);
```

#### Get All Entries

```
const allEntries = await getAll(db);
console.log(allEntries);
```

#### Get All Database Names

```
const databaseNames = await getAllDatabaseNames();
console.log(databaseNames);
```

#### Get Data By Condition

```
const result = await getBy(db, (key, value) => key === 'myKey');
console.log(result);
```

## API

**IndexedDB Library Documentation**
=====================================

This library provides a set of functions to interact with IndexedDB databases in a web browser. It allows you to create, open, read from, write to, and delete databases.

### Table of Contents
-----------------

* [Database Functions](#database-functions)
	+ `openDB(dbName: string): Promise<IDBDatabase>` - Open or create an IndexedDB database.
	+ `deleteDBIDB(dbName: string = defaultDB): Promise<string>` - Delete an IndexedDB database.
* [Data Storage Functions](#data-storage-functions)
	+ `insertIDB(key: string, value: any, dbName: string = defaultDB): Promise<boolean>` - Insert a key-value pair into the database.
	+ `getIDB(key: string, dbName: string = defaultDB): Promise<any>` - Retrieve a value from the database by its key.
	+ `updateIDB(key: string, newValue: any, dbName: string = defaultDB): Promise<void>` - Update a value in the database.
* [Data Retrieval Functions](#data-retrieval-functions)
	+ `getAll(dbName: string = defaultDB): Promise<any[]>` - Retrieve all key-value pairs from the database.
	+ `getBy(dbName: string, condition: Record<string, any>): Promise<any[]>` - Retrieve key-value pairs that match a given condition.
* [Utility Functions](#utility-functions)
	+ `getAllDatabaseNames(): Promise<string[]>` - Retrieve the names of all IndexedDB databases in the browser.

### Database Functions
--------------------

#### `openDB(dbName: string): Promise<IDBDatabase>`

Open or create an IndexedDB database with the specified name. If a database with the same name already exists, it will be opened; otherwise, a new database will be created.

**Parameters**

* `dbName`: The name of the database to open/create (default: "defaultDB").

**Returns**

A promise that resolves to the opened/closed IndexedDB database object.

**Example**
```
const db = await openDB('myDatabase');
```

#### `deleteDBIDB(dbName: string = defaultDB): Promise<string>`

Delete an IndexedDB database with the specified name. If a database with the same name does not exist, no action will be taken.

**Parameters**

* `dbName`: The name of the database to delete (default: "defaultDB").

**Returns**

A promise that resolves to a string indicating whether the deletion was successful or not.

**Example**
```
const result = await deleteDBIDB('myDatabase');
```

### Data Storage Functions
------------------------

#### `insertIDB(key: string, value: any, dbName: string = defaultDB): Promise<boolean>`

Insert a key-value pair into the database. If a key with the same name already exists, its value will be updated.

**Parameters**

* `key`: The key of the value to insert.
* `value`: The value to insert.
* `dbName`: The name of the database to store in (default: "defaultDB").

**Returns**

A promise that resolves to a boolean indicating whether the insertion was successful or not.

**Example**
```
const result = await insertIDB('myKey', 'myValue');
```

#### `getIDB(key: string, dbName: string = defaultDB): Promise<any>`

Retrieve a value from the database by its key. If no key with the same name exists, an empty object will be returned.

**Parameters**

* `key`: The key of the value to retrieve.
* `dbName`: The name of the database to read from (default: "defaultDB").

**Returns**

A promise that resolves to the retrieved value or an empty object if no key is found.

**Example**
```
const result = await getIDB('myKey');
```

#### `updateIDB(key: string, newValue: any, dbName: string = defaultDB): Promise<void>`

Update a value in the database. If no key with the same name exists, a new key-value pair will be inserted.

**Parameters**

* `key`: The key of the value to update.
* `newValue`: The new value to insert or update.
* `dbName`: The name of the database to store in (default: "defaultDB").

**Returns**

A promise that resolves when the update is complete.

**Example**
```
const result = await updateIDB('myKey', 'newValue');
```

### Data Retrieval Functions
---------------------------

#### `getAll(dbName: string = defaultDB): Promise<any[]>`

Retrieve all key-value pairs from the database. If no keys exist, an empty array will be returned.

**Parameters**

* `dbName`: The name of the database to read from (default: "defaultDB").

**Returns**

A promise that resolves to an array of key-value pairs.

**Example**
```
const result = await getAll();
```

#### `getBy(dbName: string, condition: Record<string, any>): Promise<any[]>`

Retrieve key-value pairs that match a given condition. If no keys exist, an empty array will be returned.

**Parameters**

* `dbName`: The name of the database to read from.
* `condition`: An object containing conditions for which key-value pairs to return.

**Returns**

A promise that resolves to an array of matching key-value pairs.

**Example**
```
const result = await getBy('myDatabase', { key: 'value' });
```

### Utility Functions
-------------------

#### `getAllDatabaseNames(): Promise<string[]>`

Retrieve the names of all IndexedDB databases in the browser. If no databases exist, an empty array will be returned.

**Returns**

A promise that resolves to an array of database names.

**Example**
```
const result = await getAllDatabaseNames();
```

Note: This documentation assumes a basic understanding of JavaScript and IndexedDB.

## Contributing

Contributions are welcome! If you find a bug or have suggestions for improvements, please submit an issue or a pull request.

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

