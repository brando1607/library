import { Router } from "express";
import { BooksController } from "../controller/books.controller";

export const router = Router();

//CRUD routes

router.get("/getBooks", BooksController.getBooks);

router.get("/getBook/:id", BooksController.getBook);

router.post("/createBook/:username", BooksController.createBook);

router.put("/updateBook/:id", BooksController.updateBook);

router.delete("/deleteBook/:id", BooksController.deleteBook);

//lending routes

router.post("/takeBook/:username", BooksController.takeBook);

router.post("/returnBook/:username", BooksController.returnBook);
