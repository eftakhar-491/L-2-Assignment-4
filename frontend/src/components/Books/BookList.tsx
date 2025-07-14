import { useState } from "react";
import type { IBook } from "../../interfaces/IBook";
import { useGetBooksQuery } from "../../store/api/bookApi";
import AddBookModal from "../modal/AddBookModal";
import EditBookModal from "../modal/EditBookModal";
import DeleteBookModal from "../modal/DeleteBookModal";
import BorrowBookModal from "../modal/BorrowBookModal";
import { useNavigate } from "react-router";

import Spinner from "../Shared/Spinner";
import { useDispatch, useSelector } from "react-redux";

const BookList = () => {
  const { addBookModal } = useSelector((state: any) => state.addBookModal);
  const dispatch = useDispatch();
  const setAddBookModal = (value: boolean) => {
    dispatch({ type: "addBookModal/setAddBookModal", payload: value });
  };
  const { data: booksData, isLoading, error } = useGetBooksQuery(undefined);

  const [editBookModal, setEditBookModal] = useState<{
    isOpen: boolean;
    book: null | IBook;
  }>({
    isOpen: false,
    book: null,
  });
  const [deleteBookModal, setDeleteBookModal] = useState<{
    isOpen: boolean;
    book: null | IBook;
  }>({
    isOpen: false,
    book: null,
  });
  const [addBorrowModal, setAddBorrowModal] = useState<{
    isOpen: boolean;
    book: null | IBook;
  }>({
    isOpen: false,
    book: null,
  });
  const navigate = useNavigate();
  console.log(booksData, isLoading, error);
  if (isLoading) return <Spinner />;

  return (
    <>
      <AddBookModal isOpen={addBookModal} setAddBookModal={setAddBookModal} />
      <EditBookModal
        editBookModal={editBookModal}
        setEditBookModal={setEditBookModal}
      />
      <DeleteBookModal
        deleteBookModal={deleteBookModal}
        setDeleteBookModal={setDeleteBookModal}
      />
      <BorrowBookModal
        addBorrowModal={addBorrowModal}
        setAddBorrowModal={setAddBorrowModal}
      />

      <div className="p-4 md:p-8 bg-neutral-900 min-h-[600px] text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📚 Book Management</h1>
          <button
            onClick={() => setAddBookModal(true)}
            className="cursor-pointer bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
          >
            ➕ Add New Book
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-neutral-700 rounded overflow-hidden">
            <thead className="bg-neutral-800 text-left text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">ISBN</th>
                <th className="px-4 py-3">Copies</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {booksData?.map((book: IBook) => (
                <tr
                  key={book._id}
                  className="cursor-pointer border-t border-neutral-700 hover:bg-neutral-800 transition"
                >
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    {book.title}
                  </td>
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    {book.author}
                  </td>
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    {book.genre}
                  </td>
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    {book.isbn}
                  </td>
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    {book.copies}
                  </td>
                  <td
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="px-4 py-3"
                  >
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        book.available
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {book.available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-4 py-3 space-x-2 text-sm">
                    <button
                      onClick={() =>
                        setEditBookModal({
                          isOpen: true,
                          book: book,
                        })
                      }
                      className="px-2 py-1 bg-yellow-500 hover:bg-yellow-400 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() =>
                        setDeleteBookModal({
                          isOpen: true,
                          book: book,
                        })
                      }
                      className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded"
                    >
                      🗑️
                    </button>
                    <button
                      onClick={() =>
                        book.available &&
                        setAddBorrowModal({
                          isOpen: true,
                          book: book,
                        })
                      }
                      className={`px-2 py-1  ${
                        book.available
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-gray-500 "
                      } rounded`}
                    >
                      📥
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookList;
