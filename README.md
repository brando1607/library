# Book Management API

This is a backend project built to practice my skills in **Prisma** and **TypeScript**. It provides an API for managing books and users, where users can borrow and return books. The project uses **PostgreSQL** as the database and **Prisma ORM** for database interactions and is built with a simple MVC architecture.

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

## Features

- **User Management**
  - Create, update, delete, and retrieve users.
  - Support for different roles (USER, AUTHOR).
- **Book Management**
  - Create, update, delete, and retrieve books.
  - Ensure that only users with the AUTHOR role can add books.
- **Book Borrowing System**
  - Users can borrow and return books.
  - Prevent borrowing if a book is out of stock.
  - Prevent users from borrowing the same book twice.

This project was built to strengthen my understanding of **Prisma ORM** and **TypeScript** while working with relational databases.
