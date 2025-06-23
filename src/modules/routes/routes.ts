import { Router } from "express";
import bookRoute from "../book/book.route";
// import borrowRoute from "../borrow/borrow.route";


//middleware
const Routes = Router();
Routes.use("/", bookRoute);
// Routes.use("/", borrowRoute);

//exported here
export default Routes;
