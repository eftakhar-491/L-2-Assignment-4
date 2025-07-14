import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-neutral-900 text-white text-center py-20 flex flex-col items-center justify-center px-4 min-h-[600px] relative"
      style={{
        backgroundImage:
          "url('https://images6.alphacoders.com/872/872784.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Book Haven
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Discover your next great read
        </p>
        <button
          onClick={() => navigate("/books")}
          className="mt-8 px-6 py-3 bg-black cursor-pointer hover:bg-black/80 text-white font-semibold rounded shadow transition duration-200"
        >
          Browse Books
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
