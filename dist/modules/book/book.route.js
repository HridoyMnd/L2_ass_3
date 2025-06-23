"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
//middleware
const bookRoute = (0, express_1.Router)();
// book post endpoint
bookRoute.post("/api/books", book_controller_1.BookController.addBook);
bookRoute.get("/api/books", book_controller_1.BookController.allBooks);
bookRoute.get("/genre/books", book_controller_1.BookController.filterWithGenre);
bookRoute.get("/sng_book/books/:bookId", book_controller_1.BookController.single_book);
bookRoute.put("/api/books/:bookId", book_controller_1.BookController.update_book);
bookRoute.delete("/api/books/:bookId", book_controller_1.BookController.delete_book);
//exported here
exports.default = bookRoute;
