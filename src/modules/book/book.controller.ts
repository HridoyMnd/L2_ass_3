import { Request, Response } from "express";
import { Book } from "./book.model";

// add a book
const addBook = async (req: Request, res: Response) => {

  try {
    const data = await Book.create(req.body);
    res.status(201).send({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

//get all books
const allBooks = async (req: Request, res: Response) => {
  try {
    const data = await Book.find();
    res.status(201).send({ 
      success: true,
       message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Books retrieved failed",
      success: false,
      error,
    });
  }
};

//latest data
const latestBooks = async (req: Request, res: Response) => {
  try {
    const data = await Book.find()
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).send({
      success: true,
      message: "Latest books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve latest books",
      error,
    });
  }
};

//get single book with bookId
const single_book = async (req: Request, res: Response) => {
  try {
    const book_id = req.params.id;
    const data = await Book.findById(book_id);

    // response sending  here
    res.status(201).send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Books retrived failed",
      success: false,
      error,
    });
  }
};

//update a book
const update_book = async (req: Request, res: Response) => {
  try {
    const book_id = req.params.id;
    const updated_data = req.body;
    const data = await Book.findByIdAndUpdate(book_id, updated_data, {
      new: true,
    });

    //response sending here
    res.status(201).send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Book updated failed",
      success: false,
      error,
    });
  }
};

//delete a book
const delete_book = async (req: Request, res: Response) => {
  try {
    const book_id = req.params.bookId;
    await Book.findByIdAndDelete(book_id);

    //response sending here
    res.status(201).send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).send({
      message: "Book deleted failed",
      success: false,
      error,
    });
  }
};


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
export const BookController = {
  addBook,
  allBooks,
  latestBooks,
  single_book,
  // filterWithGenre,
  update_book,
  delete_book,
};
