import { Request, Response } from "express";
import { BooksModel } from "../model/books.model";
import {
  Username,
  BookWithoutAuthorId,
  Books,
  DatabaseId,
} from "../types/books.types";

export class BooksController {
  static getBooks = async (req: Request, res: Response) => {
    try {
      const result = await BooksModel.getBooks();

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static getBook = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const result = await BooksModel.getBook({ id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static createBook = async (req: Request, res: Response) => {
    try {
      const { name, released, pages, stock }: BookWithoutAuthorId = req.body;
      const { username } = req.params;

      const result = await BooksModel.addBook({
        book: { name, released, pages, stock },
        authorUsername: { username },
      });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
  static updateBook = async (req: Request, res: Response) => {
    try {
      const newInformation: Partial<Books> = req.body;
      const id: DatabaseId = req.params.id;

      const result = await BooksModel.updateBook({ newInformation, id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static deleteBook = async (req: Request, res: Response) => {
    try {
      const id: DatabaseId = req.params.id;

      const result = await BooksModel.deleteBook({ id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
  static takeBook = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const bookName: string = req.body.bookName;

      const result = await BooksModel.takeBook({
        bookName,
        borrower: { username },
      });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
  static returnBook = async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const bookName: string = req.body.bookName;

      const result = await BooksModel.returnBook({
        bookName,
        borrower: { username },
      });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
}
