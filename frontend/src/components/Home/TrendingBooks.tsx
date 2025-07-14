import { useNavigate } from "react-router";
import { useGetBooksQuery } from "../../store/api/bookApi";
import Spinner from "../Shared/Spinner";

const TrendingBooks = () => {
  const { data: booksData, isLoading } = useGetBooksQuery(undefined);

  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  return (
    <section className="py-12 bg-neutral-950 text-white px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        🔥 New Trending Books
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
        {booksData?.slice(0, 4).map((book: any, i: number) => (
          <div
            onClick={() => navigate(`/books/${book._id}`)}
            key={book._id || i}
            className="cursor-pointer bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {/* <div className="h-48 bg-gray-700 rounded mb-3 flex items-center justify-center overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-auto object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div> */}

            <h3 className="font-semibold text-lg mb-1">Title: {book.title}</h3>
            <p className="text-sm text-gray-400">by {book.author}</p>
            <p className="text-sm text-gray-100">ISBN : {book.isbn}</p>
            <p className="text-sm text-gray-100">Copies: {book.copies}</p>
            <p className="text-sm text-gray-100">
              {" "}
              Description: {book.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingBooks;
