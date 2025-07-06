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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_borrow_book = exports.addBorrow = void 0;
const borrow_model_1 = require("./borrow.model");
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = require("../book/book.model");
// add a book
const addBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const borrow_info = req.body.data;
        // Destructure and type-convert
        const quantity = Number(borrow_info.quantity);
        const book = new mongoose_1.default.Types.ObjectId(borrow_info.book);
        const dueDate = new Date(borrow_info.dueDate);
        const b_data = { quantity, book, dueDate };
        // Book check
        const foundBook = yield book_model_1.Book.findById(bookId);
        if (!foundBook) {
            res.status(404).json({
                success: false,
                message: `Book not found with ID: ${bookId}`,
            });
            return;
        }
        // Try borrowing
        try {
            yield foundBook.borrowBooks(quantity);
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: "Book borrow failed (insufficient copies?)",
                error: error,
            });
            return;
        }
        // Create borrow record
        const borrowData = yield borrow_model_1.Borrow.create(b_data);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Book borrowing process failed",
            error: error,
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
                    as: "bookRecord",
                },
            },
            {
                $unwind: "$bookRecord",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookRecord.title",
                        isbn: "$bookRecord.isbn",
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
