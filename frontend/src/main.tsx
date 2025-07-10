import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const root: HTMLElement | null = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
