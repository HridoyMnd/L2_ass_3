"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
//middleware
const bookRoute = (0, express_1.Router)();
// book post endpoint
bookRoute.post("/create-book", book_controller_1.BookController.addBook);
bookRoute.get("/books", book_controller_1.BookController.allBooks);
bookRoute.get("/books/:id", book_controller_1.BookController.single_book);
bookRoute.put("/edit-book/:id", book_controller_1.BookController.update_book);
bookRoute.delete("/api/books/:bookId", book_controller_1.BookController.delete_book);
// bookRoute.get("/genre/books", BookController.filterWithGenre);
//exported here
exports.default = bookRoute;
