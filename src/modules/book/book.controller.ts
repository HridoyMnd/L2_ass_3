import { Request, Response } from "express";
import { Book } from "./book.model";

// add a book
const addBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);

    // response send here
    res.send({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error) {
    res.send({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

//get all books
const allBooks = async (req: Request, res: Response) => {
  try {
    const all_books = await Book.find();

    //response send here
    res.send({
      success: true,
      message: "Books retrieved successfully",
      all_books,
    });
  } catch (error) {
    res.send({
      message: "Books retrieved failed",
      success: false,
      error,
    });
  }
};

// filter with genre and get books
const filterWithGenre = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
    } = req.query;

    // Filter by genre
const query: Record<string, string | undefined> = {};
if (filter && typeof filter === 'string') {
  query.genre = filter;
}
    // Convert limit and sort properly
    const limit_number = parseInt(limit as string);
    const sortOrder = sort === "desc" ? -1 : 1;
    const data = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(limit_number);

    //response sending here
    res.send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.send({
      message: "Books retrieved  failed",
      success: false,
      error,
    });
  }
};

//get single book with bookId
const single_book = async (req: Request, res: Response) =>  {
  try {
    const book_id = req.params.bookId;
    const data = await Book.findById(book_id);
    if(!data){
       res.status(404).json({
        success:"failed",
        message: `Cannot find any book with ${book_id}`
      });
    }
    
    // response sending  here
    res.send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.send({
      message: "Books retrived failed",
      success: false,
      error,
    });
  }
};

//update a book
const update_book = async (req: Request, res: Response) => {
  try {
    const book_id = req.params.bookId;
    const updated_data = req.body;
    const data = await Book.findByIdAndUpdate(book_id, updated_data, {
      new: true,
    });

    //response sending here
    res.send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.send({
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
    res.send({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.send({
      message: "Book deleted failed",
      success: false,
      error,
    });
  }
};

// all method export here
export const BookController = {
  addBook,
  allBooks,
  single_book,
  filterWithGenre,
  update_book,
  delete_book,
};
