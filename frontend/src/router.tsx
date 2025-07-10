import { createBrowserRouter } from "react-router";
import App from "./App";
import Books from "./pages/Books";
import BorrowSummary from "./pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
