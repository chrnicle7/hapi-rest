const { DataTypes } = require("sequelize");
const Joi = require("joi");
const db = require("../config/database/postgres");
const { Book } = require("./book");

/* 
 * Model
 */
let Author = db.define("author", {
    id: {
        type: DataTypes.INTEGER,
        field: "id", 
        autoIncrement: true, 
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        field: "name",
    }
}, {
    freezeTableName: false,
    timestamps: false,
});
Author.hasMany(Book, {foreignKey: "author_id"});
Book.belongsTo(Author, {foreignKey: "author_id"});


/* 
 * Schema
 */
let AuthorSchema = Joi.object({
    name: Joi.string()
                .required(),
});


module.exports = {
    "modelName": "Author",
    "schemaName": "AuthorSchema",
    Author,
    AuthorSchema,
}