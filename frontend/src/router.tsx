import { createBrowserRouter } from "react-router";
import App from "./App";
import Books from "./pages/Books";
import BorrowSummary from "./pages/BorrowSummary";
import BookDetails from "./pages/BookDetails";
import BorrowDetails from "./pages/BorrowDetails";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:bookId",
        element: <BookDetails />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
      {
        path: "/borrow-summary/:borrowId",
        element: <BorrowDetails />,
      },
    ],
  },
]);

export default router;
