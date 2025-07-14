import React, { useState, useEffect } from "react";
import { useUpdateBookMutation } from "../../store/api/bookApi";
import type { IBook } from "../../interfaces/IBook";
import { toast } from "react-toastify";

interface EditBookModalProps {
  editBookModal: { isOpen: boolean; book: IBook | null };
  setEditBookModal: (value: { isOpen: boolean; book: IBook | null }) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({
  editBookModal,
  setEditBookModal,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState<IBook["genre"]>("FICTION");

  const [isbn, setISBN] = useState("");
  const [description, setDescription] = useState("");

  const [copies, setCopies] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    if (editBookModal.book) {
      setTitle(editBookModal.book.title || "");
      setAuthor(editBookModal.book.author || "");
      setGenre(editBookModal.book.genre || "FICTION");

      setISBN(editBookModal.book.isbn || "");

      setDescription(editBookModal.book.description || "");
      setCopies(editBookModal.book.copies || 1);
    } else {
      // Clear form if no book is provided (e.g., modal closed)
      setTitle("");
      setAuthor("");
      setGenre("FICTION");

      setISBN("");
      setDescription("");

      setCopies(1);
    }
    setMessage(null); // Clear messages on book change or modal open/close
    setErrors({}); // Clear errors on book change or modal open/close
  }, [editBookModal]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!genre.trim()) newErrors.genre = "Genre is required";

    if (!isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (copies < 1) newErrors.copies = "At least 1 copy is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please correct the form errors." });
      return;
    }

    if (!editBookModal.book?._id) {
      setMessage({ type: "error", text: "Book ID is missing for update." });
      return;
    }

    try {
      const bookData: Partial<IBook> = {
        _id: editBookModal.book._id,
        title,
        author,
        genre,

        isbn,
        description,

        copies,
        available: copies > 0,
      };
      await updateBook(bookData).unwrap();
      setMessage({ type: "success", text: "Book updated successfully!" });
      setEditBookModal({ isOpen: false, book: null });
      toast.success("Book updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update book.");
      // setMessage({
      //   type: "error",
      //   text: `Failed to update book: ${
      //     error.data?.message || "something went wrong"
      //   }`,
      // });
    }
  };

  if (!editBookModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-900 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-neutral-900 z-10 pb-2">
          <h2 className="text-xl font-semibold">✏️ Edit Book</h2>
          <button
            onClick={() => setEditBookModal({ isOpen: false, book: null })}
            className="text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div
              className={`p-2 rounded ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {message.text}
            </div>
          )}
          <div>
            <input
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.title ? "border border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">{errors.title}</p>
            )}
          </div>
          <div>
            <input
              name="author"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.author ? "border border-red-500" : ""
              }`}
            />
            {errors.author && (
              <p className="text-red-500 text-xs italic">{errors.author}</p>
            )}
          </div>
          <div>
            <select
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value as IBook["genre"])}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.genre ? "border border-red-500" : ""
              }`}
            >
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non-Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
            {errors.genre && (
              <p className="text-red-500 text-xs italic">{errors.genre}</p>
            )}
          </div>

          <div>
            <input
              name="isbn"
              placeholder="ISBN"
              value={isbn}
              onChange={(e) => setISBN(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.isbn ? "border border-red-500" : ""
              }`}
            />
            {errors.isbn && (
              <p className="text-red-500 text-xs italic">{errors.isbn}</p>
            )}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.description ? "border border-red-500" : ""
              }`}
              rows={3}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs italic">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <input
              name="copies"
              type="number"
              placeholder="Number of Copies"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.copies ? "border border-red-500" : ""
              }`}
              min="1"
            />
            {errors.copies && (
              <p className="text-red-500 text-xs italic">{errors.copies}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
