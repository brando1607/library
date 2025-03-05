import { db } from "../utils/db.config";
import {
  BookWithoutAuthorId,
  Username,
  Books,
  BookId,
} from "../types/books.types";

export class BooksModel {
  static getBooks = async () => {
    try {
      const books = await db.books.findMany();

      if (books.length === 0) return "No books yet.";

      return books;
    } catch (error) {
      return error;
    }
  };

  static getBook = async ({ id }: { id: string }) => {
    try {
      const book = await db.books.findFirst({ where: { id: id } });

      if (!book) return "Book not found.";

      return book;
    } catch (error) {
      return error;
    }
  };
  static addBook = async ({
    book,
    authorUsername,
  }: {
    book: BookWithoutAuthorId;
    authorUsername: Username;
  }) => {
    try {
      const { name, released, pages, stock } = book;

      const author = await db.authors.findFirst({
        where: { username: authorUsername.username },
      });

      if (author === null) return "Author not found";

      const authorId = author.id;

      const newBook = await db.books.create({
        data: { name, released, pages, stock, authorId },
      });

      return newBook;
    } catch (error) {
      return error;
    }
  };
  static updateBook = async ({
    newInformation,
    id,
  }: {
    newInformation: Partial<Books>;
    id: BookId;
  }) => {
    try {
      const findBook = await db.books.findFirst({ where: { id: id } });

      if (!findBook) return "Book not found";

      const newBook = await db.books.update({
        where: { id: id },
        data: newInformation,
      });

      return newBook;
    } catch (error) {
      console.error(error);
    }
  };
  static deleteBook = async ({ id }: { id: BookId }) => {
    try {
      const findBook = await db.books.findFirst({ where: { id: id } });

      if (!findBook) return "Book not found";

      const deleteBook = await db.books.delete({ where: { id: id } });

      return deleteBook;
    } catch (error) {
      console.error(error);
    }
  };
}
