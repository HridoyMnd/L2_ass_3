import { Book } from "../book/book.model";
import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

// add a book
export const addBorrow = async (req: Request, res: Response) => {
  try {
    const borrow_info = req.body;
    const { quantity } = borrow_info;
    const book_id = borrow_info.book;

    const foundBook = await Book.findById(book_id);

    if (!foundBook) {
       res.status(500).json({
        success: false,
        message: "Book not found",
      });
    }
    foundBook?.borrowBooks(quantity);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
};

// //export borroController
// export const borrowController = {
//   addBorrow,
//   all_borrow_book,
// };
