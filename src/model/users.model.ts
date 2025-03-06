import { db } from "../utils/db.config";
import { DatabaseId } from "../types/books.types";
import { User } from "../types/users.types";

export class UsersModel {
  static getUsers = async () => {
    try {
      const users = await db.users.findMany();

      if (!users) return "No users.";

      return users;
    } catch (error) {
      console.error(error);
    }
  };
  static getUser = async ({ id }: { id: DatabaseId }) => {
    try {
      const user = await db.users.findFirst({
        where: { id: id },
      });

      if (!user) return "User not found";

      if (user.role === "AUTHOR") {
        const author = await db.users.findFirst({
          where: { id: id },
          include: { books: true },
        });

        return author;
      }

      return user;
    } catch (error) {
      console.error(error);
    }
  };
  static createUser = async ({ userData }: { userData: User }) => {
    try {
      const userExists = await db.users.findFirst({
        where: { email: userData.email },
      });

      if (userExists) return "User already exists.";

      const newUser = await db.users.create({ data: userData });

      return newUser;
    } catch (error) {
      console.error(error);
    }
  };

  static updateUser = async ({
    id,
    newInformation,
  }: {
    id: DatabaseId;
    newInformation: Partial<User>;
  }) => {
    try {
      const userExists = await db.users.findFirst({ where: { id: id } });

      if (!userExists) return "User not found.";

      const updatedUser = db.users.update({
        where: { id: id },
        data: newInformation,
      });

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };
  static deleteUser = async ({ id }: { id: DatabaseId }) => {
    try {
      const userExists = await db.users.findFirst({ where: { id: id } });

      if (!userExists) return "User not found.";

      const deleteUser = await db.users.delete({ where: { id: id } });

      return deleteUser;
    } catch (error) {
      console.error(error);
    }
  };
}
