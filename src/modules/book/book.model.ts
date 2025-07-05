import { model, Schema } from "mongoose";
import { BookModel, IBook } from "./book.interface";
import { Borrow } from "../borrow/borrow.model";

// book Genre create here
enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

//book schema create
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required"],
      unique: [true, "ISBN number is not unique"],
    },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: [true, "copies number is required"],
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//instance method for borrow book
bookSchema.methods.borrowBooks = async function (
  quantity: number
): Promise<void> {
  if (this.copies < quantity) {
      throw new Error("Not have enough copies");
  }

  this.copies -= quantity;

  if (this.copies === 0) {
    this.available = false;
  }

  await this.save();

};


// post hook middleware use
bookSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
  }
});

//book model create
export const Book = model<IBook, BookModel>("Book", bookSchema);
