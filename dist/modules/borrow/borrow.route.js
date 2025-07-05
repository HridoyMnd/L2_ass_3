"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const borrowRoute = (0, express_1.Router)();
borrowRoute.post("/borrow/:bookId", borrow_controller_1.addBorrow);
borrowRoute.get("/borrow-summary", borrow_controller_1.all_borrow_book);
//export borrow route
exports.default = borrowRoute;
