import { useGetBooksQuery } from "../../store/api/bookApi";

const TrendingBooks = () => {
  const { data: booksData, isLoading, error } = useGetBooksQuery(undefined);

  return (
    <section className="py-12 bg-neutral-950 text-white px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        🔥 New Trending Books
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
        {isLoading && (
          <div className="col-span-full text-center">Loading...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-400">
            Failed to load books.
          </div>
        )}
        {!isLoading && !error && booksData?.length === 0 && (
          <div className="col-span-full text-center">No books found.</div>
        )}
        {!isLoading &&
          !error &&
          booksData?.slice(0, 4).map((book: any, i: number) => (
            <div
              key={book.id || i}
              className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
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
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-sm text-gray-400">{book.author}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TrendingBooks;
