import { useParams } from "react-router";
import { useGetBookDetailsQuery } from "../store/api/bookApi";

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  console.log(bookId);
  const {
    data: book,
    isLoading,
    error,
  } = useGetBookDetailsQuery(bookId as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book details.</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div className="min-h-[600px]">
      <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-md max-w-2xl mx-auto my-10">
        <h1 className="text-2xl font-bold mb-1">Title: {book?.title}</h1>
        <p className="text-sm text-gray-400 mb-4">by {book?.author}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
          <p>
            <span className="font-semibold">Genre:</span> {book?.genre}
          </p>
          <p>
            <span className="font-semibold">ISBN:</span> {book?.isbn}
          </p>
          <p>
            <span className="font-semibold">Copies:</span> {book?.copies}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            <span
              className={`px-2 py-1 text-xs rounded ${
                book?.available ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {book?.available ? "Available" : "Unavailable"}
            </span>
          </p>
        </div>

        <div className="text-sm text-gray-300">
          <p className="font-semibold mb-1">Description:</p>
          <p className="leading-relaxed">
            {book?.description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
