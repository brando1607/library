import { Request, Response } from "express";
import { DatabaseId } from "../types/books.types";
import { User } from "../types/users.types";
import { UsersModel } from "../model/users.model";

export class UsersController {
  static getUsers = async (req: Request, res: Response) => {
    try {
      const result = await UsersModel.getUsers();

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const id: DatabaseId = req.params.id;
      const result = await UsersModel.getUser({ id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const userData: User = req.body;
      const result = await UsersModel.createUser({
        userData,
      });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
  static updateUser = async (req: Request, res: Response) => {
    try {
      const newInformation: Partial<User> = req.body;
      const id: DatabaseId = req.params.id;

      const result = await UsersModel.updateUser({ newInformation, id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const id: DatabaseId = req.params.id;

      const result = await UsersModel.deleteUser({ id });

      res.send(result);
    } catch (error) {
      console.error(error);
    }
  };
}
