import { Router } from "express";
import { addBorrow, all_borrow_book } from "./borrow.controller";

const borrowRoute = Router();


borrowRoute.post("/borrow/:bookId", addBorrow);
borrowRoute.get("/borrow-summary", all_borrow_book );


//export borrow route
export default borrowRoute;