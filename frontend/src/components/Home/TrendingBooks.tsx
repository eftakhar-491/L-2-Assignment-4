const TrendingBooks = () => {
  return (
    <section className="py-12 bg-neutral-950 text-white px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">
        🔥 New Trending Books
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="h-48 bg-gray-700 rounded mb-3"></div>
            <h3 className="font-semibold text-lg mb-1">Book Title {i + 1}</h3>
            <p className="text-sm text-gray-400">Author Name</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingBooks;
