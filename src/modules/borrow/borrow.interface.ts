import mongoose from "mongoose";

interface IBorrow {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}


// export Iborrow
export default IBorrow;