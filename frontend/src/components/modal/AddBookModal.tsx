import React, { useState } from "react";
import { useAddBookMutation } from "../../store/api/bookApi";

import type { IBook } from "../../interfaces/IBook";
import { toast } from "react-toastify";

interface AddBookModalProps {
  isOpen?: boolean;
  setAddBookModal: (value: boolean) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  setAddBookModal,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState<IBook["genre"]>("FICTION"); // Default genre

  const [isbn, setISBN] = useState("");
  const [description, setDescription] = useState("");

  const [copies, setCopies] = useState<number | "">("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [addBook, { isLoading }] = useAddBookMutation();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!genre.trim()) newErrors.genre = "Genre is required";
    if (!isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the form errors.");
      return;
    }

    try {
      const bookData: Partial<IBook> = {
        title,
        author,
        genre,

        isbn,
        description,

        copies: copies === "" ? 1 : copies, // Always add 1 copy
        available: true, // Always available when adding a new book
      };
      await addBook(bookData).unwrap();
      toast.success("Book added successfully!");
      setAddBookModal(false);
      // Clear form fields
      setTitle("");
      setAuthor("");
      setGenre("FICTION");

      setISBN("");
      setDescription("");
    } catch (error: any) {
      console.error("Error adding book:", error);
      setMessage({
        type: "error",
        text: `Failed to add book: ${
          error.data?.message || error.message || "Unknown error"
        }`,
      });
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      setMessage(null); // Clear messages when modal closes
      setErrors({}); // Clear errors when modal closes
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-neutral-900 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-neutral-900 z-10 pb-2">
          <h2 className="text-xl font-semibold">➕ Add New Book</h2>
          <button
            onClick={() => setAddBookModal(false)}
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
          {/* <div>
            <input
              name="publicationYear"
              type="number"
              placeholder="Publication Year"
              value={publicationYear}
              onChange={(e) => setPublicationYear(Number(e.target.value))}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.publicationYear ? "border border-red-500" : ""
              }`}
            />
            {errors.publicationYear && (
              <p className="text-red-500 text-xs italic">
                {errors.publicationYear}
              </p>
            )}
          </div> */}
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
          {/* <div>
            <input
              name="image"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`w-full p-2 rounded bg-neutral-800 ${
                errors.image ? "border border-red-500" : ""
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-xs italic">{errors.image}</p>
            )}
          </div> */}

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
            className="w-full bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
