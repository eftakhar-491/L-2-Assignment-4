const Borrow = () => {
  const borrowedBooks = [
    {
      id: 1,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      quantity: 1,
      dueDate: "2025-08-01",
      status: "Not Returned",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      quantity: 2,
      dueDate: "2025-07-15",
      status: "Returned",
    },
  ];

  return (
    <div className="bg-neutral-950 min-h-screen text-white px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">📋 Borrow Summary</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {borrowedBooks.map((borrow) => (
          <div
            key={borrow.id}
            className="bg-neutral-900 p-5 rounded-lg shadow hover:shadow-lg transition"
          >
            {/* <img
              src={`https://via.placeholder.com/150?text=${borrow.title}`}
              alt={borrow.title}
              className="w-full h-40 object-cover rounded mb-4"
            /> */}
            <h2 className="text-lg font-semibold mb-1">{borrow.title}</h2>
            <p className="text-sm text-gray-400 mb-1">by {borrow.author}</p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Quantity:</span> {borrow.quantity}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(borrow.dueDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded text-xs ${
                  borrow.status === "Returned" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {borrow.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Borrow;
