import { useState } from "react";
import { Link } from "react-router"; // Use `next/link` if using Next.js

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 text-white px-8 py-3 shadow-md">
      <div className=" mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold tracking-wide">📖 Library</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link to="/books" className="hover:text-gray-300 transition-colors">
            All Books
          </Link>
          <Link
            to="/add-book"
            className="hover:text-gray-300 transition-colors"
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className="hover:text-gray-300 transition-colors"
          >
            Borrow Summary
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 px-2">
          <Link to="/books" className="hover:text-gray-400">
            All Books
          </Link>
          <Link to="/add-book" className="hover:text-gray-400">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:text-gray-400">
            Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
