"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = __importDefault(require("../book/book.route"));
const borrow_route_1 = __importDefault(require("../borrow/borrow.route"));
//middleware
const Routes = (0, express_1.Router)();
Routes.use("/", book_route_1.default);
Routes.use("/", borrow_route_1.default);
//exported here
exports.default = Routes;
