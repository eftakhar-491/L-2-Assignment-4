const SplitSection = () => {
  return (
    <section className="bg-neutral-100 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Explore Beyond the Covers</h2>
          <p className="text-gray-700 mb-6">
            Dive into a wide variety of books that entertain, inform, and
            inspire. From fiction to cookbooks, we have it all.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Browse Collection
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://source.unsplash.com/600x400/?reading"
            alt="Reading"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SplitSection;
