import React, { useState, useEffect } from "react";
import { useBorrowBookMutation } from "../../store/api/bookApi";
import type { IBook } from "../../interfaces/IBook";

interface BorrowBookModalProps {
  addBorrowModal: { isOpen: boolean; book: IBook | null };
  setAddBorrowModal: (value: { isOpen: boolean; book: IBook | null }) => void;
}

const BorrowBookModal = ({
  addBorrowModal,
  setAddBorrowModal,
}: BorrowBookModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  useEffect(() => {
    if (addBorrowModal?.book) {
      setQuantity(1);
      setDueDate("");
    }
    setMessage(null);
    setErrors({});
  }, [addBorrowModal]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    if (addBorrowModal.book && quantity > addBorrowModal.book.copies) {
      newErrors.quantity = `Quantity exceeds available copies (${addBorrowModal.book.copies})`;
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.dueDate = "Due date must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please correct the form errors." });
      return;
    }

    if (!addBorrowModal.book?._id) {
      setMessage({ type: "error", text: "Book ID is missing." });
      return;
    }

    try {
      const borrowData = {
        book: addBorrowModal.book._id,
        quantity,
        dueDate,
      };
      await borrowBook(borrowData).unwrap();
      setMessage({ type: "success", text: "Book borrowed successfully!" });
      setQuantity(1);
      setDueDate("");
      setErrors({});
      setMessage(null);
      setAddBorrowModal({ isOpen: false, book: null });
    } catch (error: any) {
      console.error("Error borrowing book:", error);
      setMessage({
        type: "error",
        text: `Failed to borrow book: ${
          error.data?.message || error.message || "Unknown error"
        }`,
      });
    }
  };

  if (!addBorrowModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-neutral-900 text-white p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📥 Borrow Book</h2>
          <button
            onClick={() => setAddBorrowModal({ isOpen: false, book: null })}
            className="text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        {message && (
          <div
            className={`p-2 rounded mb-4 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4 space-y-1 text-sm">
          <p>
            <span className="font-semibold">Title:</span>{" "}
            {addBorrowModal.book?.title}
          </p>
          <p>
            <span className="font-semibold">Author:</span>{" "}
            {addBorrowModal.book?.author}
          </p>
          <p>
            <span className="font-semibold">Genre:</span>{" "}
            {addBorrowModal.book?.genre}
          </p>
          <p>
            <span className="font-semibold">Available Copies:</span>{" "}
            {addBorrowModal.book?.copies}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="number"
              min="1"
              max={addBorrowModal.book?.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.quantity ? "border border-red-500" : ""
              }`}
              placeholder="Quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs italic">{errors.quantity}</p>
            )}
          </div>
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.dueDate ? "border border-red-500" : ""
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs italic">{errors.dueDate}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Borrowing..." : "Confirm Borrow"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBookModal;
