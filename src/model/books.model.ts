import { db } from "../utils/db.config";
import {
  BookWithoutAuthorId,
  Username,
  Books,
  DatabaseId,
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

      const author = await db.users.findFirst({
        where: { username: authorUsername.username },
      });

      const bookExists = await db.books.findFirst({ where: { name: name } });

      if (bookExists) {
        const newBook = await db.books.update({
          where: { id: bookExists.id },
          data: { stock: stock + bookExists.stock },
        });

        return newBook;
      }

      if (author === null) return "Author not found";

      if (author.role !== "AUTHOR") return "User is not an author.";

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
    id: DatabaseId;
  }) => {
    try {
      const findBook = await db.books.findFirst({ where: { id: id } });

      if (!findBook) return "Book not found";

      const updatedBood = await db.books.update({
        where: { id: id },
        data: newInformation,
      });

      return updatedBood;
    } catch (error) {
      console.error(error);
    }
  };
  static deleteBook = async ({ id }: { id: DatabaseId }) => {
    try {
      const findBook = await db.books.findFirst({ where: { id: id } });

      if (!findBook) return "Book not found";

      const deleteBook = await db.books.delete({ where: { id: id } });

      return deleteBook;
    } catch (error) {
      console.error(error);
    }
  };
  static takeBook = async ({
    bookName,
    borrower,
  }: {
    bookName: string;
    borrower: Username;
  }) => {
    try {
      const findBook = await db.books.findFirst({ where: { name: bookName } });
      const findUser = await db.users.findFirst({
        where: { username: borrower.username },
      });

      if (!findUser) return "User not found.";

      if (!findBook) return "Book not found.";

      if (findUser.currentbooks.includes(findBook.name)) {
        return "User already has book.";
      }

      if (findBook.stock === 0) {
        return "No stock available for this book. Try again later.";
      }

      await db.books.update({
        where: { id: findBook.id },
        data: { stock: findBook.stock - 1 },
      });

      await db.users.update({
        where: { id: findUser.id },
        data: { currentbooks: [...findUser.currentbooks, findBook.name] },
      });

      return findUser;
    } catch (error) {
      console.error(error);
    }
  };
  static returnBook = async ({
    bookName,
    borrower,
  }: {
    bookName: string;
    borrower: Username;
  }) => {
    const findBook = await db.books.findFirst({ where: { name: bookName } });
    const findUser = await db.users.findFirst({
      where: { username: borrower.username },
    });

    if (!findUser) return "User not found.";

    if (!findBook) return "Book not found.";

    const borrowedBook = findUser.currentbooks.findIndex(
      (e) => e === findBook.name
    );

    findUser.currentbooks.splice(borrowedBook, 1);

    if (0 > borrowedBook) {
      return "User doesn't have book.";
    }

    await db.users.update({
      where: { id: findUser.id },
      data: { currentbooks: [...findUser.currentbooks] },
    });

    await db.books.update({
      where: { id: findBook.id },
      data: { stock: findBook.stock + 1 },
    });

    return findUser;
  };
}
