import { Document, Model } from "mongoose";

// Genre type
export type Genre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';


export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;  

   //instance method for borrow book
  borrowBooks(quantity:number): Promise<void> 

}

//exported here
export type BookModel = Model<IBook>

