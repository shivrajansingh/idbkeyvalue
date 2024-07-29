"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBy = exports.getAllDatabaseNames = exports.getAll = exports.clearAllKeys = exports.deleteDBIDB = exports.setIDB = exports.deleteIDB = exports.updateIDB = exports.getIDB = exports.insertIDB = exports.openDB = void 0;
var IndexDB_1 = require("./helper/IndexDB");
Object.defineProperty(exports, "openDB", { enumerable: true, get: function () { return IndexDB_1.openDB; } });
Object.defineProperty(exports, "insertIDB", { enumerable: true, get: function () { return IndexDB_1.insertIDB; } });
Object.defineProperty(exports, "getIDB", { enumerable: true, get: function () { return IndexDB_1.getIDB; } });
Object.defineProperty(exports, "updateIDB", { enumerable: true, get: function () { return IndexDB_1.updateIDB; } });
Object.defineProperty(exports, "deleteIDB", { enumerable: true, get: function () { return IndexDB_1.deleteIDB; } });
Object.defineProperty(exports, "setIDB", { enumerable: true, get: function () { return IndexDB_1.setIDB; } });
Object.defineProperty(exports, "deleteDBIDB", { enumerable: true, get: function () { return IndexDB_1.deleteDBIDB; } });
Object.defineProperty(exports, "clearAllKeys", { enumerable: true, get: function () { return IndexDB_1.clearAllKeys; } });
Object.defineProperty(exports, "getAll", { enumerable: true, get: function () { return IndexDB_1.getAll; } });
Object.defineProperty(exports, "getAllDatabaseNames", { enumerable: true, get: function () { return IndexDB_1.getAllDatabaseNames; } });
Object.defineProperty(exports, "getBy", { enumerable: true, get: function () { return IndexDB_1.getBy; } });