export type Books = {
  name: string;
  released: number;
  pages: number;
  stock: number;
  authorId: string;
};

export type BookWithoutAuthorId = Omit<Books, "authorId">;

export type Username = { username: string };

export type BookId = string;
