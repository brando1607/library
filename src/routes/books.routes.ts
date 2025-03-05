import { Router } from "express";
import { BooksController } from "../controller/books.controller";

export const router = Router();

router.get("/getBooks", BooksController.getBooks);

router.get("/getBook/:id", BooksController.getBook);

router.post("/createBook", BooksController.createBook);

router.put("/updateBook/:id", BooksController.updateBook);

router.delete("/deleteBook/:id", BooksController.deleteBook);
