const { DataTypes } = require("sequelize");
const Joi = require("joi");
const db = require("../config/database/postgres");

/* 
 * Model
 */
let Book = db.define("books", {
    id: {
        type: DataTypes.INTEGER,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        field: "title",
    },
    year: {
        type: DataTypes.INTEGER,
        field: "year",
    },
    author_id: {
        type: DataTypes.INTEGER,
        field: "author_id",
    },
}, {
    freezeTableName: false,
    timestamps: false   
});


/* 
 * Schema
 */
let BookSchema = Joi.object({
    title       :  Joi.string()
                        .required(),
    year        :   Joi.number()
                        .integer()
                        .required(),
    author_id   : Joi.number()
                        .integer()
                        .required(),
});


module.exports = {
    "modelName": "Book",
    "schemaName": "BookSchema",
    Book,
    BookSchema,
};