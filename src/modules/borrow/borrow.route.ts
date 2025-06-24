import { Router } from "express";
import { addBorrow, all_borrow_book } from "./borrow.controller";

const borrowRoute = Router();


borrowRoute.post("/api/borrow", addBorrow);
borrowRoute.get("/api/borrow", all_borrow_book );


//export borrow route
export default borrowRoute;