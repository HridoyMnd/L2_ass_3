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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("../borrow/borrow.model");
// import { Borrow } from "../borrow/borrow.model";
// import { borrowSchema } from "../borrow/borrow.model";
// book Genre create here
var Genre;
(function (Genre) {
    Genre["FICTION"] = "FICTION";
    Genre["NON_FICTION"] = "NON_FICTION";
    Genre["SCIENCE"] = "SCIENCE";
    Genre["HISTORY"] = "HISTORY";
    Genre["BIOGRAPHY"] = "BIOGRAPHY";
    Genre["FANTASY"] = "FANTASY";
})(Genre || (Genre = {}));
//book schema create
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: Object.values(Genre),
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required"],
        unique: [true, "ISBN number is not unique"],
    },
    description: { type: String, trim: true },
    copies: {
        type: Number,
        required: [true, "copies number is required"],
        min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
//instance method for borrow book
bookSchema.methods.borrowBooks = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(quantity);
        if (this.copies < quantity) {
            throw new Error("Not have enough copies");
        }
        this.copies -= quantity;
        if (this.copies === 0) {
            this.available = false;
        }
        yield this.save();
    });
};
// post hook middleware use
bookSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
        }
    });
});
//book model create
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
