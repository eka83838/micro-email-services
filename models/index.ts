"use strict";
require("dotenv").config();
import * as fs from "fs";
import * as path from "path";
import * as Sequelize from "sequelize";
import * as dbConfig from "./../config/database";
const env = process.env.APP || "development";
var db = {};
var sequelize = new Sequelize(
    dbConfig[env].database,
    dbConfig[env].username,
    dbConfig[env].password,
    dbConfig[env]
);

var basename  = path.basename(module.filename);
fs.readdirSync(__dirname).filter(function(file: any) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(function(file: any) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model["name"]] = model;
});

Object.keys(db).forEach(function(modelName: any) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db["sequelize"] = sequelize;
db["Sequelize"] = Sequelize;

export default db;
