import { useState } from "react";
import { useDeleteBookMutation } from "../../store/api/bookApi";
import type { IBook } from "../../interfaces/IBook";
import { toast } from "react-toastify";

interface DeleteBookModalProps {
  deleteBookModal: { isOpen: boolean; book: IBook | null };
  setDeleteBookModal: (value: { isOpen: boolean; book: IBook | null }) => void;
}

const DeleteBookModal = ({
  deleteBookModal,
  setDeleteBookModal,
}: DeleteBookModalProps) => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (!deleteBookModal.book?._id) {
      setMessage({ type: "error", text: "Book ID is missing for deletion." });
      return;
    }

    try {
      await deleteBook(deleteBookModal.book._id).unwrap();
      setMessage({ type: "success", text: "Book deleted successfully!" });
      setDeleteBookModal({ isOpen: false, book: null });
      setMessage(null);
      toast.warn("Book deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting book:", error);
      toast.error(`Failed to delete book`);
      setMessage({
        type: "error",
        text: `Failed to delete book: ${
          error.data?.message || error.message || "Unknown error"
        }`,
      });
    }
  };

  if (!deleteBookModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-neutral-900 text-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-red-500">
          ⚠️ Confirm Deletion
        </h2>
        {message && (
          <div
            className={`p-2 rounded mb-4 ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {message.text}
          </div>
        )}
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            "
            {deleteBookModal.book ? (deleteBookModal.book.title as string) : ""}
            "
          </span>{" "}
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setDeleteBookModal({ isOpen: false, book: null })}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookModal;
