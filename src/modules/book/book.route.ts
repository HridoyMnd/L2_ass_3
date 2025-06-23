import { Router } from "express";
import { BookController } from "./book.controller";

//middleware
const bookRoute = Router();

// book post endpoint
bookRoute.post("/api/books", BookController.addBook);
bookRoute.get("/api/books", BookController.allBooks);
bookRoute.get("/genre/books", BookController.filterWithGenre);
bookRoute.get("/api/books/:bookId", BookController.single_book);
bookRoute.put("/api/books/:bookId", BookController.update_book);
bookRoute.delete("/api/books/:bookId", BookController.delete_book);


//exported here
export default bookRoute;