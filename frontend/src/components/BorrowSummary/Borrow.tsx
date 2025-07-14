// import { useNavigate } from "react-router";
// import { useGetBorrowQuery } from "../../store/api/bookApi";

// const Borrow = () => {
//   const { data: borrowedBooks = [] } = useGetBorrowQuery(undefined);
//   const navigate = useNavigate();
//   console.log(borrowedBooks);
//   return (
//     <div className="bg-neutral-950 min-h-screen text-white px-4 py-8">
//       <h1 className="text-2xl font-bold text-center mb-8">📋 Borrow Summary</h1>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
//         {borrowedBooks.map((borrow, i) => (
//           <div
//             onClick={() => navigate(`/books/${borrow?.book?._id || ""}`)}
//             key={i + "borrow"}
//             className="bg-neutral-900 p-5 rounded-lg shadow hover:shadow-lg transition"
//           >
//             <h2 className="text-lg font-semibold">{borrow?.book?.title}</h2>
//             <p className="text-sm text-gray-400 mb-1">
//               by {borrow?.book?.author}
//             </p>
//             <p className="text-sm  mb-1">isbn: {borrow?.book?.isbn}</p>
//             <p className="text-sm mb-1 mt-3">
//               <span className="font-semibold">Total Borrowed: </span>{" "}
//               {borrow?.totalQuantity}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Borrow;

import { useNavigate } from "react-router";
import { useGetBorrowQuery } from "../../store/api/bookApi";
import Spinner from "../Shared/Spinner";

const Borrow = () => {
  const { data: borrowedBooks = [], isLoading } = useGetBorrowQuery(undefined);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  return (
    <div className="bg-neutral-950 min-h-screen text-white px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">📋 Borrow Summary</h1>

      {/* Desktop & Tablet: Table View */}
      <div className="hidden md:block max-w-7xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-800 text-white">
              <th className="p-3 border-b border-neutral-700">Title</th>
              <th className="p-3 border-b border-neutral-700">Author</th>
              <th className="p-3 border-b border-neutral-700">ISBN</th>
              <th className="p-3 border-b border-neutral-700">
                Total Borrowed
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((borrow, i) => (
              <tr
                onClick={() =>
                  navigate(`/borrow-summary/${borrow?.book?._id || ""}`)
                }
                key={i + "borrow"}
                className="hover:bg-neutral-800 cursor-pointer transition"
              >
                <td className="p-3 border-b border-neutral-800">
                  {borrow?.book?.title}
                </td>
                <td className="p-3 border-b border-neutral-800 text-gray-400">
                  {borrow?.book?.author}
                </td>
                <td className="p-3 border-b border-neutral-800">
                  {borrow?.book?.isbn}
                </td>
                <td className="p-3 border-b border-neutral-800 font-semibold">
                  {borrow?.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card View */}
      <div className=" md:hidden grid gap-4">
        {borrowedBooks.map((borrow, i) => (
          <div
            key={i + "mobile-borrow"}
            onClick={() => navigate(`/books/${borrow?.book?._id || ""}`)}
            className="bg-neutral-900 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-1">
              {borrow?.book?.title}
            </h2>
            <p className="text-sm text-gray-400">
              Author: {borrow?.book?.author}
            </p>
            <p className="text-sm">ISBN: {borrow?.book?.isbn}</p>
            <p className="text-sm mt-2 font-semibold">
              Total Borrowed: {borrow?.totalQuantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrow;
