import { useNavigate } from "react-router";
import { useGetBorrowQuery } from "../../store/api/bookApi";

const Borrow = () => {
  const { data: borrowedBooks = [] } = useGetBorrowQuery(undefined);
  const navigate = useNavigate();
  console.log(borrowedBooks);
  return (
    <div className="bg-neutral-950 min-h-screen text-white px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">📋 Borrow Summary</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {borrowedBooks.map((borrow, i) => (
          <div
            onClick={() => navigate(`/books/${borrow?.book?._id || ""}`)}
            key={i + "borrow"}
            className="bg-neutral-900 p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{borrow?.book?.title}</h2>
            <p className="text-sm text-gray-400 mb-1">
              by {borrow?.book?.author}
            </p>
            <p className="text-sm  mb-1">isbn: {borrow?.book?.isbn}</p>
            <p className="text-sm mb-1 mt-3">
              <span className="font-semibold">Total Borrowed: </span>{" "}
              {borrow?.totalQuantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrow;
