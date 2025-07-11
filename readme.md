# Book Management System

This is a full-stack book management system with a React frontend and a Node.js (Express) backend.

## Overview

The application allows users to manage a collection of books. Users can view a list of books, add new books, edit existing books, and delete books. The system also includes functionality for borrowing and returning books.

## Features

- **View Books:** See a list of all available books.
- **Book Details:** View detailed information for a single book.
- **Add Book:** Add a new book to the collection.
- **Edit Book:** Update the information of an existing book.
- **Delete Book:** Remove a book from the collection.
- **Borrow/Return:** Manage borrowing and returning of books.

## Tech Stack

### Frontend

- **Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Notifications:** React Toastify

### Backend

- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Zod
- **API:** RESTful

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation and Running

**Backend:**

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

**Frontend:**

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

The backend exposes the following RESTful API endpoints:

### Book Endpoints

- `GET /api/books`: Get all books.
- `GET /api/books/:id`: Get a single book by ID.
- `POST /api/books`: Add a new book.
- `PUT /api/books/:id`: Update a book.
- `DELETE /api/books/:id`: Delete a book.

### Borrow Endpoints

- `GET /api/borrows`: Get all borrowed books.
- `POST /api/borrows`: Borrow a book.
- `PUT /api/borrows/return/:id`: Return a borrowed book.

## Folder Structure

The project is organized into two main directories: `frontend` and `backend`.

### `backend`

```
backend/
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── app/
│       ├── config/
│       ├── controllers/
│       ├── interfaces/
│       ├── models/
│       ├── routes/
│       └── Validetor/
```

### `frontend`

```
frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── router.tsx
│   ├── components/
│   ├── interfaces/
│   ├── pages/
│   ├── store/
│   └── types/
```

```
This project provides a simple and efficient way to manage a library of books. It is designed for easy integration, scalability, and user-friendly operation.
```
