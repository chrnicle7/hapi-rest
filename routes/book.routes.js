const server = require("../app");
const { BookController } = require("../controllers/index");
BASE_ROUTE = "/books";

module.exports = [
    { method: "GET", path: BASE_ROUTE, handler: BookController.getAll },
    { method: "GET", path: BASE_ROUTE + "/{id}", handler: BookController.getOne },
    { method: "POST", path: BASE_ROUTE, handler: BookController.create },
    { method: "PUT", path: BASE_ROUTE + "/{id}", handler: BookController.update },
    { method: "DELETE", path: BASE_ROUTE + "/{id}", handler: BookController.delete },
];
