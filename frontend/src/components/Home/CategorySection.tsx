const categories = [
  { name: "Drama", image: "https://source.unsplash.com/400x400/?drama" },
  { name: "Mystery", image: "https://source.unsplash.com/400x400/?mystery" },
  { name: "Novels", image: "https://source.unsplash.com/400x400/?novel" },
  {
    name: "Recipe Books",
    image: "https://source.unsplash.com/400x400/?recipe",
  },
];

const CategorySection = () => {
  return (
    <section className="bg-white text-black py-16 px-4">
      <h2 className="text-3xl text-center font-bold mb-8">Choose Your Book!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, i) => (
          <div key={i} className="relative group">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
