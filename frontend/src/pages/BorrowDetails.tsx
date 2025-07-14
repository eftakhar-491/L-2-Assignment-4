import { useParams } from "react-router";
import { useGetBorrowDetailsQuery } from "../store/api/bookApi";
import Spinner from "../components/Shared/Spinner";

const BorrowDetails = () => {
  const { borrowId } = useParams<{ borrowId: string }>();

  console.log(borrowId);
  const { data: borrowDetails, isLoading } = useGetBorrowDetailsQuery(
    borrowId as string
  );

  console.log(borrowDetails);
  if (isLoading) return <Spinner />;

  if (!borrowDetails) return <div className="text-white">Book not found.</div>;

  return (
    <div className="min-h-[600px]">
      <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-md max-w-2xl mx-auto my-10">
        <h1 className="text-2xl font-bold mb-1">
          Title: {borrowDetails?.book?.title}
        </h1>
        <p className="text-sm text-gray-400 mb-4">
          by {borrowDetails?.book?.author}
        </p>

        <p>
          <span className="font-semibold">ISBN:</span>{" "}
          {borrowDetails?.book?.isbn}
        </p>
        <p>
          <span className="font-semibold">Total Quantity:</span>{" "}
          {borrowDetails?.totalQuantity}
        </p>
      </div>
    </div>
  );
};

export default BorrowDetails;
