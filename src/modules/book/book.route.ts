import { Router } from "express";
import { BookController } from "./book.controller";

//middleware
const bookRoute = Router();

// book post endpoint
bookRoute.post("/create-book", BookController.addBook);
bookRoute.get("/books", BookController.allBooks);
bookRoute.get("/latest_books", BookController.latestBooks);
bookRoute.get("/books/:id", BookController.single_book);
bookRoute.put("/edit-book/:id", BookController.update_book);
bookRoute.delete("/api/books/:bookId", BookController.delete_book);

// bookRoute.get("/genre/books", BookController.filterWithGenre);

//exported here
export default bookRoute;