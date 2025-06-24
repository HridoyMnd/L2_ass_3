import { Router } from "express";
import { addBorrow } from "./borrow.controller";
// import { borrowController } from "./borrow.controller";

const borrowRoute = Router();


borrowRoute.post("/api/borrow", addBorrow);
// borrowRoute.get("/api/borrow", );


//export borrow route
export default borrowRoute;