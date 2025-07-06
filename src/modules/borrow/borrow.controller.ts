import { Request, Response } from "express";
import { Borrow } from "./borrow.model";
import mongoose from "mongoose";
import { Book } from "../book/book.model";

// add a book
export const addBorrow = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const borrow_info = req.body.data;

    // Destructure and type-convert
    const quantity = Number(borrow_info.quantity);
    const book = new mongoose.Types.ObjectId(borrow_info.book as string);
    const dueDate = new Date(borrow_info.dueDate);

    const b_data = { quantity, book, dueDate };

    // Book check
    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
       res.status(404).json({
        success: false,
        message: `Book not found with ID: ${bookId}`,
      });
      return;
    }

    // Try borrowing
    try {
      await foundBook.borrowBooks(quantity);
    } catch (error) {
       res.status(400).json({
        success: false,
        message: "Book borrow failed (insufficient copies?)",
        error: error,
      });
      return;
    }

    // Create borrow record
    const borrowData = await Borrow.create(b_data);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book borrowing process failed",
      error: error,
    });
  }
};

//get all borrowed book
export const all_borrow_book = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
};
