const HeroSection = () => {
  return (
    <div
      className="bg-neutral-900 text-white text-center py-20 flex flex-col items-center justify-center px-4 min-h-[600px] relative"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/039/830/455/small_2x/ai-generated-an-open-book-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-opacity-70"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Book Haven
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Discover your next great read
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
