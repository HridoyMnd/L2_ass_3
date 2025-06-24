"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_borrow_book = exports.addBorrow = void 0;
const book_model_1 = require("../book/book.model");
const borrow_model_1 = require("./borrow.model");
// add a book
const addBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow_info = req.body;
        const { quantity } = borrow_info;
        const book_id = borrow_info.book;
        const foundBook = yield book_model_1.Book.findById(book_id);
        if (!foundBook) {
            res.status(500).json({
                success: false,
                message: `Book not found with ${book_id}`,
            });
            return;
        }
        try {
            yield (foundBook === null || foundBook === void 0 ? void 0 : foundBook.borrowBooks(quantity));
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Book borrow failed",
                err: `${error}`
            });
            return;
        }
        const borrowData = yield borrow_model_1.Borrow.create(borrow_info);
        // response send here
        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data: borrowData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book borrowed Failed",
            error,
        });
    }
});
exports.addBorrow = addBorrow;
//get all borrowed book
const all_borrow_book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $unwind: "$book",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error,
        });
    }
});
exports.all_borrow_book = all_borrow_book;
