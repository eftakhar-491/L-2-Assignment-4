import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white px-6 text-center">
      <div className="space-y-6">
        <h1 className="text-7xl font-extrabold text-red-600">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/books">
          <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-medium transition">
            📚 Back to All Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
