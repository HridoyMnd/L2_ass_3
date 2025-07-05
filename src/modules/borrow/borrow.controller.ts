
import { Request, Response } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";

// add a book
export const addBorrow = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const borrow_info = req.body;
    const { quantity } = req.body;
    const foundBook = await Book.findById(bookId);

    if (!foundBook) {
      res.status(500).json({
        success: false,
        message: `Book not found with ${bookId}`,
      });
      return;
    }

    try {
      await foundBook?.borrowBooks(quantity);
    } catch (error) {
      res.status(400).json({
        success:false,
        message: "Book borrow failed",
        err: `${error}`
      });
      return;
    }
    const borrowData = await Borrow.create(borrow_info);

    // response send here
    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrowData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Book borrowed Failed",
      error,
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
      as: "bookRecord"
    }
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
