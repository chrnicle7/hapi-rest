const { models, schemas } = require("../models/index");
const BookController = {};

BookController.getAll = async function (request, h) {
    const response = {}
    try {
        const books = await models.Book.findAll({
            attributes: ["id", "title", "year"],
            include: [{
                attributes: [["name", "author_name"]],
                model: models.Author,
            }]
        });
        console.log(typeof models.Author);
        if (books.length > 0) {
            response.books = books;
        } else {
            response.books = [];
            response.message = "There's no result";
        }
        return h.response(response).code(200);
    } catch (err) {
        response.message = "There's something wrong " + err;
        return h.response(response).code(500);
    }
};

BookController.getOne = async function (request, h) {
    const response = {};
    let responseCode = 200;
    const reqId = request.params.id;
    if (isNaN(reqId)) {
        response.message = "Invalid url";
        responseCode = 400;

        return h.response(response).code(responseCode);
    } 

    try {
        let book = await models.Book.findOne({
            attributes: [
                "id",
                "title",
                "year",
            ],
            where: {
                id: parseInt(reqId),
            },
            include: [{
                attributes: [["name", "author_name"]],
                model: models.Author,
            }],
        });

        if (book) {
            response.book = book;
            responseCode = 200;
        } else {
            response.message = "Can't find the book";
            responseCode = 404;
        }
    } catch (err) {
        response.message = "There's something wrong";
        responseCode = 500;
    }

    return h.response(response).code(responseCode);
};

BookController.create = async function (request, h) {
    const response = {};
    let responseCode = 201;
    const payload = request.payload;

    try {
        const validated = await schemas.BookSchema.validateAsync(payload);
        const createdBook = await models.Book.create(validated);

        response.message = "Book successfully created";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong. " + err;
    }

    return h.response(response).code(responseCode);
};

BookController.update = async function (request, h) {
    const response = {};
    let responseCode = 200;
    const payload = request.payload;

    const reqId = request.params.id;
    if (isNaN(reqId)) {
        response.message = "Invalid url";
        responseCode = 400;
        return h.response(response).code(responseCode);
    } 

    try {
        const validated = await schemas.BookSchema.validateAsync(payload);
        const updatedBook = await models.Book.update(validated, {
            where: {
                id: parseInt(reqId),
            }});

        responseCode = 200;
        response.message = "Book is successfully updated";
    } catch (err) {
        responseCode = 500;
        response.message = "There's something wrong. " + err;
    }

    return h.response(response).code(responseCode);
};

BookController.delete = async function (request, h) {
    const response = {};
    let responseCode = 200;
    const payload = request.payload;

    const reqId = request.params.id;
    if (isNaN(reqId)) {
        response.message = "Invalid url";
        responseCode = 400;

        return h.response(response).code(responseCode);
    } 

    try {
        await models.Book.destroy({
            where: {
                id: parseInt(reqId),
            },
        });

        response.message = "Book successfully deleted";
        responseCode = 200;
    } catch (err) {
        response. message = "There's something wrong. " + err;
        responseCode = 500;
    }

    return h.response(response).code(responseCode);
};

module.exports = {
    "controllerName": "BookController",
    BookController,
};