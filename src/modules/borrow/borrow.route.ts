import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRoute = Router();


borrowRoute.post("/api/borrow", borrowController.addBorrow);
borrowRoute.get("/api/borrow", borrowController.all_borrow_book);


//export borrow route
export default borrowRoute;