import { Link } from "react-router";

const SplitSection = () => {
  return (
    <section className="bg-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Explore Beyond the Covers
          </h2>
          <p className="text-white mb-6">
            Dive into a wide variety of books that entertain, inform, and
            inspire. From fiction to cookbooks, we have it all.
          </p>
          <Link
            to={"/books"}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Browse Books
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://isbndb.com/blog/wp-content/uploads/2024/03/book-metadata.jpg"
            alt="Reading"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
