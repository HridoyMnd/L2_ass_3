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
exports.BookController = void 0;
const book_model_1 = require("./book.model");
// add a book
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.Book.create(req.body);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Validation failed",
            success: false,
            error,
        });
    }
});
//get all books
const allBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.Book.find();
        res.status(201).send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Books retrieved failed",
            success: false,
            error,
        });
    }
});
//get single book with bookId
const single_book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_id = req.params.id;
        const data = yield book_model_1.Book.findById(book_id);
        // response sending  here
        res.status(201).send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Books retrived failed",
            success: false,
            error,
        });
    }
});
//update a book
const update_book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_id = req.params.id;
        const updated_data = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(book_id, updated_data, {
            new: true,
        });
        //response sending here
        res.status(201).send({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Book updated failed",
            success: false,
            error,
        });
    }
});
//delete a book
const delete_book = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book_id = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(book_id);
        //response sending here
        res.status(201).send({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "Book deleted failed",
            success: false,
            error,
        });
    }
});
// filter with genre and get books
// const filterWithGenre = async (req: Request, res: Response) => {
//   try {
//     const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
//     const sortOrder = sort === "asc" ? 1 : -1;
//     const limitNumber = parseInt(limit as string);
//     const data = await Book.find({ genre: filter })
//       .sort({ [sortBy as string]: sortOrder }) 
//       .limit(limitNumber);
//     if (data.length === 0) {
//       res.status(500).send({
//         message: "Books retrieved  failed",
//         success: false,
//         error: `${filter} is not matched in database`,
//       });
//       return;
//     }
//     res.status(201).send({
//       success: true,
//       message: "Books retrieved successfully",
//       data,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "Books retrieved  failed",
//       success: false,
//       error,
//     });
//   }
// };
// all method export here
exports.BookController = {
    addBook,
    allBooks,
    single_book,
    // filterWithGenre,
    update_book,
    delete_book,
};
